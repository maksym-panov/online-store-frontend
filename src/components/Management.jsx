import { useSelector } from "react-redux";
import api from "../utils/axiosHelper";
import { 
    useEffect,
    useState 
} from "react";
import { 
    Routes,
    Route,
    useLocation, 
    useNavigate ,
    Link
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
    MANAGE_PRODUCTS_PAGE,
    MANAGE_USERS
} from "../utils/constants";
import Orders from "../pages/global/Orders";
import ManagerProductList from "../pages/manager/ManagerProductList";
import NewProduct from "../pages/manager/NewProduct";
import ManageDeliveries from "../pages/manager/ManageDeliveries";
import ManageCategories from "../pages/manager/ManageCategories";
import ManageUsers from "../pages/manager/ManageUsers";
import s from "../style/Management.module.css";;

export default () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isManager, setIsManager] = useState(false);

    const ping = async () => {

        try {     
            if (!user.userId || !user.jwt) {
                navigate(LOGIN_PAGE + "?redirect=" + location.pathname);
                return;
            }

            const isAdministrator = await api.
                post(
                    "/ping/admin/" + user.userId,
                    user.jwt.substring(7),
                    {
                        headers: {
                            "Authorization": user.jwt
                        }
                    }
                )
                .then(resp => resp.data);
            
            setIsAdmin(isAdministrator);

            if (!isAdministrator) {
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
                
                setIsManager(isManager);
                if (!isManager) {
                    navigate(ACCESS_DENIED_PAGE);
                }
            }
            
        } catch(error) {
            navigate(ERROR_PAGE);
        }
    };

    useEffect(() => {
        ping();
    });

    if (!isManager && !isAdmin) {
        return <></>;
    }

    return (
        <div className={s.mainCont}>
            <header className={s.nav}>
                <div className={s.lnkCont}>
                    <Link to={ MANAGE_ORDERS_PAGE } className={s.lnk}>Orders</Link>
                </div>
                <div className={s.lnkCont}>
                    <Link to={ MANAGE_USERS } className={s.lnk}>Users</Link>
                </div>
                <div className={s.lnkCont}>
                    <Link to={ MANAGE_PRODUCTS_PAGE } className={s.lnk}>Products</Link>
                </div>
                <div className={s.lnkCont}>
                    <Link to={ MANAGE_CATEGORIES } className={s.lnk}>Categories</Link>
                </div>
                <div className={s.lnkCont}>
                    <Link to={ MANAGE_DELIVERIES } className={s.lnk}>Deliveries</Link>
                </div>
            </header>
            <Routes>
                <Route path={ MANAGER_PAGE.substring(8) } element={ <Orders /> } />
                <Route path={ MANAGE_ORDERS_PAGE.substring(8) } element={ <Orders /> } />
                <Route path={ MANAGE_PRODUCTS_PAGE.substring(8) } element={ <ManagerProductList /> } />
                <Route path={ MANAGE_NEW_PRODUCT_PAGE.substring(8) } element={ <NewProduct /> } />
                <Route path={ MANAGE_DELIVERIES.substring(8) } element={ <ManageDeliveries isAdmin={ isAdmin } /> } />
                <Route path={ MANAGE_CATEGORIES.substring(8) } element={ <ManageCategories isAdmin={ isAdmin } /> } />
                <Route path={ MANAGE_USERS.substring(8) } element={ <ManageUsers isAdmin={ isAdmin } /> } />
                <Route path={ "*" } element={ <Orders /> } />
            </Routes>
        </div>

    );
}