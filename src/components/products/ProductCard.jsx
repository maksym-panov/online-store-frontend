import { useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cartSlice";
import s from "../../style/Products.module.css";
import { Link } from "react-router-dom";
import productImageNotFound from "../../img/search.png";
import {
    PRODUCTS_PAGE, 
    BASE64_RESOLVER 
} from "../../utils/constants";

export default (props) => {
    const prod = props.product;
    const dispatch = useDispatch();

    const addToCart = (id, stock) => () => { 
        dispatch(addProductToCart(
            {
                id: id,
                stock: stock
            }
        )) 
    };

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
}

const stockStatus = (stock) => stock > 0 ? "In stock" : "Out of stock";
const outOfStockColor = (stock) => stock <= 0 ? { color: "black" } : { color: "#2473FF" }