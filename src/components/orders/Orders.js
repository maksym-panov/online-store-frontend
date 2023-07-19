import { 
    useEffect, 
    useState 
} from "react";
import {
    useNavigate, 
    useSearchParams 
} from "react-router-dom";
import { 
    API_ENTITIES_PER_PAGE_PARAM, 
    API_OFFSET_PARAM, 
    API_ORDER_BY_PARAM, 
    API_STATUS_PARAM, 
    ERROR_PAGE, MANAGER_PAGE, ORDERS,
    ORDERS_PER_PAGE, 
    USERS 
} from "../../utils/constants";
import { useSelector } from "react-redux";
import { api } from "../../utils/axiosHelper";
import s from "../../style/Orders.module.css";
import Order from "./Order";
import OrderPage from "./OrderPage";
import { Pagination } from "../../common/Pagination";

export default (props) => {
    const userId = props.userId;
    const [params, setParams] = useSearchParams();
    const navigate = useNavigate();
    const userIdParam = params.get("user");
    const order = params.get("id");
    const [searchId, setSearchId] = useState("");
    const [ordBy, setOrdBy] = useState("desc");
    const [stat, setStat] = useState(null);

    let page = params.get("page");

    const [orders, setOrders] = useState([]);
    const isManagement = userIdParam || order || !userId;

    const currentUser = useSelector(state => state.user);
    const [ordersOwner, setOrdersOwner] = useState({});

    useEffect(() => {
        window.scroll(0, 0);

        if (page == null) {
            page = 1;
        }
        if (page <= 0) {
            setParams({ page: 1});
            page = 1
        }

        if (userId) {
            fetchByUser(userId, setOrders, currentUser.jwt, navigate);
        } else if (userIdParam) {
            fetchByUser(userIdParam, setOrders, currentUser.jwt, navigate);
            fetchUser(userIdParam, setOrdersOwner, currentUser.jwt, navigate);
        } else {
            fetchAll(ordBy, stat, page, setOrders, currentUser.jwt, navigate, setParams);
        }
    }, [page, params, ordBy, stat]);

    if (userId || userIdParam) {
        let fname, lname, phone;
        fname = ordersOwner.personalInfo?.firstname;
        lname = ordersOwner.personalInfo?.lastname;
        phone = ordersOwner.personalInfo?.phoneNumber;

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

    if (order) {
        return (
            <OrderPage orderId={ order } />
        );
    }

    return (
        <div className={s.ordCont}>
            <h1 className={s.title}>Placed orders</h1>
            <hr />
            <div className={s.inp}>
                <input 
                    className={s.prompt}
                    onChange={ e => setSearchId(e.target.value) }
                    value={ searchId }
                    type="text" 
                    placeholder="Enter order ID" 
                />
                <button
                    className={s.tColr}  
                    onClick={ () => fetchById(searchId, setOrders, currentUser.jwt, navigate, setParams) }   
                >
                Search
                </button> 
            </div> 
            <div className={s.paramHold}>
                <div className={s.param}>
                    Status
                    <select className={s.sel} defaultValue={ stat } onChange={ e => setStat(e.target.value) }>
                        <option value={ null }></option> 
                        <option value={ "POSTED" }>POSTED</option>
                        <option value={ "ACCEPTED" }>ACCEPTED</option>
                        <option value={ "SHIPPING" }>SHIPPING</option>
                        <option value={ "DELIVERED" }>DELIVERED</option>
                        <option value={ "COMPLETED" }>COMPLETED</option>
                        <option value={ "ABOLISHED" }>ABOLISHED</option>
                    </select>
                </div>
                <div className={s.param}>
                    Post time
                    <select className={s.sel} defaultChecked={ ordBy } onChange={ e => setOrdBy(e.target.value) }>
                        <option value={ "desc" }>From newest to oldest</option>
                        <option value={ "asc" }>From oldest to newest</option>
                    </select>

                </div>
            </div>
            {
                orders?.slice(0, ORDERS_PER_PAGE).map(o => (
                    <Order key={ o.orderId } order={ o } management={ isManagement } />
                ))
            }
            <Pagination 
                current={ page }
                perPage={ ORDERS_PER_PAGE }
                entities={ orders } 
            />
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

const fetchById = async (id, setOrders, token, navigate, setParams) => {
    if (!id) {
        fetchAll(null, null, 1, setOrders, token, navigate, setParams);
        return;
    }
    try {
        setOrders([]);
        const result = await api
            .get(
                ORDERS + "/" + id,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data);
            
            console.log(result)
            setOrders([result]);
    } catch(ignored) {}
}

const fetchAll = async (ordBy, stat, page, setOrders, token, navigate, setParams) => {
    try {
        const offset = (page - 1) * ORDERS_PER_PAGE;
        const number = 2 * ORDERS_PER_PAGE + 1;

        const orders = await api
            .get(
                ORDERS + "?" + 
                API_OFFSET_PARAM + offset + "&" + 
                API_ENTITIES_PER_PAGE_PARAM + number + "&" +
                API_ORDER_BY_PARAM + ordBy + 
                (stat ? ("&" + API_STATUS_PARAM + stat) : ""),
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data);

        if (orders.length === 0 && page != 1) {
            setParams({ page: 1});
            page = 1;
        }

        setOrders(orders);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}