import { useState } from "react";
import ItemAddPanel from "./ItemAddPanel";
import ItemsList from "./ItemsList";
import s from "../../../style/Orders.module.css";

export default (props) => {
    const ctx = props.mediator;
  
    [ctx.items, ctx.setItems] = useState(ctx.order.orderProducts);
    ctx.order.orderProducts = ctx.items;
    
    ctx.disabled = 
        ctx.order.status === "SHIPPING" ||
        ctx.order.status === "DELIVERED" ||
        ctx.order.status === "COMPLETED" ||
        ctx.order.status === "ABOLISHED";


    return (
        <div className={s.ordContentCont}>
            <h3 style={ {fontWeight: "bold"} } className={ s.ordProdTitle }>
                Order content
            </h3> 
            
            { 
                !ctx.disabled && 
                <ItemAddPanel mediator={ ctx } /> 
            }
            
            { 
                ctx.err?.order && 
                <p className={s.validationError}>{ ctx.err.order }</p> 
            }
            
            <ItemsList mediator={ ctx } />
            
            <hr className={s.r}></hr>
            <p className={s.ordTotal}>Total: { " $" + ctx.order.total.toFixed(2) }</p>
        </div>
    );
}