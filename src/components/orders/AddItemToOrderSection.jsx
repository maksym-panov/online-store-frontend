import s from "../../style/Orders.module.css";
import { useState  } from "react";
import api from "../../utils/axiosHelper";
import {
    PRODUCTS,
    API_NAME_PARAM
} from "../../utils/constants";

export default (props) => {
    const products = props.products;
    const setProducts = props.setProducts;
    const items = props.items;
    const setItems = props.setItems;
    const setErr = props.setErr;
   
    const [prompt, setPrompt] = useState("");

    return (
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
                            onClick={ () => addItem(p, items, setItems, setErr, products, setProducts) } 
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
    );
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

const addItem = async (p, items, setItems, setErr, products, setProducts) => {
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
            setProducts([...products]);
            setItems([newItem, ...items]);
            return;
        } else if (p.stock > 0) {
            ++curItem.quantity; 
            --curItem.product.stock;
            setItems([...items]);
        }
        
   } catch(ignored) {}
}