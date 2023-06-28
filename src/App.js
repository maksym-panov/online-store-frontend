import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PRODUCTS_PAGE, ABOUT_PAGE, CATEGORIES_PAGE, CONTACTS_PAGE, DELIVERY_PAGE, LOGIN_PAGE } from "./utils/constants.js";
import { Categories } from "./pages/Categories";
import { Deliveries } from "./pages/Deliveries";
import { Products } from "./pages/Products";
import { Contacts } from "./pages/Contacts";
import { Login } from "./pages/Login";
import styles from "./style/App.module.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <div className={styles.mainBody}>
          <Routes>
            <Route path={ PRODUCTS_PAGE } element={<Products />} />
            <Route path={ CATEGORIES_PAGE } element={<Categories />} />
            <Route path={ DELIVERY_PAGE } element={<Deliveries />} />
            <Route path={ ABOUT_PAGE } element={5} />
            <Route path={ CONTACTS_PAGE } element={<Contacts />} />
            <Route path={ LOGIN_PAGE } element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
