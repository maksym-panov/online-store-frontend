import Axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, PRODUCTS } from "../utils/constants";
import styles from "../style/Products.module.css";
import search from "../img/search.png";

export function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const prom = await Axios.get(API_BASE_URL + PRODUCTS);
        setProducts(prom.data);
    }

    return (
        <div className={styles.productPageMainContainer}>
            <div className={styles.searchBarContainer}>
                <div className={styles.searchBar}>
                    <img className={styles.searchBarIcon} src={search} alt="searchImage" />
                    <input className={styles.searchBarPrompt} type="text" placeholder="  I want to find"/>
                    <button className={styles.searchBarEnterButton}>Search</button>
                </div>
            </div>
            <div className={styles.informationPanelContainer}>

            </div>
            <div className={styles.productsListContainer}>
                <div className={styles.productsList}>

                </div>
            </div>
        </div>
    );
}