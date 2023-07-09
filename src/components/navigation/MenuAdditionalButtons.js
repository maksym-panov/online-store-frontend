import { LOGIN_PAGE, CART_PAGE } from "../../utils/constants";
import styles from "../../style/NavigationBar.module.css";
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
        <div className={styles.menuAdditionalButtonsContainer}>
            <div className={`${styles.languageSwitch} ${styles.languageSwitchMenu}`}>
                <div className={styles.languageButton}>
                    <label className={styles.languageFlag}>
                        <input type="radio" value="eng" name="language" className={styles.radioHidden} />
                        🇬🇧
                    </label>
                </div>
                <div className={styles.languageButton}>
                    <label className={styles.languageFlag}>
                        <input type="radio" value="ukr" name="language" className={styles.radioHidden} />
                        🇺🇦
                    </label>
                </div>
            </div>

            <div className={styles.accountButtonMenu}>
                <a 
                    href={CART_PAGE} 
                    className={
                        `${styles.cartButton} 
                        ${styles.accountButton} 
                        ${styles.accountButtonMenuContent}`
                    }
                >
                    <div 
                        style={{
                            backgroundImage: `url(${cart})`
                        }}
                        className={`${styles.icon} ${styles.cartIcon}`} 
                    >
                    </div>
                    <div className={styles.counterStyle} style={productsInCart ? showStyle : {}}>
                        <div>
                        {productsInCart}
                        </div>
                    </div>
                    <p className={styles.accountText}>Cart</p>
                </a>
                
                <a 
                    href={LOGIN_PAGE} 
                    className={
                        `${styles.accountButton} 
                        ${styles.accountButtonMenuContent}`}
                >
                    <div 
                        style=
                        {
                            user && user.image ?
                            { backgroundImage: `url("data:image/jpg;base64,${user.image}")` }
                            :
                            { backgroundImage: `url(${account})` }
                        }
                        className={styles.icon} 
                    >
                    </div>
                    <p className={styles.accountText}>
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