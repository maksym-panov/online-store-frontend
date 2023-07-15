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
    MANAGE_ORDERS_PAGE
} from "../../utils/constants";
import { setUser } from "../../features/auth/userSlice";
import Orders from "../../components/orders/Orders";

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
            <Route path={ MANAGER_PAGE } exact={ true } element={ <Orders /> } />
            <Route path={ MANAGE_ORDERS_PAGE } exact={ true } element={ <Orders /> } />
            <Route path={ "*" } element={ <Orders /> } />
        </Routes>
    );
}