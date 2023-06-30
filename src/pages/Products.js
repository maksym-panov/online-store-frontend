import styles from "../style/Products.module.css";
import { SearchBar } from "../components/products/SearchBar";
import { InformationPanel } from "../components/products/InformationPanel";
import { ProductsList } from "../components/products/ProductsList";
import { Link } from "react-router-dom";

export function Products() {
    return (
        <div className={styles.productPageMainContainer}>
            <SearchBar />
            <InformationPanel />
            <ProductsList />
        </div>
    );
}