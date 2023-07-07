import { 
  PRODUCTS_PAGE, 
  ABOUT_PAGE, 
  CATEGORIES_PAGE, 
  CONTACTS_PAGE, 
  DELIVERY_PAGE, 
  LOGIN_PAGE, 
  EMPTY_PAGE ,
  PROFILE_PAGE,
  REGISTRATION_PAGE,
  CHANGE_PROFILE_PAGE
} from "../utils/constants.js";
import { Categories } from "../pages/Categories";
import { Deliveries } from "../pages/Deliveries";
import { Products } from "../pages/Products";
import { Contacts } from "../pages/Contacts";
import { Login } from "../pages/Login";
import { About } from "../pages/About";
import { Register } from "../pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "../style/Main.module.css";
import { Profile } from "../pages/Profile.js";
import { useSelector } from "react-redux";
import { ChangeProfile } from "../pages/ChangeProfile.js";

export function Main() {
  const user = useSelector(state => state.user);
  const id = user.userId;

  return (
    <main className={styles.mainBody}>
      <Routes>
        <Route path={ EMPTY_PAGE } element={<Products />} />
        <Route path={ PRODUCTS_PAGE } element={<Products />} />
        <Route path={ CATEGORIES_PAGE } element={<Categories />} />
        <Route path={ DELIVERY_PAGE } element={<Deliveries />} />
        <Route path={ ABOUT_PAGE } element={<About />} />
        <Route path={ CONTACTS_PAGE } element={<Contacts />} />
        <Route 
          path={ REGISTRATION_PAGE } 
          element={ !id ? <Register /> : <Navigate replace to={ PROFILE_PAGE } /> } 
        />
        <Route 
          path={ LOGIN_PAGE } 
          element={ !id ? <Login /> : <Navigate replace to={ PROFILE_PAGE } /> } 
        />
        <Route 
          path={ PROFILE_PAGE } 
          element={ id ? <Profile /> : <Navigate replace to={ LOGIN_PAGE } /> } 
        />
        <Route 
          path={ CHANGE_PROFILE_PAGE }
          element={ id ? <ChangeProfile /> : <Navigate replace to={ LOGIN_PAGE } /> } 
        />
      </Routes>
    </main>
  );
}