import loginStyles from "../../style/Login.module.css";
import FormInput from "../common/FormInput";

const RegistrationForm = (props) => {
  const ctx = props.mediator;

  return (
    <div className={loginStyles.inputs}>
      <br />
      <FormInput 
        name="Firstname"
        err={ ctx.err.firstname }
        setValue={ ctx.setFirstname }
        type="text"
        plhol="John"
        req={ true }
        thin={ true }
      />
      <br />
      <FormInput 
        name="Lastname" 
        err={ ctx.err.lastname }
        setValue={ ctx.setLastname }
        type="text"
        plhol="Doe"
        thin={ true }
      />
      <br />
      <FormInput
        name="Phone number" 
        err={ ctx.err.phoneNumber }
        setValue={ ctx.setPhoneNumber }
        plhol="099XXXXXXX"
        type="text"
        req={ true }
        thin={ true }
      />
      <br />
      <FormInput
        name="Email" 
        err={ ctx.err.email }
        setValue={ ctx.setEmail }
        plhol="example@gmail.com"
        type="email"
        thin={ true }
      />
      <br />
      <FormInput
        name="Password" 
        err={ ctx.err.password }
        setValue={ ctx.setPassword }
        plhol="********"
        type="password"
        req={ true }
        thin={ true }
      />
      <br />
    </div>
  );
}

export default RegistrationForm;