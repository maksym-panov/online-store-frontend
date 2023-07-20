import { useState } from "react";
import s from "../../style/Orders.module.css";
import Item from "./OrderEditPageItem";
import AddItemToOrderSection from "./AddItemToOrderSection";

export default (props) => {
    const order = props.order;
    const setOrder = props.setOrder;
    const disabled = props.disabled;
    
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
                <AddItemToOrderSection
                    products={ products }
                    setProducts={ setProducts } 
                    items={ items }
                    setItems={ setItems }
                    setErr={ setErr }
                />
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



