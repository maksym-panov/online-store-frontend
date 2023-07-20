import { 
    useState,
    useEffect 
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "../../style/Orders.module.css";
import Order from "./Order";
import api from "../../utils/axiosHelper";
import {
    USERS,
    MANAGER_PAGE,
    ORDERS
} from "../../utils/constants";

export default (props) => {
    const userId = props.userId;
    const userIdParam = props.userIdParam;
    const isManagement = props.isManagement;
    const [orders, setOrders] = useState([]);

    const [ordersOwner, setOrdersOwner] = useState({});
    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    let fname, lname, phone;
        fname = ordersOwner.personalInfo?.firstname;
        lname = ordersOwner.personalInfo?.lastname;
        phone = ordersOwner.personalInfo?.phoneNumber;

    useEffect(() => {
        if (userId) {
            fetchByUser(userId, setOrders, currentUser.jwt, navigate);
        } else if (userIdParam) {
            fetchByUser(userIdParam, setOrders, currentUser.jwt, navigate);
            fetchUser(userIdParam, setOrdersOwner, currentUser.jwt, navigate);
        }
    }, []);

    let title = 
        userIdParam 
        ? 
        "Orders, posted by user #" + userIdParam + 
        ` (${fname ? fname : ""} ${lname ? lname : ""}, ${phone ? "+38" + phone : ""})` 
        :
        "Posted orders";
    
    return (
        <div className={s.ordCont}>
            <h1 className={s.title}>{ title }</h1>
            <hr />
            { !orders.length && <h5 className={s.ordProdTitle}>There is nothing here</h5> }
            {
                orders.map(o => (
                    <Order key={ o.orderId } order={ o } management={ isManagement } />
                ))
            }
            { userIdParam && 
                <button
                    onClick={ () => window.history.back() }
                    className={s.btnS} 
                >
                Back
                </button>
            }
        </div>
    );
}

const fetchUser = async (userId, setUser, token, navigate) => {
    try {
        const user = await api
            .get(
                USERS + "/" + userId,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data)

        setUser(user);
    } catch(error) {
        navigate(MANAGER_PAGE);
    }
}

const fetchByUser = async (userId, setOrders, token, navigate) => {
    try {
        const orders = await api
            .get(
                USERS + "/" + userId + ORDERS,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data);

        setOrders(orders);
    } catch(error) {
        navigate(MANAGER_PAGE);
    }
    
    
}