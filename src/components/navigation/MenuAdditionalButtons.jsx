import { 
    LOGIN_PAGE, 
    CART_PAGE
} from "../../utils/constants";
import s from "../../style/NavigationBar.module.css";
import { useSelector } from "react-redux";
import nh from "../../utils/navigationHelper";

const MenuAdditionalButtons = () => {
    const ctx = {};
    ctx.user = useSelector(state => state.user);
    ctx.products = useSelector(state => state.cart.products);

    let productsInCart = nh.evalProductsInCart(ctx);
    
    return (
        <div className={s.menuAdditionalButtonsContainer}>
            <div className={s.accountButtonMenu}>
                <a href={CART_PAGE} 
                    className={
                        `${s.cartButton} 
                        ${s.accountButton} 
                        ${s.accountButtonMenuContent}`
                    }
                >
                    <div style={ nh.cartImage } className={`${s.icon} ${s.cartIcon}`}></div>
                    <div className={s.counterStyle} style={ productsInCart ? nh.showStyle : {} }>
                        <div>{productsInCart}</div>
                    </div>
                    <p className={s.accountText}>Cart</p>
                </a>
                
                <a href={LOGIN_PAGE} className={`${s.accountButton} ${s.accountButtonMenuContent}`}>
                    <div style={ nh.accountImage(ctx) } className={s.icon}></div>
                    <p className={s.accountText}>{ nh.accountText(ctx) }</p>
                </a>
            </div>
        </div>
    );
}

export default MenuAdditionalButtons;