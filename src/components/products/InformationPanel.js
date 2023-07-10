import s from "../../style/Products.module.css";
import { Link } from "react-router-dom";
import { 
    API_BASE_URL, 
    BASE64_RESOLVER, 
    CATEGORIES_PAGE, 
    PRODUCTS, 
    PRODUCTS_PAGE, 
    PRODUCT_CATEGORIES 
} from "../../utils/constants";
import { 
    useEffect, 
    useState 
} from "react";
import Axios from "axios";
import arrow from "../../img/arrow.png";

export function InformationPanel() {
    const [categories, setCategories] = useState([]);
    const [bannerProduct, setBannerProduct] = useState(null);

    useEffect(() => {
        fetchCategories(setCategories);
        fetchBannerProduct(setBannerProduct);
    }, []);

    return (
        <div className={s.informationPanelContainer}>
            <div className={s.categoriesContainer}>
                {categories?.map(c => {
                    return (
                        <Link 
                            key={c.productTypeId} 
                            className={s.categoryLink} 
                            to={CATEGORIES_PAGE + "?id=" + c.productTypeId}
                        >
                            <div className={s.categoryContainer}>
                                <p className={s.category}>{c.name}</p>
                                <img className={s.arrow} src={arrow} />
                            </div>
                        </Link>
                    );
                })}        
            </div>
            <div className={s.informationBanner}>
                <Link 
                    to={ PRODUCTS_PAGE + "?id=" + bannerProduct?.productId } 
                    className={s.informationBannerLink}>
                    <img 
                        src={BASE64_RESOLVER + bannerProduct?.image} 
                        className={s.informationBannerImage}
                    />
                </Link>
                <div className={s.descriptionPanel}>
                    <h1 className={s.descriptionPanelHeader}>
                        {bannerProduct?.name}
                    </h1>
                    <div className={s.descriptionSeparator}></div>
                    <div className={s.priceContainer}>
                        <h1 className={s.price}>
                            <span className={s.priceBefore}>

                            </span>
                            {
                                bannerProduct && 
                                "$" + bannerProduct.price.toFixed(2)
                            }
                        </h1>
                    </div>
                    <div className={s.descriptionPanelButtonContainer}>
                        <Link 
                            to={
                                PRODUCTS_PAGE + "?id=" + bannerProduct?.productId
                            }
                        >
                            <button className={s.descriptionPanelButton}>
                                Go to page
                            </button>
                        </Link>
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