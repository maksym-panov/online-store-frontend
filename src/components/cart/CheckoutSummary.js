import s from "../../style/Cart.module.css";
import profiles from "../../style/Profile.module.css";
import { api } from "../../utils/axiosHelper";
import { DELIVERIES, ERROR_PAGE, ORDERS, PRODUCTS_PAGE } from "../../utils/constants";
import { useEffect, useState } from "react";
import { clearCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const CheckoutSummary = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = props.user;
    const customer = props.customer;
    const products = props.products;
    const setErr = props.setErr;

    const [deliveries, setDeliveries] = useState([]);
    const [deliv, setDeliv] = useState();
    const [errorState, setErrorState] = useState(false);

    const fetchDeliveries = async () => {
        try {
            const d = await api.get(DELIVERIES).then(resp => resp.data);
            setDeliv(d[0]);
            setDeliveries(d);
        } catch(error) {
            navigate(ERROR_PAGE);
        }
    }

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const doCheckout = async () => {
        const newOrder = {};

        const orderProducts = 
            products.map(p => (
                {
                    product: {
                        productId: p.id
                    },
                    quantity: p.quantity
                }
            ))

        newOrder.deliveryType = deliv;
        newOrder.orderProducts = orderProducts;
        

        try {
            if (!user.userId || !user.jwt) {
                newOrder.unregCust = customer;
                await api.post(
                    ORDERS,
                    newOrder
                )
            } else {
                newOrder.user = user;
                await api.post(
                    ORDERS,
                    newOrder,
                    {
                        headers: {
                            "Authorization": user.jwt
                        }
                    }
                )
            }
        } catch(error) {
            setErr(error.response?.data);
            setErrorState(true);
            return;
        }
        

        console.log(newOrder);
        dispatch(clearCart());
        navigate(PRODUCTS_PAGE);
        return;
    }

    let total = products
        .map(p => p.quantity * p.price)
        .reduce((a, c) => a + c, 0);
    
    total = Math.round(total * 100) / 100;

    return (
        <div className={s.checkoutSummary}>
            <label className={profiles.changeDataPiece}>
                <h4 className={profiles.dataHead}>Delivery</h4>
                <select>
                    {
                        deliveries.map(d => 
                            <option 
                                onClick={ () => setDeliv(d) } 
                                key={d.deliveryTypeId}
                                value={d.deliveryTypeId}
                            >
                            {d.name}
                            </option>    
                        )
                    }
                </select>
            </label>
            <hr className={s.ruler} />
            <h2 className={s.total}>Total - ${total.toFixed(2)}</h2>
            <button 
                onClick={() => doCheckout()}
                className={s.checkoutButton}
            >
            Checkout
            </button>
            {errorState && <p className={`${profiles.validationError} ${s.incorrectData}`}>Incorrect data!</p>}
        </div>
    );
}