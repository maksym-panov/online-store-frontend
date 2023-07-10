import { LOGIN_PAGE, CART_PAGE } from "../../utils/constants";
import s from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import account from "../../img/account.png";
import cart from "../../img/cart.png";
import { useSelector } from "react-redux";

export function MenuAdditionalButtons() {
    const user = useSelector(state => state.user);
    const products = useSelector(state => state.cart.products);

    const evalProductsInCart = () => {
        let count = 0;
        products.forEach(p => {
            count += p.quantity;
        });
        return count;
    }

    let productsInCart = evalProductsInCart();
    let font = 0.8;

    const showStyle = {
        display: "flex",
        fontSize: `${font}rem`
    }
    
    return (
        <div className={s.menuAdditionalButtonsContainer}>
            

            <div className={s.accountButtonMenu}>
                <a 
                    href={CART_PAGE} 
                    className={
                        `${s.cartButton} 
                        ${s.accountButton} 
                        ${s.accountButtonMenuContent}`
                    }
                >
                    <div 
                        style={{
                            backgroundImage: `url(${cart})`
                        }}
                        className={`${s.icon} ${s.cartIcon}`} 
                    >
                    </div>
                    <div className={s.counterStyle} style={productsInCart ? showStyle : {}}>
                        <div>
                        {productsInCart}
                        </div>
                    </div>
                    <p className={s.accountText}>Cart</p>
                </a>
                
                <a 
                    href={LOGIN_PAGE} 
                    className={
                        `${s.accountButton} 
                        ${s.accountButtonMenuContent}`}
                >
                    <div 
                        style=
                        {
                            user && user.image ?
                            { backgroundImage: `url("data:image/jpg;base64,${user.image}")` }
                            :
                            { backgroundImage: `url(${account})` }
                        }
                        className={s.icon} 
                    >
                    </div>
                    <p className={s.accountText}>
                        {
                            user && user.personalInfo && user.personalInfo.firstname ? 
                            user.personalInfo.firstname : 
                            "Account"
                        }
                    </p>
                </a>
            </div>
        </div>
    );
}