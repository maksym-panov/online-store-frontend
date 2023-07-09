import { 
    API_BASE_URL, 
    API_ENTITIES_PER_PAGE_PARAM, 
    API_OFFSET_PARAM, 
    PRODUCTS, 
    PRODUCTS_PAGE, 
    PRODUCTS_PER_PAGE 
} from "../../utils/constants";
import { useEffect, useState } from "react";
import styles from "../../style/Products.module.css";
import { Link, useSearchParams } from "react-router-dom";
import productImageNotFound from "../../img/search.png";
import { Pagination } from "../../common/Pagination";
import { api } from "../../utils/axiosHelper";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cartSlice";

export function ProductsList() {
    const dispatch = useDispatch();
    const [products, setProducts, productsLoading] = useState([]);
    const [params, setParams] = useSearchParams();
    
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
    }, [page]);

    const fetchProducts = async () => {
        const offset = (page - 1) * PRODUCTS_PER_PAGE;
        const number = 2 * PRODUCTS_PER_PAGE + 1;
        const query = API_BASE_URL + PRODUCTS + "?" + API_OFFSET_PARAM + offset + "&" + API_ENTITIES_PER_PAGE_PARAM + number;
        const result = await api.get(query).then(resp => resp.data);
    
        if (result.length == 0 && page != 1) {
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


    return (
        <div className={styles.productsListContainer}>
            <div className={styles.productsList}>
                {
                    products?.slice(0, PRODUCTS_PER_PAGE).map(prod => {
                        return (
                            <div key={prod.productId} className={styles.productCardBodyContainer}>
                                <div className={styles.productCardBody}>
                                    <Link className={styles.productCardImageLink} to={PRODUCTS_PAGE + "?id=" + prod.productId}>
                                        <img 
                                            src={
                                                prod.image == null ? 
                                                productImageNotFound : 
                                                `data:image/png;base64,${prod.image}`
                                            } 
                                            alt={prod.name} 
                                            className={styles.productCardImage} 
                                        />
                                    </Link>
                                    <div className={styles.productCardContent}>
                                        <Link 
                                            className={styles.productCardLink} 
                                            to={PRODUCTS_PAGE + "?id=" + prod.productId}
                                        >
                                            <h1 className={styles.productCardTitle}>
                                                {prod.name}
                                            </h1>
                                        </Link>
                                    </div>
                                    <div className={styles.productCardBottomSection}>
                                        <div className={styles.buyAndPrice}>
                                            <p className={styles.productCardPrice}>
                                                ${prod.price}
                                            </p>
                                            <button 
                                                onClick={ addToCart(prod.productId, prod.stock) } 
                                                className={styles.productCardButton}
                                            >
                                            To cart
                                            </button>
                                        </div>
                                        <div className={styles.stockAndRating}>
                                            <p 
                                                className={styles.productStatus} 
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
            {!productsLoading && <Pagination baseUrl={PRODUCTS_PAGE} current={page} perPage={PRODUCTS_PER_PAGE} entities={products} />}
        </div>
    );
}

const stockStatus = (stock) => stock > 0 ? "In stock" : "Out of stock";
const outOfStockColor = (stock) => stock <= 0 ? { color: "black" } : { color: "#2473FF" }