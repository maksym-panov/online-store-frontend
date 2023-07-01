import styles from "../../style/Products.module.css";
import acer_predator from "../../img/acer_predator.jpg";
import { Link } from "react-router-dom";
import { API_BASE_URL, CATEGORIES_PAGE, PRODUCTS_PAGE, PRODUCT_CATEGORIES } from "../../utils/constants";
import { useEffect, useState } from "react";
import Axios from "axios";
import arrow from "../../img/arrow.png";

export function InformationPanel() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories(setCategories);
    }, []);

    return (
        <div className={styles.informationPanelContainer}>
            <div className={styles.categoriesContainer}>
                {categories?.map(c => {
                    return (
                        <Link key={c.productTypeId} className={styles.categoryLink} to={CATEGORIES_PAGE + "?id=" + c.productTypeId}>
                            <div className={styles.categoryContainer}>
                                <p className={styles.category}>{c.name}</p>
                                <img className={styles.arrow} src={arrow} />
                            </div>
                        </Link>
                    );
                })}        
            </div>
            <div className={styles.informationBanner}>
                <Link to={ PRODUCTS_PAGE + "?id=1" } className={styles.informationBannerLink}>
                    <img src={acer_predator} className={styles.informationBannerImage}/>
                </Link>
                <div className={styles.descriptionPanel}>
                    <h1 className={styles.descriptionPanelHeader}>Predator Helios 300</h1>
                    <div className={styles.descriptionSeparator}></div>
                    <div className={styles.priceContainer}>
                        <h1 className={styles.price}><span className={styles.priceBefore}>$2500</span> $2399.99</h1>
                    </div>
                    <div className={styles.descriptionPanelButtonContainer}>
                        <Link to={PRODUCTS_PAGE + "?id=1"}><button className={styles.descriptionPanelButton}>Go to product page</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function fetchCategories(setCategories) {
    const data = await Axios.get(API_BASE_URL + PRODUCT_CATEGORIES).then(resp => resp.data);
    console.log(data.slice(0, 16));
    setCategories(data.slice(0, 16));
}