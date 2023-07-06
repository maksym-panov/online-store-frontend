import styles from "../../style/Products.module.css";
import { Link } from "react-router-dom";
import { API_BASE_URL, CATEGORIES_PAGE, PRODUCTS, PRODUCTS_PAGE, PRODUCT_CATEGORIES } from "../../utils/constants";
import { useEffect, useState } from "react";
import Axios from "axios";
import arrow from "../../img/arrow.png";
import empty from "../../img/search.png";

export function InformationPanel() {
    const [categories, setCategories] = useState([]);
    const [bannerProduct, setBannerProduct] = useState(null);

    useEffect(() => {
        fetchCategories(setCategories);
        fetchBannerProduct(setBannerProduct);
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
                <Link to={ PRODUCTS_PAGE + "?id=" + bannerProduct?.productId } className={styles.informationBannerLink}>
                    <img src={`data:image/png;base64,${bannerProduct?.image}`} className={styles.informationBannerImage}/>
                </Link>
                <div className={styles.descriptionPanel}>
                    <h1 className={styles.descriptionPanelHeader}>{bannerProduct?.name}</h1>
                    <div className={styles.descriptionSeparator}></div>
                    <div className={styles.priceContainer}>
                        <h1 className={styles.price}><span className={styles.priceBefore}></span>{bannerProduct && ("$" + bannerProduct.price)}</h1>
                    </div>
                    <div className={styles.descriptionPanelButtonContainer}>
                        <Link to={PRODUCTS_PAGE + "?id=" + bannerProduct?.productId}><button className={styles.descriptionPanelButton}>Go to product page</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function fetchCategories(setCategories) {
    const data = await Axios.get(API_BASE_URL + PRODUCT_CATEGORIES).then(resp => resp.data);
    setCategories(data.slice(0, 16));
}

async function fetchBannerProduct(setBannerProduct) {
    const product = await Axios.get(API_BASE_URL + PRODUCTS + "/" + Math.ceil(Math.random() * 80))
                            .then(res => res.data);
    setBannerProduct(product)
}