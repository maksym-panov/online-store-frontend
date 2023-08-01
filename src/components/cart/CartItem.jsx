import { 
    useEffect, 
    useState 
} from "react";
import { BASE64_RESOLVER } from "../../utils/constants";
import { useSelector } from "react-redux";
import s from "../../style/Cart.module.css";
import ch from "../../utils/cartHelper";

const CartItem = (props) => {
    const ctx = props.mediator;
    const id = props.id;
    const products = useSelector(store => store.cart.products);
    const [product, setProduct] = useState({ productId: id });

    const fetchCommand = ch.getFetchProductCommand(id, setProduct, ctx);
    const incrCommand = ch.getIncrCommand(product, ctx);
    const decrCommand = ch.getDecrCommand(product, ctx);
    const removeCommand = ch.getRemoveCommand(product, ctx);

    let quantity = products.find(p => p.id === id).quantity;
    let sum = Math.round(product.price * quantity * 100) / 100;

    useEffect(() => { fetchCommand() }, []);

    return (
        <div className={s.item}>
            <div className={s.imageContainer}>
                <img 
                    className={s.itemImage}
                    src={ BASE64_RESOLVER + product.image }
                />
            </div>
            <div className={s.itemDescription}>
                <h1 className={s.name}>{product.name}</h1>
                <div>
                    <p className={s.text}>In stock - {product.stock}</p>
                    <p className={s.text}>Price (x{quantity}) - ${sum.toFixed(2)}</p>
                </div>
            </div>
            <div className={s.counterContainer}>
                <button onClick={ decrCommand } className={s.countButton}>-</button>
                <p className={s.count}>{quantity}</p>
                <button onClick={ incrCommand } className={s.countButton}>+</button>
            </div>
            <div className={s.removeContainer}>
                <button onClick={ removeCommand } className={s.countButton}>X</button>
            </div>
        </div>
    );
}

export default CartItem;