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
  CHANGE_PROFILE_PAGE,
  CART_PAGE,
  CHECKOUT_PAGE,
  ERROR_PAGE,
  ACCESS_DENIED_PAGE,
  ORDER_POSTED_PAGE
} from "../utils/constants";
import Categories from "../pages/global/Categories";
import Deliveries from "../pages/global/Deliveries";
import Products from "../pages/global/Products";
import Contacts from "../pages/global/Contacts";
import Login from "../pages/global/Login";
import About from "../pages/global/About";
import Register from "../pages/global/Register";
import s from "../style/Main.module.css";
import Profile from "../pages/global/Profile";
import ChangeProfile from "../pages/global/ChangeProfile";
import Cart from "../pages/global/Cart";
import Checkout from "../pages/global/Checkout";
import ErrorPage from "../errors/ErrorPage";
import OrderPosted from "../pages/global/OrderPostedPage";
import { 
  Routes, 
  Route 
} from "react-router-dom";

export default () => {
  return (
    <main className={s.mainBody}>
      <Routes>
        <Route path={ EMPTY_PAGE } element={<Products />} />
        <Route path={ PRODUCTS_PAGE } element={<Products />} />
        <Route path={ CATEGORIES_PAGE } element={<Categories />} />
        <Route path={ DELIVERY_PAGE } element={<Deliveries />} />
        <Route path={ ABOUT_PAGE } element={<About />} />
        <Route path={ CONTACTS_PAGE } element={<Contacts />} />
        <Route path={ CART_PAGE } element={<Cart />} />
        <Route path={ CHECKOUT_PAGE } element={<Checkout /> } />
        <Route path={ ORDER_POSTED_PAGE } element={ <OrderPosted /> } />
        <Route path={ REGISTRATION_PAGE } element={ <Register /> } />
        <Route path={ LOGIN_PAGE } element={ <Login /> } />
        <Route path={ PROFILE_PAGE } element={ <Profile /> } />
        <Route path={ CHANGE_PROFILE_PAGE } element={ <ChangeProfile /> } />
        <Route path={ ERROR_PAGE } element={ <ErrorPage type={500} /> } />
        <Route path={ ACCESS_DENIED_PAGE } element={ <ErrorPage type={403} /> } />
        <Route path="*" exact={true} Component={Products} />
      </Routes> 
    </main>
  );
}