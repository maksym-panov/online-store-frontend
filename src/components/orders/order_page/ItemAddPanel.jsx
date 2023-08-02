import s from "../../../style/Orders.module.css";
import { useState } from "react";
import SearchProductPrompt from "./SearchProductPrompt";
import ProductList from "./ProductList";

export default (props) => {
    const ctx = props.mediator;
   
    [ctx.prodPrompt, ctx.setProdPrompt] = useState("");
    [ctx.products, ctx.setProducts] = useState([]);

    return (
        <div className={s.itemAddCont}>
            <SearchProductPrompt mediator={ ctx } />
            <ProductList mediator={ ctx } />
        </div>
    );
}
