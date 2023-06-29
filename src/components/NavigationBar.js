import { PRODUCTS_PAGE, CATEGORIES_PAGE, DELIVERY_PAGE, ABOUT_PAGE, CONTACTS_PAGE, LOGIN_PAGE, CART_PAGE } from "../utils/constants";
import styles from "../style/NavigationBar.module.css";
import { Link } from "react-router-dom";
import logo from "../style/shopping.png";
import account from "../style/account.png";
import cart from "../style/cart.png";
import menu from "../style/menu.png";
import x from "../style/x.png";

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
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={PRODUCTS_PAGE}>Products</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={CATEGORIES_PAGE}>Categories</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={DELIVERY_PAGE}>Delivery</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={CONTACTS_PAGE}>Contacts</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={ABOUT_PAGE}>About</Link>
        </div>

        <div className={styles.accountContainer}>
          <div className={styles.languageSwitch}>
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
          <button className={styles.menu}>
            <div className={styles.menuButton}>
              <img src={menu} alt="menu" className={styles.menuIcon} />
            </div>

            <div className={styles.menuLinksBackgroundContainer}>
              <ul className={styles.menuLinksContainer}>
                <Link className={styles.menuLinkContainer} to={PRODUCTS_PAGE}><li className={styles.menuLink}>Products</li></Link>
                <Link className={styles.menuLinkContainer} to={CATEGORIES_PAGE}><li className={styles.menuLink}>Categories</li></Link>
                <Link className={styles.menuLinkContainer} to={DELIVERY_PAGE}><li className={styles.menuLink}>Delivery</li></Link>
                <Link className={styles.menuLinkContainer} to={CONTACTS_PAGE}><li className={styles.menuLink}>Contacts</li></Link>
                <Link className={styles.menuLinkContainer} to={ABOUT_PAGE}><li className={styles.menuLink}>About</li></Link>
              </ul>

              <hr className={styles.horisontalRulerMenu} />

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
                    Cart
                  </Link>
                  <Link to={LOGIN_PAGE} className={`${styles.accountButton} ${styles.accountButtonMenuContent}`}>
                    <img src={account} alt="account" className={styles.icon} />
                    Account
                  </Link>
                </div>
              </div>
            </div>
          </button>  
          <button className={styles.closeButton}>
                <img src={x} alt="close" className={styles.closeIcon} />
          </button>
          
        </div>
      </header>
    );
}

export default NavigationBar;