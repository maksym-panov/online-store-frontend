import { 
    API_BASE_URL, 
    API_ENTITIES_PER_PAGE_PARAM, 
    API_NAME_PARAM, 
    API_OFFSET_PARAM, 
    API_PROD_CATEGORY_PARAM, 
    BASE64_RESOLVER, 
    CATEGORIES_PAGE, 
    PRODUCTS, 
    PRODUCTS_PAGE, 
    PRODUCTS_PER_PAGE 
} from "../../utils/constants";
import { useEffect, useState } from "react";
import s from "../../style/Products.module.css";
import { Link, useSearchParams } from "react-router-dom";
import productImageNotFound from "../../img/search.png";
import { Pagination } from "../../common/Pagination";
import { api } from "../../utils/axiosHelper";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cartSlice";

export function ProductsList(props) {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [params, setParams] = useSearchParams();

    const catId = props.categoryId;
    
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

    const fetchProducts = async () => {
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
    }

    const addToCart = (id, stock) => () => { 
        dispatch(addProductToCart(
            {
                id: id,
                stock: stock
            }
        )) 
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const title = {
        margin: "20px",
        textAlign: "center"
    }

    return (
        <div id="productList" className={s.productsListContainer}>
            { params.get("name") && <h1 style={title}>Search result for "{params.get("name")}"</h1>}
            <div className={s.productsList}>
                {
                    products?.slice(0, PRODUCTS_PER_PAGE).map(prod => {
                        return (
                            <div key={prod.productId} className={s.productCardBodyContainer}>
                                <div className={s.productCardBody}>
                                    <Link 
                                        className={s.productCardImageLink} 
                                        to={PRODUCTS_PAGE + "?id=" + prod.productId}
                                    >
                                        <img 
                                            src={
                                                prod.image == null ? 
                                                productImageNotFound : 
                                                BASE64_RESOLVER + prod.image
                                            } 
                                            alt={prod.name} 
                                            className={s.productCardImage} 
                                        />
                                    </Link>
                                    <div className={s.productCardContent}>
                                        <Link 
                                            className={s.productCardLink} 
                                            to={PRODUCTS_PAGE + "?id=" + prod.productId}
                                        >
                                            <h1 className={s.productCardTitle}>
                                                {prod.name}
                                            </h1>
                                        </Link>
                                    </div>
                                    <div className={s.productCardBottomSection}>
                                        <div className={s.buyAndPrice}>
                                            <p className={s.productCardPrice}>
                                                ${prod.price.toFixed(2)}
                                            </p>
                                            <button 
                                                onClick={ addToCart(prod.productId, prod.stock) } 
                                                className={s.productCardButton}
                                            >
                                            To cart
                                            </button>
                                        </div>
                                        <div className={s.stockAndRating}>
                                            <p 
                                                className={s.productStatus} 
                                                style={outOfStockColor(prod.stock)}
                                            >
                                                {stockStatus(prod.stock)}
                                            </p>
                                        </div>
                                    </div>                                
                                </div>    
                            </div>
                        );
                    })
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

const stockStatus = (stock) => stock > 0 ? "In stock" : "Out of stock";
const outOfStockColor = (stock) => stock <= 0 ? { color: "black" } : { color: "#2473FF" }