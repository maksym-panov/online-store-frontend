import oh from "../../../utils/ordersHelper";
import s from "../../../style/Orders.module.css";

const SearchProductPrompt = (props) => {
  const ctx = props.mediator;
  
  const findProductsByNameCommand = oh.getFindProductsByNameCommand(ctx);
  
  return (
    <div className={s.inp}>
      <input 
        style={{borderRadius: 0}}
        className={s.prompt}
        onChange={ e => ctx.setProdPrompt(e.target.value) }
        type="text" 
        placeholder="Add a product" 
      />
      <button className={s.tColr} onClick={ findProductsByNameCommand }>
        Search
      </button>
  </div>
  );
}

export default SearchProductPrompt;