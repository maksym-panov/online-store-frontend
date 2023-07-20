import { useEffect } from "react";
import s from "../../style/Orders.module.css";

export default (props) => {
    const items = props.items;
    const setItems = props.setItems; 
    const d = props.disabled;
    const setErr = props.setErr;

    const products = props.products;
    const setProducts = props.setProducts;

    const item = items.find(
        i => i.product.productId === props.pId
    );

    useEffect(() => {

    }, []);

    return (
        <div className={s.i}>
            <h5 className={s.itTCont}>{ item.product.name }</h5>
            <div className={s.ordItQ}>
                { !d && <button className={`${s.tColr} ${s.btn}`} onClick={ decr(item, items, setItems, setErr, products, setProducts) }>-</button> }
                <h3>{ item.quantity }</h3> 
                { !d && <button className={`${s.tColr} ${s.btn}`} onClick={ incr(item, items, setItems, setErr) }>+</button> }
                { !d && <button className={`${s.tColr} ${s.btn}`} onClick={ rem(item, items, setItems, setErr, products, setProducts) }>X</button> }
            </div>
        </div>
    );
}

const upd = (items, setItems) => {
    setItems([...items]);
}

const incr = (item, items, setItems, setErr) => () => {
    setErr(null);
    if (item.product.stock <= 0) {
        setErr("Not enough products to add");
        return;
    }

    --item.product.stock;
    ++item.quantity;
    upd(items, setItems);
}

const decr = (item, items, setItems, setErr, products, setProducts) => () => {
    setErr(null);
    if (item.quantity <= 1) {
        rem(item, items, setItems, setErr, products, setProducts)();
        return;
    }

    ++item.product.stock;
    --item.quantity;
    upd(items, setItems);
}

const rem = (item, items, setItems, setErr, products, setProducts) => () => {
    setErr(null); 
    if (items.length === 1) {
        setErr("Order cannot be empty")
        return;
    }

    if (products) {
        const selProduct = products
            .find(
                p => p.productId === item.product.productId
            );

        selProduct.stock += item.quantity;

        setProducts([...products]);
    }
    
    items = items.filter(i => i.product.productId !== item.product.productId);

    upd(items, setItems);
}