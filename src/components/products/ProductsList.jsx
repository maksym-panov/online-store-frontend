import { 
    API_BASE_URL, 
    API_ENTITIES_PER_PAGE_PARAM, 
    API_NAME_PARAM, 
    API_OFFSET_PARAM, 
    API_PROD_CATEGORY_PARAM, 
    ERROR_PAGE, 
    PRODUCTS, 
    PRODUCTS_PER_PAGE 
} from "../../utils/constants";
import { 
    useEffect, 
    useState 
} from "react";
import s from "../../style/Products.module.css";
import { useSearchParams } from "react-router-dom";
import Pagination from "../common/Pagination";
import api from "../../utils/axiosHelper";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

export default (props) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [params, setParams] = useSearchParams();

    const catId = props.categoryId;

    const fetchProducts = async () => {
        try {
            const offset = (page - 1) * PRODUCTS_PER_PAGE;
            const number = 2 * PRODUCTS_PER_PAGE + 1;
            
            let query = API_BASE_URL + PRODUCTS + "?" + 
                        API_OFFSET_PARAM + offset + "&" + 
                        API_ENTITIES_PER_PAGE_PARAM + number;
            if (catId) {
                query += "&" + API_PROD_CATEGORY_PARAM + catId;
            }
            if (params.get("name")) {
                query += "&" + API_NAME_PARAM + params.get("name");
            }
            
            const result = await api.get(query).then(resp => resp.data);
        
            if (result.length === 0 && page != 1) {
                setParams({ page: 1});
                page = 1;
            }

            setProducts(result);
        } catch(error) {
            navigate(ERROR_PAGE);
        }
    };
    
    let page = params.get("page");

    useEffect(() => {
        if (page == null) {
            page = 1;
        }
        if (page <= 0) {
            setParams({ page: 1});
            page = 1
        }
        fetchProducts(); 
    }, [page, params]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    
    return (
        <div id="list" className={s.productsListContainer}>
            { params.get("name") && <h1 style={title}>Search result for "{params.get("name")}"</h1>}
            <div className={s.productsList}>
                {
                    products?.slice(0, PRODUCTS_PER_PAGE).map(
                        p => <ProductCard product={ p } />
                    )
                }
            </div>
            <Pagination 
                current={page} 
                perPage={PRODUCTS_PER_PAGE} 
                entities={products}
            />
        </div>
    );
}

const title = {
    margin: "20px",
    textAlign: "center"
}