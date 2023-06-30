import { CATEGORIES_PAGE, DELIVERY_PAGE, ABOUT_PAGE, CONTACTS_PAGE, EMPTY_PAGE } from "../../utils/constants";
import styles from "../../style/NavigationBar.module.css";
import { Link } from "react-router-dom";

export function MenuLinks() {
    return (
        <ul className={styles.menuLinksContainer}>
            <Link className={styles.menuLinkContainer} to={EMPTY_PAGE}><li className={styles.menuLink}>Products</li></Link>
            <Link className={styles.menuLinkContainer} to={CATEGORIES_PAGE}><li className={styles.menuLink}>Categories</li></Link>
            <Link className={styles.menuLinkContainer} to={DELIVERY_PAGE}><li className={styles.menuLink}>Delivery</li></Link>
            <Link className={styles.menuLinkContainer} to={CONTACTS_PAGE}><li className={styles.menuLink}>Contacts</li></Link>
            <Link className={styles.menuLinkContainer} to={ABOUT_PAGE}><li className={styles.menuLink}>About</li></Link>
        </ul>
    );
}