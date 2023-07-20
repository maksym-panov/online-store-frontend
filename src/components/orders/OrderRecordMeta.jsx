import { MANAGE_ORDERS_PAGE } from "../../utils/constants";
import s from "../../style/Orders.module.css";
import { useNavigate } from "react-router-dom";

export default (props) => {
    const o = props.order;
    const m = props.management;
    const navigate = useNavigate();

    return (
        <div className={s.ordMeta}> 
            <p className={s.text}>Order number: {o.orderId}</p>
            <p className={s.text}>Posted: 
                {
                    new Date(
                        parseInt(o.postTime)
                    )
                    .toLocaleString("uk-UA")
                }
            </p>
            <p className={s.text}>Completed: 
                {
                    o.completeTime 
                    ?
                    new Date(
                        parseInt(o.completeTime)
                    )
                    .toLocaleString("uk-UA")
                    :
                    " - "
                }
            </p>
            <p 
                style={ { fontWeight: "bold"} } 
                className={s.text}
            >
            Status: <span style={ statCol(o.status) }>{o.status}</span>
            </p>

            { 
                m && 
                <button 
                    style={{width: "fit-content", marginTop: "15px"}} 
                    onClick={ 
                        () => navigate(MANAGE_ORDERS_PAGE + "?id=" + o.orderId ) 
                    }
                >
                    Change
                </button>
            }
        </div>
    );
}

const statCol = (stat) => {
    const col = { };

    switch (stat) {
        case "POSTED":
            col.color = "grey";
            break;
        case "ACCEPTED":
            col.color = "gold";
            break;
        case "SHIPPING":
            col.color = "orange";
            break;
        case "DELIVERED":
            col.color = "blue";
            break;
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