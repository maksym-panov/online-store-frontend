import { LOGIN_PAGE, CART_PAGE } from "../../utils/constants";
import styles from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import account from "../../img/account.png";
import cart from "../../img/cart.png";

export function MenuAdditionalButtons() {
    let productsInCart = 14;
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
                <Link to={CART_PAGE} className={`${styles.cartButton} ${styles.accountButtonMenuContent}`}>
                    <img src={cart} alt="cart" className={styles.icon} />
                    <div className={styles.counterStyle} style={productsInCart ? showStyle : {}}>
                        <div>
                            {productsInCart}
                        </div>
                    </div>
                    Cart
                </Link>
                <Link to={LOGIN_PAGE} className={`${styles.accountButton} ${styles.accountButtonMenuContent}`}>
                    <img src={account} alt="account" className={styles.icon} />
                    Account
                </Link>
            </div>
        </div>
    );
}