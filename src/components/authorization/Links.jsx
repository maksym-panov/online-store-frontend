import { 
  LOGIN_PAGE,
  REGISTRATION_PAGE
} from "../../utils/constants";
import { Link } from "react-router-dom";
import loginStyles from "../../style/Login.module.css";
import ah from "../../utils/authHelper";

const Links = (props) => {
  const ctx = props.mediator;
  const page = props.page;

  let command;
  let linkValue;
  let linkName;
  let buttonName;

  if (page === LOGIN_PAGE) {
    command = ah.getLoginCommand(ctx);
    linkValue = REGISTRATION_PAGE;
    linkName = "Sign Up";
    buttonName = "Sign In";
  }

  if (page === REGISTRATION_PAGE) {
    command = ah.getRegisterCommand(ctx);
    linkValue = LOGIN_PAGE;
    linkName = "Sign In";
    buttonName = "Sign Up";
  }

  return (
    <>
      <Link 
        className={loginStyles.signUpLink} 
        to={ linkValue }
      >
      { linkName }
      </Link>  
      <button 
        className={loginStyles.submitButton}
        onClick={ command }    
      >
      { buttonName }
      </button>
    </>
  );
}

export default Links;