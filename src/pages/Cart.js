import { useSelector } from "react-redux";
import { CartItem } from "../components/cart/CartItem";
import styles from "../style/Cart.module.css";
import empty from "../img/empty_cart.png";
import { CHECKOUT_PAGE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Cart = () => {
    const [err, setErr] = useState(false);
    const products = useSelector(state => state.cart.products);
    const navigate = useNavigate();

    console.log(products.length === 0);

    const evalTotal = () => {
        if (products.length === 0) {
            return 0;
        }

        const total = products
            .map(p => p.quantity * p.price)
            .reduce((a, c) => a + c, 0)
        
        return Math.round(total * 100) / 100;
    }

    return (
        <div className={styles.cartContainer}>
            <div className={styles.itemsContainer}>
                {
                    !products.length &&
                    (
                        <div className={styles.empty}>
                            <img className={styles.emptyImage} src={empty} />
                            <h1 className={styles.emptyText}>Your cart is empty</h1>
                        </div>
                    )
                }
                {
                    products.map(p => 
                        <CartItem 
                            key={p.id}
                            id={p.id} 
                        />
                    )
                }
            </div>
            <div className={styles.checkout}>
                <div>
                    <h1>
                        { "Total $" + evalTotal() }
                    </h1>
                </div>
                <div>
                    <button 
                        className={styles.checkoutButton}
                        onClick={ () => {
                            if (!(products.length === 0)) {
                                navigate(CHECKOUT_PAGE);
                            } else {
                                setErr(true);
                            }
                        }}>
                        Checkout
                    </button>
                </div>
                { err && <p className={styles.error}>Your cart is empty!</p> }
            </div>
        </div>
    );
}