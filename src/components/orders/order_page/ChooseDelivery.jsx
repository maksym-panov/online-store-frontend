import s from "../../../style/Orders.module.css";
import { 
  useState,
  useEffect 
} from "react";
import oh from "../../../utils/ordersHelper";

const OrderDeliveryPanel = (props) => {
  const ctx = props.mediator;

  [ctx.deliveries, ctx.setDeliveries] = useState([]);

  const orderNotSent = ctx.order.status === "POSTED" 
    || ctx.order.status === "ACCEPTED";
  
  const changeDeliveryCommand = (e) => {
    ctx.order.deliveryType = {
      deliveryTypeId: e.target.value
    };
    ctx.setOrder(ctx.order)
  }

  const fetchDeliveriesCommand = oh.getFetchDeliveriesCommand(ctx);
  useEffect(() => { fetchDeliveriesCommand() }, []);

  return (
    <>
      {
        !orderNotSent &&
        <p className={s.text}>
          Delivery: 
          { ctx.order.deliveryType?.name ? " " + ctx.order.deliveryType?.name : " - "}
        </p>
      }
      {
        orderNotSent &&
        <label className={s.lab}>
          Delivery: 
          {
            <select 
              onChange={ changeDeliveryCommand }
              defaultValue={ ctx.order.deliveryType?.deliveryTypeId } 
              className={`${s.tColr} ${s.sel}`}
            >
              <option value={ null }></option>
              {
                ctx.deliveries.map(d => (
                  <option key={ d.deliveryTypeId } value={ d.deliveryTypeId }>
                    { d.name }
                  </option>
                ))
              }
            </select>
          }
        </label>
      }
    </>
  );
}

export default OrderDeliveryPanel;