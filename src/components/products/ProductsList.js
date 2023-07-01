import { useEffect, useState } from "react";
import styles from "../../style/Products.module.css";
import Axios from "axios";
import { API_BASE_URL, PRODUCTS, PRODUCTS_PAGE } from "../../utils/constants";
import { Link } from "react-router-dom";
import productImage from "../../img/product.png";

export function ProductsList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(setProducts);
    }, []);

    return (
        <div className={styles.productsListContainer}>
            <div className={styles.productsList}>
                {
                    products?.map(prod => {
                        return (
                            <div key={prod.productId} className={styles.productCardBodyContainer}>
                                <div className={styles.productCardBody}>
                                    <Link className={styles.productCardImageLink} to={PRODUCTS_PAGE + "?id=" + prod.productId}>
                                        <img src={productImage} alt={prod.name} className={styles.productCardImage} />
                                    </Link>
                                    <div className={styles.productCardContent}>
                                        <Link className={styles.productCardLink} to={PRODUCTS_PAGE + "?id=" + prod.productId}>
                                            <h1 className={styles.productCardTitle}>
                                                {prod.name}
                                            </h1>
                                        </Link>
                                        <p className={styles.productCardPrice}>
                                            ${prod.price}
                                        </p>
                                    </div>
                                    <Link className={`${styles.productCardLink} ${styles.productCardButtonSection}`} to={PRODUCTS_PAGE + "?id=" + prod.productId}>
                                        <button className={styles.productCardButton}>To cart</button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

async function fetchProducts(setProducts) {
    const result = await Axios.get(API_BASE_URL + PRODUCTS).then(res => res.data);
    setProducts([...result, ...result, ...result, ...result]);
}