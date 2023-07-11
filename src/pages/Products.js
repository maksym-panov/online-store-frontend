import s from "../style/Products.module.css";
import { SearchBar } from "../components/products/SearchBar";
import { InformationPanel } from "../components/products/InformationPanel";
import { ProductsList } from "../components/products/ProductsList";
import { useSearchParams } from "react-router-dom";
import { ProductPage } from "../components/products/ProductPage";
import { 
    useSelector,
    useDispatch 
} from "react-redux";
import { api } from "../utils/axiosHelper";
import { setUser } from "../features/auth/userSlice";
import { useEffect } from "react";

export function Products() {
    const [params, setParams] = useSearchParams();

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const ping = async () => {
        if (!user.userId) {
            return;
        }
        
        try {
            const valid = await api.post(
                "/ping/" + user.userId,
                user.jwt.substring(7),
                {
                    headers: {
                        "Authorization": user.jwt
                    }
                }
            );

            if (!valid) {
                dispatch(setUser({}));
            }
        } catch(error) {
            dispatch(setUser({}));
        }
    }

    useEffect(() => {
        ping();
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