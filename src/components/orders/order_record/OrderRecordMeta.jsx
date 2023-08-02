import { MANAGE_ORDERS_PAGE } from "../../../utils/constants";
import s from "../../../style/Orders.module.css";
import oh from "../../../utils/ordersHelper";

export default (props) => {
    const ctx = props.mediator;
    const order = props.order;

    const post = new Date(parseInt(order.postTime))
        .toLocaleString("uk-UA");
    const complete = order.completeTime ?
        new Date(parseInt(order.completeTime)).toLocaleString("uk-UA") : " - ";

    const moveToOrderPageCommand = 
        () => ctx.navigate(MANAGE_ORDERS_PAGE + "?id=" + order.orderId);

    return (
        <div className={ s.ordMeta }> 
            <p className={ s.text }>Order number: { order.orderId }</p>
            <p className={ s.text }>Posted: { post }</p>
            <p className={ s.text }>Completed: { complete }</p>
            <p style={ { fontWeight: "bold"} } className={ s.text }>
                Status: <span style={ oh.statusColor(order.status) }>{ order.status }</span>
            </p>
            { 
                ctx.isManagement && 
                <button 
                    style={{width: "fit-content", marginTop: "15px"}} 
                    onClick={ moveToOrderPageCommand }
                >
                Change
                </button>
            }
        </div>
    );
}

