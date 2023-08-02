import s from "../../../style/Orders.module.css";
import oh from "../../../utils/ordersHelper";

const SearchOrderPrompt = (props) => {
  const ctx = props.mediator;

  const fetchOrderByIdCommand = oh.getFetchOrderListedCommand(ctx);

  return (
    <div className={s.inp}>
      <input 
        className={s.prompt}
        onChange={ e => ctx.setSearchId(e.target.value) }
        value={ ctx.searchId }
        type="text" 
        placeholder="Enter order ID" 
      />
      <button
        className={s.tColr}  
        onClick={ () => fetchOrderByIdCommand(ctx.searchId) }   
      >
      Search
      </button> 
    </div> 
  );
}

export default SearchOrderPrompt;