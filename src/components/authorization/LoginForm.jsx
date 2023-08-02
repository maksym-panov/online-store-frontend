import FormInput from "../common/FormInput";
import s from "../../style/Login.module.css";

const LoginForm = (props) => {
  const ctx = props.mediator;  

  return (
    <div className={s.inputs}>
      { 
        ctx.err.message && 
        <p className={s.validationError}>
          { ctx.err.message }
        </p>
      }
      <br />
      <FormInput
        name="Phone number" 
        setValue={ ctx.setPhoneNumber } 
        type="text" thin={ true }
      />
      <br />
      <FormInput
        name="Password" 
        setValue={ ctx.setPassword }
        type="password" thin={ true }
      />
      <br />
    </div>
  );
}

export default LoginForm;