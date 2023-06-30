import { PRODUCTS_PAGE, CATEGORIES_PAGE, DELIVERY_PAGE, ABOUT_PAGE, CONTACTS_PAGE } from "../../utils/constants";
import styles from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";

export function Links() {
    return (
        <div className={styles.linksContainer}>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={PRODUCTS_PAGE}>Products</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={CATEGORIES_PAGE}>Categories</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={DELIVERY_PAGE}>Delivery</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={CONTACTS_PAGE}>Contacts</Link>
          <Link className={`${styles.headerLink} ${styles.linkContainer}`} to={ABOUT_PAGE}>About</Link>
        </div>
    );
}