import { 
    CATEGORIES_PAGE, 
    DELIVERY_PAGE, 
    ABOUT_PAGE, 
    CONTACTS_PAGE, 
    EMPTY_PAGE 
} from "../../utils/constants";
import s from "../../style/NavigationBar.module.css";

export function MenuLinks() {
    return (
        <ul className={s.menuLinksContainer}>
            <a className={s.menuLinkContainer} href={EMPTY_PAGE}><li className={s.menuLink}>Products</li></a>
            <a className={s.menuLinkContainer} href={CATEGORIES_PAGE}><li className={s.menuLink}>Categories</li></a>
            <a className={s.menuLinkContainer} href={DELIVERY_PAGE}><li className={s.menuLink}>Delivery</li></a>
            <a className={s.menuLinkContainer} href={CONTACTS_PAGE}><li className={s.menuLink}>Contacts</li></a>
            <a className={s.menuLinkContainer} href={ABOUT_PAGE}><li className={s.menuLink}>About</li></a>
        </ul>
    );
}