import { useState } from "react";
import s from "../../style/Orders.module.css";
import Item from "./OrderEditPageItem";
import api from "../../utils/axiosHelper";
import { 
    API_NAME_PARAM, 
    PRODUCTS 
} from "../../utils/constants";

export default (props) => {
    const order = props.order;
    const setOrder = props.setOrder;
    const disabled = props.disabled;
    const [prompt, setPrompt] = useState("");
    
    const [err, setErr] = useState(null);
    const [products, setProducts] = useState();
    const [items, setItems] = useState(order.orderProducts);

    updateOrder(items, order, setOrder);

    return (
        <div className={s.ordContentCont}>
           <h3 
                style={ {fontWeight: "bold"} } 
                className={s.ordProdTitle}
            >
            Order content
            </h3> 
            {
                !disabled &&
                <div className={s.itemAddCont}>
                    <div className={s.inp}>
                        <input 
                            style={{borderRadius: 0}}
                            className={s.prompt}
                            onChange={ e => setPrompt(e.target.value) }
                            type="text" 
                            placeholder="Add a product" 
                        />
                        <button className={s.tColr} onClick={ () => fetchProducts(prompt, setProducts) }>
                            Search
                        </button>
                    </div>
                    <div className={s.prodCont}>
                        {
                            products?.map(p => (
                                <button 
                                    className={s.prodClick}
                                    onClick={ () => addItem(p, items, setItems, setErr) } 
                                >
                                    <div className={s.prod}>
                                        <div className={s.idCont}>
                                            <p>Id: { " " + p.productId }</p>
                                        </div>
                                        <div className={s.nameCont}>
                                            <p>{ p.name }</p>
                                        </div>
                                        <div className={s.infCont}>
                                            <p className={s.text}>Stock: { p.stock }</p>
                                            <p className={s.text}>Price: { " $" + p.price }</p>
                                        </div>
                                    </div>
                            </button>
                            ))
                        }
                    </div>
                </div>
            } 
            { err && <p className={s.validationError}>{ err }</p> }
            <div className={s.itemCont}>
                {
                    items?.map(i => 
                        <Item
                            disabled={ disabled } 
                            pId={ i.product.productId } 
                            items={ items }
                            setItems={ setItems }
                            setErr={ setErr }
                            products={ products }
                            setProducts={ setProducts }
                        />
                    )
                }
                <hr className={s.r}></hr>
                <p className={s.ordTotal}>Total: { " $" + order.total }</p>
            </div>
        </div>
    );
}

const updateOrder = (items, order, setOrder) => {
    order.total = evalTotal(items).toFixed(2);
    order.orderProducts = [...items];
    setOrder(order);
}

const evalTotal = (items) => {
    return items
        .map(i => i.quantity * i.product.price)
        .reduce((a, c) => a + c, 0);
}

const fetchProducts = async (name, setProducts) => {
    setProducts([]);

    if (!name) {
        return;
    }

    try {
        const products = await api
            .get(PRODUCTS + "?" + API_NAME_PARAM + name)  
            .then(resp => resp.data);
        
        if (!isNaN(name)) {
            try {
                const prodById = await api
                    .get(PRODUCTS + "/" + name)
                    .then(resp => resp.data);
                products.unshift(prodById);
            } catch(ignored) {}
        } 
        setProducts(products);
    } catch(ignored) {}
}

const addItem = async (p, items, setItems, setErr) => {
    console.log(p.stock)
    setErr(null);
    try {
        const curItem = items.find(
            i => i.product.productId === p.productId
        );

        if (!curItem) { 

            const newItem = {
                product: p,
                quantity: 1
            };

            if (p.stock <= 0) {
                setErr("Not enough products to add");
                return;
            }

            --p.stock;
            setItems([newItem, ...items]);
            return;
        } else if (p.stock > 0) {
            ++curItem.quantity; 
            --curItem.product.stock;
            setItems([...items]);
        }
        
   } catch(ignored) {}
}