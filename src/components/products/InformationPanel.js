import s from "../../style/Products.module.css";
import { 
    Link, 
    useNavigate, 
    useSearchParams 
} from "react-router-dom";
import { 
    BASE64_RESOLVER, 
    CATEGORIES_PAGE, 
    ERROR_PAGE, 
    PRODUCTS, 
    PRODUCTS_PAGE, 
    PRODUCT_CATEGORIES 
} from "../../utils/constants";
import { 
    useEffect, 
    useState 
} from "react";
import arrow from "../../img/arrow.png";
import { api } from "../../utils/axiosHelper";

export function InformationPanel() {
    const [categories, setCategories] = useState([]);
    const [bannerProduct, setBannerProduct] = useState(null);
    const [params, setParams] = useSearchParams();

    const navigate = useNavigate();
    useEffect(() => {
        if (!params.get("name")) {
            fetchCategories(setCategories, navigate);
            fetchBannerProduct(setBannerProduct, navigate);
        }
    }, [params]);

    return (
        <div 
            style={ 
                { 
                    display: params.get("name") ? "none" : "flex" 
                } 
            } 
            className={s.informationPanelContainer}>
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

async function fetchCategories(setCategories, navigate) {
    try {
        const data = await api
            .get(PRODUCT_CATEGORIES)
            .then(resp => resp.data);
        setCategories(data.slice(0, 16));
    } catch(error) {
        navigate(ERROR_PAGE);
    }
    
}

async function fetchBannerProduct(setBannerProduct, navigate) {
    try {
        const product = await api
            .get(PRODUCTS + "/" + Math.ceil(Math.random() * 80))
            .then(res => res.data);
        setBannerProduct(product);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}