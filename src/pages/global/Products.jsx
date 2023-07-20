import s from "../../style/Products.module.css";
import SearchBar from "../../components/products/SearchBar";
import InformationPanel from "../../components/products/InformationPanel";
import ProductsList from "../../components/products/ProductsList";
import { useSearchParams } from "react-router-dom";
import ProductPage from "./ProductPage";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import { useEffect } from "react";
import { ping } from "../../utils/webHelpers";

export default () => {
    const [params, setParams] = useSearchParams();

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        ping(user, dispatch);
    }, []);

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