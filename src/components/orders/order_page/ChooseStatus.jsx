import s from "../../../style/Orders.module.css";
import oh from "../../../utils/ordersHelper";

const OrderStatusPanel = (props) => {
  const ctx = props.mediator;
  
  const orderCompleted = ctx.order.status === "COMPLETED" 
    || ctx.order.status === "ABOLISHED";
  
  const changeStatusCommand = (e) => {
    ctx.order.status = e.target.value;
    ctx.setOrder(ctx.order)
  };
  
  return (
    <>
      {
        orderCompleted &&
        <p className={s.text}>
          Status: 
          <span style={ oh.statusColor(ctx.order.status) }>
            { " " + ctx.order.status }
          </span>
        </p>
      }
      {   
        !orderCompleted &&
        <label className={s.lab}>
          Status:
          {
            ctx.order.status &&
            <select 
              onChange={ changeStatusCommand }
              defaultValue={ ctx.order.status } 
              className={`${s.tColr} ${s.sel}`}
            >
              {
                oh.STATUSES.map(s => ( 
                  <option key={ s } value={ s }>{ s }</option>
                ))
              }
            </select>
          }
        </label>
      }  
    </>
  );
}

export default OrderStatusPanel;