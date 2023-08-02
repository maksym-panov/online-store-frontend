import s from "../../../style/Orders.module.css";
import oh from "../../../utils/ordersHelper";

const ProductEntry = (props) => {
  const ctx = props.mediator;
  const p = props.product;
  
  const addItemToOrderCommand = oh.getAddItemToOrderCommand(ctx);
  
  return (
    <button 
      key={ "padd-" + p.productId }
      className={s.prodClick}
      onClick={ () => addItemToOrderCommand(p) } 
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
  );
}

export default ProductEntry;