import { 
    useEffect, 
    useState 
} from "react";
import s from "../../style/Orders.module.css";
import { useNavigate } from "react-router-dom";
import { 
    DELIVERIES, 
    MANAGER_PAGE 
} from "../../utils/constants";
import api from "../../utils/axiosHelper";

export default (props) => {
    const order = props.order;
    const setOrder = props.setOrder;
    const [deliveries, setDeliveries] = useState([]);
    const navigate = useNavigate();

    const orderCompleted = order.status === "COMPLETED" || order.status === "ABOLISHED";
    const orderNotSent = order.status === "POSTED" || order.status === "ACCEPTED";

    const STATUSES = [
        "POSTED",
        "ACCEPTED",
        "SHIPPING",
        "DELIVERED",
        "COMPLETED",
        "ABOLISHED"
    ];

    useEffect(() => {
        fetchDeliveries(setDeliveries, navigate);
    }, []);

    return (
        <div className={s.meta}>
            <h1 style={ {fontWeight: "bold"} } className={s.title}>Order #{ order.orderId }</h1>
            {
                orderCompleted &&
                <p className={s.text}>
                    Status: 
                    <span style={ statCol(order.status) }>
                        { " " + order.status }
                    </span>
                </p>
            }
            {   
                !orderCompleted &&
                <label className={s.lab}>
                    Status:
                    {
                        order.status &&
                        <select 
                            onChange={ 
                                e => {
                                    order.status = e.target.value;
                                    setOrder(order)
                                }
                            }
                            defaultValue={ order.status } 
                            className={`${s.tColr} ${s.sel}`}
                        >
                            {
                                STATUSES.map(s => ( 
                                        <option 
                                            key={ s } 
                                            value={ s }
                                        >
                                        { s }
                                        </option>
                                ))
                            }
                        </select>
                    }
                </label>
            }

            {
                !orderNotSent &&
                <p className={s.text}>
                    Delivery: { order.deliveryType?.name ? " " + order.deliveryType?.name : " - "}
                </p>
            }
            {
                orderNotSent &&
                <label className={s.lab}>
                    Delivery: 
                    {
                        <select 
                            onChange={
                                e => {
                                    order.deliveryType = {
                                        deliveryTypeId: e.target.value
                                    };
                                    setOrder(order)
                                }
                            }
                            defaultValue={ order.deliveryType?.deliveryTypeId } 
                            className={`${s.tColr} ${s.sel}`}
                        >
                            <option
                                value={ null }>
                            </option>
                            {
                                deliveries.map(d => (
                                    <option
                                        key={ d.deliveryTypeId }
                                        value={ d.deliveryTypeId }
                                    >
                                    {d.name}
                                    </option>
                                ))
                            }
                        </select>
                    }
                    
                </label>
            }
            <p className={s.text}>Posted: { new Date(order.postTime).toLocaleString("UK-ua") }</p>
            <p className={s.text}>Completed: { order.completeTime ? new Date(order.completeTime).toLocaleString("UK-ua") : " -" }</p>
      
        </div>
    );
}

const fetchDeliveries = async (setDeliveries, navigate) => {
    try {
        const deliveries = await api
            .get(DELIVERIES)
            .then(resp => resp.data);

        setDeliveries(deliveries);
    } catch(error) {
        navigate(MANAGER_PAGE);
    }
}

const statCol = (stat) => {
    const col = { };

    switch (stat) {
        case "COMPLETED":
            col.color = "lightgreen";
            break;
        case "ABOLISHED":
            col.color = "red";
            break;
        default: 
            col.color = "black";
            break;
    }

    return col;
}