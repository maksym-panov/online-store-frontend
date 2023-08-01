import ph from "../../utils/profileHelper";
import s from "../../style/Profile.module.css";
import { PROFILE_PAGE } from "../../utils/constants";

const ChangeProfileButtons = (props) => {
  const ctx = props.mediator;
 
  const applyChangesCommand = ph.getApplyChangesCommand(ctx);
 
  return (
    <div className={ s.buttonContainer }>
      <button 
        onClick={ applyChangesCommand }
        className={ `${s.button} ${s.changeButton}` }>
        Apply
      </button>
      <button 
        onClick={ () => ctx.navigate(PROFILE_PAGE) }
        className={ `${s.button} ${s.logOutButton}` }>
        Back
      </button>
    </div>
  );
}

export default ChangeProfileButtons;