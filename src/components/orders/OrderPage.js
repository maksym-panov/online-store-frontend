import { 
    useEffect,
    useState
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/axiosHelper";
import { 
    ERROR_PAGE,
    MANAGER_PAGE, 
    ORDERS, 
    UNREGISTERED
} from "../../utils/constants";
import s from "../../style/Orders.module.css";
import OrderMetaData from "./OrderMetaData";
import UserData from "./UserData";
import CustomerData from "./CustomerData";
import OrderItems from "./OrderItems";

export default (props) => {
    const id = props.orderId;
    const [order, setOrder] = useState({});
    const [err, setErr] = useState(null);
    const currentUser = useSelector(state => state.user);
    const navigate = useNavigate();
    const disabled = 
        order.status === "SHIPPING" ||
        order.status === "DELIVERED" ||
        order.status === "COMPLETED" ||
        order.status === "ABOLISHED";

    useEffect(() => {
        fetchOrder(id, setOrder, currentUser.jwt, navigate);
    }, []);

    return (
        <div className={s.edOrdCont}>
            <div className={s.edOrdCol}>
                <OrderMetaData 
                    order={ order } 
                    setOrder={ setOrder } 
                />
                {
                    order.user &&
                    <UserData user={ order.user } />
                }
                {
                    order.unregCust &&
                    <CustomerData 
                        err={ err }
                        order={ order } 
                        setOrder={ setOrder } 
                    />
                }
                {
                    order.orderProducts &&
                    <OrderItems 
                        order={ order } 
                        setOrder={ setOrder } 
                        disabled={ disabled }
                    />
                }
                { err?.status === 400 && <p className={s.validationError}>Number values are too big</p>}
                <button 
                    style=
                    {
                        {
                            height: "2.5em", 
                            width: "150px", 
                            backgroundColor: "#2473FF", 
                            color: "white", 
                            borderRadius: "15px" 
                        }
                    }
                    className={s.tColr}
                    onClick={ () => saveChanges(order, currentUser.jwt, navigate, setErr) }
                >
                Save changes
                </button>
                <button
                    onClick={ () => window.history.back() }
                    style=
                    {
                        {
                            height: "2.5em", 
                            width: "150px",
                            marginTop: "10px",
                            borderRadius: "15px" 
                        } 
                    }
                    className={s.tColr} 
                >
                Back
                </button>
            </div>
        </div>
    );
}


const fetchOrder = async (id, setOrder, token, navigate) => {
    try {
        const order = await api
        .get(
            ORDERS + "/" + id,
            {
                headers: {
                    "Authorization": token
                }
            }
        )
        .then(resp => resp.data);
    
        setOrder(order);
    } catch(error) {
        navigate(MANAGER_PAGE);
    }
}

const updateOrder = async (order, token, navigate, setErr) => {
    if (order.unregCust) {
        try {
            await api
                .patch(
                    UNREGISTERED + "/" + order.unregCust.unregisteredCustomerId,
                    order.unregCust,
                    {
                        headers: {
                            "Authorization": token
                        }
                    }
                )
        } catch(error) {
            if (error.response.data) {
                setErr(error.response.data);
                return;
            }
            
            navigate(ERROR_PAGE);
            return;
        }
    }
    
    try {
        await api
            .patch(
                ORDERS + "/" + order.orderId,
                order,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
    } catch(error) {
        navigate(ERROR_PAGE);
    }

    window.location.reload(false);
}

const saveChanges = (order, token, navigate, setErr) => {
    order.orderProducts = 
        order.orderProducts.filter(op => op.quantity > 0);
    if (order.orderProducts.length === 0) {
        navigate(ERROR_PAGE);
    }
    updateOrder(order, token, navigate, setErr);
}