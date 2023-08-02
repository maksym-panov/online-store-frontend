import s from "../../../style/Orders.module.css";
import oh from "../../../utils/ordersHelper";

const OrdersSearchParameters = (props) => {
  const ctx = props.mediator;

  return (
    <div className={s.paramHold}>
      <div className={s.param}>
        Status
        <select 
          className={s.sel} 
          defaultValue={ ctx.stat } 
          onChange={ e => ctx.setStat(e.target.value) }
        >
          <option value={ null }></option> 
          {
            oh.STATUSES.map(s => <option value={ s }>{ s }</option>)
          }
        </select>
      </div>
      <div className={s.param}>
        Post time
        <select 
          className={s.sel} 
          defaultChecked={ ctx.ordBy } 
          onChange={ e => ctx.setOrdBy(e.target.value) }
        >
          <option value={ "desc" }>From newest to oldest</option>
          <option value={ "asc" }>From oldest to newest</option>
        </select>
      </div>
    </div>
  );
}

export default OrdersSearchParameters;