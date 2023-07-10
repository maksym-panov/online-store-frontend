import s from "../style/Products.module.css";
import { SearchBar } from "../components/products/SearchBar";
import { InformationPanel } from "../components/products/InformationPanel";
import { ProductsList } from "../components/products/ProductsList";
import { useSearchParams } from "react-router-dom";
import { ProductPage } from "../components/products/ProductPage";

export function Products() {
    const [params, setParams] = useSearchParams();

    const id = params.get("id");
    if (id) {
        return <ProductPage id={id} />
    }

    return (
        <div className={s.productPageMainContainer}>
            <SearchBar />
            <InformationPanel />
            <ProductsList />
        </div>
    );
}