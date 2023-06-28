import { PRODUCTS_PAGE, CATEGORIES_PAGE, DELIVERY_PAGE, ABOUT_PAGE, CONTACTS_PAGE, LOGIN_PAGE, CART_PAGE } from "../utils/constants";
import styles from "../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import logo from "../style/shopping.png";
import account from "../style/account.png";
import cart from "../style/cart.png";

function NavigationBar() {
    return (
      <header className={styles.headerPrimary}>
        <div className={styles.logoContainer}>
          <Link className={styles.logoLink} to={PRODUCTS_PAGE}>
            <img src={logo} alt="shopping" className={styles.logoIcon} />
            <span className={styles.logoPrimary}>
              Raccoon's
            </span>
          </Link>
        </div>

        <div className={styles.linksContainer}>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={CATEGORIES_PAGE}>Categories</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={PRODUCTS_PAGE}>Products</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={DELIVERY_PAGE}>Delivery</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={CONTACTS_PAGE}>Contacts</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={ABOUT_PAGE}>About</Link>
        </div>

        <div className={styles.accountContainer}>
          <div className={styles.languageSwitch}>
            <a href="#" className={styles.languageButton}>🇬🇧</a>
            <a href="#" className={styles.languageButton}>🇺🇦</a>
          </div>
          <a href={CART_PAGE} className={styles.cartButton}>
            <img src={cart} alt="cart" className={styles.icon} />
            <p>Cart</p>
          </a>
          <a href={LOGIN_PAGE} className={styles.accountButton}>
            <img src={account} alt="account" className={styles.icon} />
            <p>Account</p>
          </a>
        </div>
      </header>
    );
}

const visibleStyle = {
  display: "flex"
};

const hiddenStyle = {
  display: "none"
}

export default NavigationBar;