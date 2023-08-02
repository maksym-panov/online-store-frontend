import { 
    useState,
    useEffect 
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "../../style/Orders.module.css";
import Order from "./order_record/Order";
import oh from "../../utils/ordersHelper";

export default (props) => {
    const ctx = props.mediator;
    [ctx.orders, ctx.setOrders] = useState([]);
    [ctx.ordersOwner, ctx.setOrdersOwner] = useState({});
    ctx.currentUser = useSelector(state => state.user);
    ctx.navigate = useNavigate();
    ctx.fname = ctx.ordersOwner.personalInfo?.firstname;
    ctx.lname = ctx.ordersOwner.personalInfo?.lastname;
    ctx.phone = ctx.ordersOwner.personalInfo?.phoneNumber;

    const fetchOrdersCommand = oh.getFetchOrdersCommand(ctx);
    const fetchUserCommand = oh.getFetchUserCommand(ctx);

    useEffect(() => {
        fetchOrdersCommand();
        if (ctx.userIdParam) {
            fetchUserCommand();
        }
    }, []);
        
    return (
        <div className={s.ordCont}>
            <h1 className={s.title}>{ oh.title(ctx) }</h1>
            <hr />
            { !ctx.orders.length && <h5 className={s.ordProdTitle}>There is nothing here</h5> }
            {
                ctx.orders.map(o => (
                    <Order key={ o.orderId } order={ o } mediator={ ctx } />
                ))
            }
            { 
                ctx.userIdParam && 
                <button
                    onClick={ () => window.history.back() }
                    className={ s.btnS } 
                >
                Back
                </button>
            }
        </div>
    );
}

