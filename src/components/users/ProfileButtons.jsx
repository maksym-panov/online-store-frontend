import s from "../../style/Profile.module.css";
import ph from "../../utils/profileHelper";

const ProfileButtons = (props) => {
  const ctx = props.mediator;
  
  const changeCommand = ph.getChangeCommand(ctx);
  const logoutCommand = ph.getLogoutCommand(ctx);
  
  return (
    <div className={s.buttonContainer}>
      <button
          onClick={ changeCommand }
          className={`${s.button} ${s.changeButton}`}
      >
          Change
      </button>
      <button 
          onClick={ logoutCommand } 
          className={`${s.button} ${s.logOutButton}`}
      >
      Log Out
      </button>
    </div> 
  );
}

export default ProfileButtons;