import { 
    useEffect, 
    useState 
} from "react";
import { useNavigate } from "react-router-dom";
import { 
    BASE64_RESOLVER, 
    ERROR_PAGE, 
    MANAGE_PRODUCTS_PAGE, 
    PRODUCTS 
} from "../../utils/constants";
import api from "../../utils/axiosHelper";
import s from "../../style/ManagerProducts.module.css";
import { getBase64 } from "../../utils/webHelpers";
import { useSelector } from "react-redux";
import CategoriesSelect from "../../components/products/CategoriesSelect";

export default (props) => {
    const id = props.productId;
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(null);
    const [stock, setStock] = useState(null);
    const [description, setDescription] = useState(null);

    const [categories, setCategories] = useState([]);

    const [err, setErr] = useState(null);

    const fetchProduct = async () => {
        try {
            const p = await api
                .get(PRODUCTS + "/" + id)
                .then(resp => resp.data);
           
                setName(p.name);
                setImage(p.image);
                setPrice(p.price);
                setStock(p.stock);
                setDescription(p.description);
                setCategories(p.productTypes);

                setProduct(p);
        } catch(error) {
            navigate(MANAGE_PRODUCTS_PAGE);
        }
    }

    useEffect(() => {
        fetchProduct(id, setProduct, navigate);
    }, [])

    return (
        <div className={s.pPag}>
            <div className={s.pInfCont}>
                <div className={s.pTitleSect}>
                    <h1 className={s.text}>Product #{product.productId} information</h1>
                </div>
                <div 
                    style={{
                        backgroundImage: `url(${BASE64_RESOLVER + image})`
                    }}
                    className={s.imageSect}
                ></div>
                <input 
                    className={s.inpF} 
                    type="file"
                    onChange={ e => 
                        getBase64(
                            e.target.files[0], 
                            setImage
                        )
                    }
                 /> 
                <div className={s.pMetaSect}>
                    <label className={s.lab}>
                        { err?.name && <p className={s.validationError}>{ err.name }</p> }
                        Product name
                        <input 
                            type="text" 
                            value={ name } 
                            onChange={ e => setName(e.target.value) }
                        />
                    </label>
                    <label className={s.lab}>
                        { err?.price && <p className={s.validationError}>{ err.price }</p> }
                        Price ($)
                        <input 
                            type="number"
                            value={ price } 
                            onChange={ e => setPrice(e.target.value) }
                        />
                    </label>
                    <label className={s.lab}>
                        { err?.stock && <p className={s.validationError}>{ err.stock }</p> }
                        Stock
                        <input 
                            type="number"
                            value={ stock }
                            onChange={ e => setStock(e.target.value) } 
                        />
                    </label>   
                </div>
                
                <CategoriesSelect categories={ categories } setCategories={ setCategories } />
                
                <div className={s.descSect}>
                    <label className={s.descLab}>
                        Description
                        <textarea 
                            rows={20}
                            className={s.desc} 
                            value={ description } 
                            onChange={ e => setDescription(e.target.value) }
                        />
                    </label>
                </div>
                <div className={s.submSect}>
                    { err && <p className={s.validationError}>Incorrect data</p> }
                    <button 
                        onClick=
                            { () => 
                                saveChanges(
                                    product.productId, 
                                    {
                                        name: name,
                                        image: image,
                                        price: price,
                                        stock: stock,
                                        description: description,
                                        productTypes: categories
                                    },
                                    user.jwt,
                                    navigate,
                                    setErr
                                ) 
                            }
                        style={ btnPrim }
                        className={s.tColr}
                    >
                    Save changes
                    </button> 
                </div>
                <button
                    onClick={ () => window.history.back() }
                    style={ btnBack }
                    className={s.tColr} 
                >
                Back
                </button>
            </div>
        </div>
    )
}

const saveChanges = async (id, newProduct, token, navigate, setErr) => {
    try {
        console.log(newProduct)
        await api.patch(
            PRODUCTS + "/" + id,
            newProduct,
            {
                headers: {
                    "Authorization": token
                }
            }
        )

        window.location.reload(false);
    } catch(error) {
        if (error.response?.data) {
            setErr(error.response.data);
            return;
        }

        navigate(ERROR_PAGE);
    }
}

const btnPrim = {
    height: "2.5em", 
    width: "150px", 
    backgroundColor: "#2473FF", 
    color: "white", 
    borderRadius: "15px",
    marginBottom: "10px",
    marginTop: "10px"
};

const btnBack = {
    height: "2.5em", 
    width: "150px",
    borderRadius: "15px" 
};