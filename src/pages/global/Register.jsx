import { 
    PROFILE_PAGE,
    REGISTRATION_PAGE, 
} from "../../utils/constants";
import loginStyles from "../../style/Login.module.css";
import greeting from "../../img/greeting.png";
import { useNavigate } from "react-router-dom";
import { 
    useState,
    useEffect 
} from "react";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { ping } from "../../utils/webHelpers";
import RegistrationForm from "../../components/authorization/RegistrationForm";
import Links from "../../components/authorization/Links";

const Register = () => {
    const ctx = {};
    [ctx.err, ctx.setErr] = useState({});
    [ctx.firstname, ctx.setFirstname] = useState(null);
    [ctx.lastname, ctx.setLastname] = useState(null);
    [ctx.phoneNumber, ctx.setPhoneNumber] = useState(null);
    [ctx.email, ctx.setEmail] = useState(null);
    [ctx.password, ctx.setPassword] = useState(null);
    ctx.dispatch = useDispatch();
    ctx.navigate = useNavigate();
    ctx.user = useSelector(state => state.user);

    useEffect(() => {
        ping(ctx.user, ctx.dispatch);
        
        if (ctx.user.userId && ctx.user.jwt) {
            ctx.navigate(PROFILE_PAGE);
        }
    }, []);
    
    return (
        <div className={loginStyles.loginPage}>
            <div className={loginStyles.loginFormContainer}>
                <img className={loginStyles.logo} src={greeting} alt="greeting" />
                <h1 className={loginStyles.title}>Nice to meet you!</h1>
                
                <RegistrationForm mediator={ ctx } />
                <Links mediator={ ctx } page={ REGISTRATION_PAGE } />
               
                <p className={loginStyles.note}>Required fields are marked with *</p>
            </div>
        </div>
    );
}

export default Register;