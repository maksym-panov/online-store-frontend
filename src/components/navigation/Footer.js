import styles from "../../style/Footer.module.css";
import { Link } from "react-router-dom";
import { ABOUT_PAGE, CART_PAGE, CATEGORIES_PAGE, CONTACTS_PAGE, DELIVERY_PAGE, EMPTY_PAGE, LOGIN_PAGE, PRODUCTS_PAGE } from "../../utils/constants";

export function Footer() {
    return (
        <footer className={styles.pageFooter}>
            <div className={styles.footerContentContainer}>
                <div className={styles.footerContentBlock}>
                    <h1 className={styles.blockTitle}>Navigation</h1>
                    <Link className={styles.footerLink} to={PRODUCTS_PAGE}>All</Link>
                    <Link className={styles.footerLink} to={EMPTY_PAGE}>Home</Link>
                    <Link className={styles.footerLink} to={CATEGORIES_PAGE}>Categories</Link>
                </div>
                <div className={styles.footerContentBlock}>
                    <h1 className={styles.blockTitle}>Information</h1>
                    <Link className={styles.footerLink} to={DELIVERY_PAGE}>Delivery policy</Link>
                    <Link className={styles.footerLink} to={ABOUT_PAGE}>About us</Link>
                    <Link className={styles.footerLink} to={CONTACTS_PAGE}>Contact us</Link>
                </div>
                <div className={styles.footerContentBlock}>
                    <h1 className={styles.blockTitle}>May be useful</h1>
                    <Link className={styles.footerLink} to={LOGIN_PAGE}>Account</Link>
                    <Link className={styles.footerLink} to={CART_PAGE}>Cart</Link>
                </div>
            </div>
            <div className={styles.footerRightsLine}>
                <h1 className={styles.blockTitle}>© 2023 Raccoon's community. All rights reserved. </h1>
            </div>
        </footer>
    );
}