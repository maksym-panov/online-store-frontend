import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PRODUCTS_PAGE, ABOUT_PAGE, CATEGORIES_PAGE, CONTACTS_PAGE, DELIVERY_PAGE } from "./utils/constants.js";
import { Categories } from "./components/Categories";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path={ PRODUCTS_PAGE } element={2} />
          <Route path={ CATEGORIES_PAGE } element={<Categories />} />
          <Route path={ DELIVERY_PAGE } element={4} />
          <Route path={ ABOUT_PAGE } element={5} />
          <Route path={ CONTACTS_PAGE } element={6} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
