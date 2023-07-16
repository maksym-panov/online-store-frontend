import { 
    useNavigate, 
    useSearchParams,
    Link
} from "react-router-dom";
import { 
    API_ENTITIES_PER_PAGE_PARAM, 
    API_OFFSET_PARAM, 
    ERROR_PAGE, 
    MANAGE_PRODUCTS_PAGE, 
    PRODUCTS, 
    PRODUCTS_PER_PAGE 
} from "../../utils/constants";
import { api } from "../../utils/axiosHelper";
import { useEffect, useState } from "react";
import ManagerProductPage from "./ManagerProductPage";
import s from "../../style/ManagerProducts.module.css";
import { Pagination } from "../../common/Pagination";

export default () => {
    const [params, setParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();

    let name = params.get("name");
    let page = params.get("page");
    let id = params.get("id");

    useEffect(() => {
        if (id) {
            return;
        }
    
        if (page == null) {
            page = 1;
        }
        if (page <= 0) {
            setParams({ page: 1});
            page = 1
        }

        fetchProducts(page, setProducts, navigate, setParams, name, prompt);
    }, [page]);

    if (id) {
        return <ManagerProductPage productId={ id } />;
    }

    return (
        <div id="list" className={s.pCont}>
            <div className={s.inp}>
                <input 
                    style={{borderRadius: 0}}
                    className={s.prompt}
                    onChange={ e => setPrompt(e.target.value) }
                    type="text" 
                    placeholder="Find a product" 
                />
                <button 
                    className={s.tColr} 
                    onClick={ () => 
                        fetchProducts(1, setProducts, navigate, setParams, name, prompt) 
                    }
                >
                Search
                </button>
            </div>
            <div className={s.pLst}>
                {
                    products?.slice(0, PRODUCTS_PER_PAGE).map(p => (
                        <div className={s.p}>
                            <div className={s.idCont}>
                                <p className={s.text}>Id: {p.productId}</p> 
                            </div>
                            <div className={s.nCont}>
                                <Link 
                                    to={ MANAGE_PRODUCTS_PAGE + "?id=" + p.productId }
                                    className={s.text}
                                >
                                    {p.name}
                                </Link> 
                            </div>
                            <div className={s.metaCont}>
                                <p className={s.text}>Price: {" $" + p.price}</p>
                                <p className={s.text}>Stock: {p.stock}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Pagination 
                current={ page } 
                perPage={ PRODUCTS_PER_PAGE }
                entities={ products }
            />
            
        </div>
    );
}

const fetchProducts = async (page, setProducts, navigate, setParams, name, prompt) => {
    try {
        let products = [];
        const offset = (page - 1) * PRODUCTS_PER_PAGE;
        const number = 2 * PRODUCTS_PER_PAGE + 1;
        
        let query = PRODUCTS + "?" + API_OFFSET_PARAM + offset + "&" + API_ENTITIES_PER_PAGE_PARAM + number;
        
        if (prompt) {
            const nameParam = "&name=" + prompt; 
            query += nameParam;
            if (!name || name !== prompt) {
                page = 1;
                setParams(
                    { 
                        name: prompt
                    }
                );

                if (!isNaN(prompt)) {
                    try {
                        const pById = await api
                            .get(PRODUCTS + "/" + prompt)
                            .then(resp => resp.data);
                        products.push(pById);
                    } catch(ignored) {}
               }
            }
        }
       
        products.push(
            ...(
                    await api
                        .get(query)
                        .then(resp => resp.data)
                )
        );

        if (products.length === 0 && page !== 1) {
            setParams({ page: 1 });
            page = 1;
        }

        setProducts(products);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}