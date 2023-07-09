import styles from "../../style/Cart.module.css";
import profileStyles from "../../style/Profile.module.css";
import { api } from "../../utils/axiosHelper";
import { DELIVERIES, ORDERS, PRODUCTS_PAGE } from "../../utils/constants";
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
        const d = await api.get(DELIVERIES).then(resp => resp.data);
        setDeliv(d[0]);
        setDeliveries(d);
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

    const total = products
        .map(p => p.quantity * p.price)
        .reduce((a, c) => a + c, 0)

    return (
        <div className={styles.checkoutSummary}>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Delivery</h4>
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
            <hr className={styles.ruler} />
            <h2 className={styles.total}>Total - ${total}</h2>
            <button 
                onClick={() => doCheckout()}
                className={styles.checkoutButton}
            >
            Checkout
            </button>
            {errorState && <p className={`${profileStyles.validationError} ${styles.incorrectData}`}>Incorrect data!</p>}
        </div>
    );
}