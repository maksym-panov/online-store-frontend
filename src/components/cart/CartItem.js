import { useEffect, useState } from "react";
import { api } from "../../utils/axiosHelper";
import { BASE64_RESOLVER, PRODUCTS } from "../../utils/constants";
import { decrementQuantity, incrementQuantity, removeProduct, setPrice } from "../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import s from "../../style/Cart.module.css";

export const CartItem = (props) => {
    const id = props.id;
    const products = useSelector(store => store.cart.products);
    
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    const fetchProduct = async () => {
        let result;
        try {
            result = await api.get(PRODUCTS + "/" + id)
                            .then(resp => resp.data);
            setProduct(result);
            dispatch(
                setPrice(
                    { 
                        id: id, 
                        price: result.price 
                    }
                )
            );
        } catch(error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    const incr = () => {
        dispatch(
            incrementQuantity(
                {
                    id: id, 
                    stock: product.stock
                }
            )
        )
    };

    const decr = () => {
        dispatch(
            decrementQuantity(id)
        )
    };

    const remove = () => {
        dispatch(
            removeProduct(id)
        )
    };

    let quantity = products.find(p => p.id === id).quantity;
    let sum = Math.round(product.price * quantity * 100) / 100;

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
                <button onClick={ decr } className={s.countButton}>-</button>
                <p className={s.count}>{quantity}</p>
                <button onClick={ incr } className={s.countButton}>+</button>
            </div>
            <div className={s.removeContainer}>
                <button onClick={ remove } className={s.countButton}>X</button>
            </div>
        </div>
    );
}