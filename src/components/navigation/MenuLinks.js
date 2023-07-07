import { 
    CATEGORIES_PAGE, 
    DELIVERY_PAGE, 
    ABOUT_PAGE, 
    CONTACTS_PAGE, 
    EMPTY_PAGE 
} from "../../utils/constants";
import styles from "../../style/NavigationBar.module.css";

export function MenuLinks() {
    return (
        <ul className={styles.menuLinksContainer}>
            <a className={styles.menuLinkContainer} href={EMPTY_PAGE}><li className={styles.menuLink}>Products</li></a>
            <a className={styles.menuLinkContainer} href={CATEGORIES_PAGE}><li className={styles.menuLink}>Categories</li></a>
            <a className={styles.menuLinkContainer} href={DELIVERY_PAGE}><li className={styles.menuLink}>Delivery</li></a>
            <a className={styles.menuLinkContainer} href={CONTACTS_PAGE}><li className={styles.menuLink}>Contacts</li></a>
            <a className={styles.menuLinkContainer} href={ABOUT_PAGE}><li className={styles.menuLink}>About</li></a>
        </ul>
    );
}