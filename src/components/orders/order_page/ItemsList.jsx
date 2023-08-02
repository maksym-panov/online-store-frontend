import s from "../../../style/Orders.module.css";
import Item from "./Item";

const ItemsList = (props) => {
  const ctx = props.mediator;
 
  return (
    <div className={ s.itemCont }>
      {
        ctx.items?.map(i => 
          <Item 
            key={ i.product.productId } 
            id={ i.product.productId } 
            mediator={ ctx } 
          />
        )
      }
    </div>
  );
}

export default ItemsList;