import s from "../../style/Footer.module.css";
import { Link } from "react-router-dom";
import { ABOUT_PAGE, CART_PAGE, CATEGORIES_PAGE, CONTACTS_PAGE, DELIVERY_PAGE, EMPTY_PAGE, LOGIN_PAGE, PRODUCTS_PAGE } from "../../utils/constants";

export function Footer() {
    return (
        <footer className={s.pageFooter}>
            <div className={s.footerContentContainer}>
                <div className={s.footerContentBlock}>
                    <h1 className={s.blockTitle}>Navigation</h1>
                    <Link className={s.footerLink} to={PRODUCTS_PAGE}>All</Link>
                    <Link className={s.footerLink} to={EMPTY_PAGE}>Home</Link>
                    <Link className={s.footerLink} to={CATEGORIES_PAGE}>Categories</Link>
                </div>
                <div className={s.footerContentBlock}>
                    <h1 className={s.blockTitle}>Information</h1>
                    <Link className={s.footerLink} to={DELIVERY_PAGE}>Delivery policy</Link>
                    <Link className={s.footerLink} to={ABOUT_PAGE}>About us</Link>
                    <Link className={s.footerLink} to={CONTACTS_PAGE}>Contact us</Link>
                </div>
                <div className={s.footerContentBlock}>
                    <h1 className={s.blockTitle}>May be useful</h1>
                    <Link className={s.footerLink} to={LOGIN_PAGE}>Account</Link>
                    <Link className={s.footerLink} to={CART_PAGE}>Cart</Link>
                </div>
            </div>
            <div className={s.footerRightsLine}>
                <h1 className={s.blockTitle}>© 2023 Raccoon's community. All rights reserved. </h1>
            </div>
        </footer>
    );
}