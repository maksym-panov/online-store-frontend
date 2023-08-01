import { 
    useSelector,
    useDispatch 
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { CART_PAGE } from "../../utils/constants";
import CheckoutForm from "../../components/cart/CheckoutForm";
import s from "../../style/Cart.module.css";
import CheckoutSummary from "../../components/cart/CheckoutSummary";
import { 
    useState,
    useEffect 
} from "react";
import { ping } from "../../utils/webHelpers";

export default () => {
    const ctx = {};
    ctx.navigate = useNavigate();
    ctx.products = useSelector(state => state.cart.products);
    ctx.user = useSelector(state => state.user);
    [ctx.customer, ctx.setCustomer] = useState({});
    [ctx.err, ctx.setErr] = useState({});
    [ctx.errorState, ctx.setErrorState] = useState(false);
    ctx.dispatch = useDispatch();
    [ctx.deliveries, ctx.setDeliveries] = useState([]);
    [ctx.deliv, ctx.setDeliv] = useState();

    if (ctx.products.length === 0) {
        ctx.navigate(CART_PAGE);
    }
    
    useEffect(() => {
        ping(ctx.user, ctx.dispatch);
    }, []);

    return (
        <div className={s.checkoutContainer}>
            <h1 className={s.title}>Checkout</h1>
            {
                (!ctx.user.userId || !ctx.user.jwt) && 
                <CheckoutForm mediator={ ctx } />
            }
            <CheckoutSummary mediator={ ctx } />
        </div>
    );
}