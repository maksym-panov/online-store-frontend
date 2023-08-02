import s from "../../../style/Orders.module.css";
import ChooseStatus from "./ChooseStatus";
import ChooseDelivery from "./ChooseDelivery";

const OrderEditPageMetaData = (props) => {
    const ctx = props.mediator;

    const post = new Date(ctx.order.postTime).toLocaleString("UK-ua");
    const completed = ctx.order.completeTime ? 
        new Date(ctx.order.completeTime).toLocaleString("UK-ua") : " - ";

    return (
        <div className={s.meta}>
            <h1 style={ {fontWeight: "bold"} } className={s.title}>Order #{ ctx.order.orderId }</h1>
            <ChooseStatus mediator={ ctx } />           
            <ChooseDelivery mediator={ ctx } />
            <p className={s.text}>Posted: { post }</p>
            <p className={s.text}>Completed: { completed }</p>
        </div>
    );
}

export default OrderEditPageMetaData;