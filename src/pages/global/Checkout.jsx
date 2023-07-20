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
    const navigate = useNavigate();
    const products = useSelector(state => state.cart.products);

    if (products.length === 0) {
        navigate(CART_PAGE);
    }

    const user = useSelector(state => state.user);
    const [customer, setCustomer] = useState({});
    const [err, setErr] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        ping(user, dispatch);
    }, []);

    return (
        <div className={s.checkoutContainer}>
            <h1 className={s.title}>Checkout</h1>
            {
                (!user.userId || !user.jwt) && 
                <CheckoutForm 
                    customer={customer}
                    setCustomer={setCustomer} 
                    err={err} 
                />
            }
            <CheckoutSummary 
                user={user}
                customer={customer}
                products={products}
                setErr={setErr}
            />
        </div>
    );
}