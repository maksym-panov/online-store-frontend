import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { api } from "../../utils/axiosHelper";
import { useEffect } from "react";
import { 
    Routes,
    Route,
    useLocation, 
    useNavigate 
} from "react-router-dom";
import { 
    ACCESS_DENIED_PAGE, 
    ERROR_PAGE, 
    LOGIN_PAGE, 
    MANAGER_PAGE,
    MANAGE_CATEGORIES,
    MANAGE_DELIVERIES,
    MANAGE_NEW_PRODUCT_PAGE,
    MANAGE_ORDERS_PAGE,
    MANAGE_PRODUCTS_PAGE
} from "../../utils/constants";
import { setUser } from "../../features/auth/userSlice";
import Orders from "../../components/orders/Orders";
import ManagerProductList from "../../components/products/ManagerProductList";
import NewProduct from "../../components/products/NewProduct";
import ManageDeliveries from "./ManageDeliveries";
import ManageCategories from "./ManageCategories";

export const Management = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const ping = async () => {
        try {
            if (!user.userId || !user.jwt) {
                user.redirect = location.pathname;
                dispatch(setUser(user));
                navigate(LOGIN_PAGE);
                return;
            }

            const isManager = await api
                .post(
                    "/ping/manager/" + user.userId,
                    user.jwt.substring(7),
                    {
                        headers: {
                            "Authorization": user.jwt
                        }
                    }
                )
                .then(resp => resp.data);

            if (!isManager) {
                navigate(ACCESS_DENIED_PAGE);
            }
        } catch(error) {
            navigate(ERROR_PAGE);
        }
    };

    useEffect(() => {
        ping();
    }, []);

    return (
        <Routes>
            <Route path={ MANAGER_PAGE.substring(8) } element={ <Orders /> } />
            <Route path={ MANAGE_ORDERS_PAGE.substring(8) } element={ <Orders /> } />
            <Route path={ MANAGE_PRODUCTS_PAGE.substring(8) } element={ <ManagerProductList /> } />
            <Route path={ MANAGE_NEW_PRODUCT_PAGE.substring(8) } element={ <NewProduct /> } />
            <Route path={ MANAGE_DELIVERIES.substring(8) } element={ <ManageDeliveries /> } />
            <Route path={ MANAGE_CATEGORIES.substring(8) } element={ <ManageCategories /> } />
            <Route path={ "*" } element={ <Orders /> } />
        </Routes>
    );
}