import { PRODUCTS_PAGE, CATEGORIES_PAGE, DELIVERY_PAGE, ABOUT_PAGE, CONTACTS_PAGE, LOGIN_PAGE, CART_PAGE } from "../utils/constants";
import styles from "../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import logo from "../style/shopping.png";
import account from "../style/account.png";
import cart from "../style/cart.png";
import menu from "../style/menu.png";

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
          <Link to={CART_PAGE} className={styles.cartButton}>
            <img src={cart} alt="cart" className={styles.icon} />
            <p>Cart</p>
          </Link>
          <Link to={LOGIN_PAGE} className={styles.accountButton}>
            <img src={account} alt="account" className={styles.icon} />
            <p>Account</p>
          </Link>
        </div>

        <div className={styles.menuContainer}>
            <div className={styles.menuContentBox}>
              <input type="checkbox" id="menuCheckBoxId" className={styles.menuCheckbox} />
              <label htmlFor="menuCheckBoxId" className={styles.innerMenu}>
                <img src={menu} alt="menu" className={styles.menuIcon} />
                <ul className={styles.menuLinksContainer}>
                  <li><Link className={styles.menuLinkContainer} to={CATEGORIES_PAGE}>Categories</Link></li>
                  <li><Link className={styles.menuLinkContainer} to={PRODUCTS_PAGE}>Products</Link></li>
                  <li><Link className={styles.menuLinkContainer} to={DELIVERY_PAGE}>Delivery</Link></li>
                  <li><Link className={styles.menuLinkContainer} to={CONTACTS_PAGE}>Contacts</Link></li>
                  <li><Link className={styles.menuLinkContainer} to={ABOUT_PAGE}>About</Link></li>
                </ul>
              </label>
            </div>
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