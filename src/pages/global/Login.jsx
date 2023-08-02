import { useSearchParams } from "react-router-dom";
import s from "../../style/Login.module.css";
import { 
    LOGIN_PAGE,
    PROFILE_PAGE, 
} from "../../utils/constants";
import raccoon from "../../img/raccoon.png";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import { 
    useState, 
    useEffect 
} from "react";
import { useNavigate } from "react-router-dom";
import { ping } from "../../utils/webHelpers";
import LoginForm from "../../components/authorization/LoginForm";
import Links from "../../components/authorization/Links";

export default () => {
    const ctx = {}; 
    [ctx.err, ctx.setErr] = useState({});
    ctx.dispatch = useDispatch();
    ctx.navigate = useNavigate();
    ctx.user = useSelector(state => state.user);
    [ctx.params, ctx.setParams] = useSearchParams();
    ctx.redirect = ctx.params.get("redirect");

    [ctx.phoneNumber, ctx.setPhoneNumber] = useState("");
    [ctx.password, ctx.setPassword] = useState("");

    useEffect(() => {
        ping(ctx.user, ctx.dispatch);
        
        if (ctx.user.userId && ctx.user.jwt) {
            ctx.navigate(PROFILE_PAGE);
        }
    }, []);

    return (
        <div className={s.loginPage}>
            <div className={s.loginFormContainer}>
                <img className={s.logo} src={raccoon} alt="logo" />
                <h1 className={s.title}>Welcome back!</h1>
                
                <LoginForm mediator={ ctx } />
                <Links mediator={ ctx } page={ LOGIN_PAGE } /> 
            </div>
        </div>
    )
}