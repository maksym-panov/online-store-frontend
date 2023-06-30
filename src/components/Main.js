import { PRODUCTS_PAGE, ABOUT_PAGE, CATEGORIES_PAGE, CONTACTS_PAGE, DELIVERY_PAGE, LOGIN_PAGE, EMPTY_PAGE } from "../utils/constants.js";
import { Categories } from "../pages/Categories";
import { Deliveries } from "../pages/Deliveries";
import { Products } from "../pages/Products";
import { Contacts } from "../pages/Contacts";
import { Login } from "../pages/Login";
import { About } from "../pages/About";
import styles from "../style/Main.module.css";
import { Routes, Route } from "react-router-dom";

export function Main() {
    return (
        <main className={styles.mainBody}>
          <Routes>
            <Route path={ EMPTY_PAGE } element={<Products />} />
            <Route path={ PRODUCTS_PAGE } element={<Products />} />
            <Route path={ CATEGORIES_PAGE } element={<Categories />} />
            <Route path={ DELIVERY_PAGE } element={<Deliveries />} />
            <Route path={ ABOUT_PAGE } element={<About />} />
            <Route path={ CONTACTS_PAGE } element={<Contacts />} />
            <Route path={ LOGIN_PAGE } element={<Login />} />
          </Routes>
        </main>
    );
}