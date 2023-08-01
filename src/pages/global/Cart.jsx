import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import CartItem from "../../components/cart/CartItem";
import s from "../../style/Cart.module.css";
import empty from "../../img/empty_cart.png";
import { useNavigate } from "react-router-dom";
import { 
    useState,
    useEffect 
} from "react";
import { ping } from "../../utils/webHelpers";
import ch from "../../utils/cartHelper";

export default () => {
    const ctx = {};
    [ctx.err, ctx.setErr] = useState(false);
    ctx.products = useSelector(state => state.cart.products);
    ctx.navigate = useNavigate();
    ctx.dispatch = useDispatch();
    ctx.user = useSelector(state => state.user);
    const checkoutCommand = ch.getCheckoutCommand(ctx);

    useEffect(() => {
        ping(ctx.user, ctx.dispatch);
    }, []);

    return (
        <div className={s.cartContainer}>
            <div className={s.itemsContainer}>
                {
                    !ctx.products.length &&
                    (
                        <div className={s.empty}>
                            <img className={s.emptyImage} src={empty} />
                            <h1 className={s.emptyText}>Your cart is empty</h1>
                        </div>
                    )
                }
                {
                    ctx.products.map(p => 
                        <CartItem 
                            key={p.id}
                            id={p.id} 
                            mediator={ctx}
                        />
                    )
                }
            </div>
            <div className={s.checkout}>
                <div>
                    <h1>
                        { "Total $" + ch.evalTotal(ctx).toFixed(2) }
                    </h1>
                </div>
                <div>
                    <button 
                        className={ s.checkoutButton }
                        onClick={ checkoutCommand }>
                        Checkout
                    </button>
                </div>
                { ctx.err && <p className={ s.error }>Your cart is empty!</p> }
            </div>
        </div>
    );
}