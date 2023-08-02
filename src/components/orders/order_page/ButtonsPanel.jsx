import oh from "../../../utils/ordersHelper";
import s from "../../../style/Orders.module.css";

const ButtonsPanel = (props) => {
  const ctx = props.mediator;
  
  const saveChangesCommand = oh.getSaveChangesCommand(ctx);
 
  return (
    <>
      { 
        ctx.err?.status === 400 && 
        <p className={s.validationError}>
          Incorrect data
        </p>
      }
      <button 
        className={`${s.tColr} ${s.bthP}`}
        onClick={ saveChangesCommand }
      >
      Save changes
      </button>
      <button
        onClick={ () => window.history.back() }
        className={`${s.tColr} ${s.btnS}`} 
      >
      Back
      </button>
    </>
  );
}

export default ButtonsPanel;