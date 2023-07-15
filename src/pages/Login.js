import { Link } from "react-router-dom";
import s from "../style/Login.module.css";
import { ERROR_PAGE, PROFILE_PAGE, REGISTRATION_PAGE, SIGN_IN_USER, USERS } from "../utils/constants";
import raccoon from "../img/raccoon.png";
import { 
    useSelector, 
    useDispatch 
} from "react-redux";
import { setUser } from "../features/auth/userSlice";
import { 
    useState, 
    useEffect 
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosHelper";

export function Login() {
    const [err, setErr] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const redirect = user.redirect;
    
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const authoriseAndRedirect = async () => {
        try {
            const authResp = await api.post(
                SIGN_IN_USER, 
                {
                    phoneNumber: phoneNumber,
                    password: password
                }
            ).then(resp => resp.data);

            const user = await api.get(
                USERS + "/" + authResp.userId,
                {
                    headers: {
                        "Authorization": "Bearer " + authResp.jwt
                    }
                }
            ).then(resp => resp.data);
            
            user.jwt = "Bearer " + authResp.jwt;
            dispatch(setUser(user));

            if (redirect) {
                navigate(redirect);
            } else {
                navigate(PROFILE_PAGE);
            }
        } catch(error) {
            if (!error.response) {
                navigate(ERROR_PAGE);
                return;
            }
            setErr(error.response.data);
        }
    }

    const ping = async () => {
        if (!user.userId) {
            return;
        }
        
        try {
            console.log("validation")
            const valid = await api.post(
                "/ping/" + user.userId,
                user.jwt.substring(7),
                {
                    headers: {
                        "Authorization": user.jwt
                    }
                }
            );

            if (!valid) {
                dispatch(setUser({}));
            }
        } catch(error) {
            dispatch(setUser({}));
        }
    }

    useEffect(() => {
        ping();
        if (user.userId && user.jwt) {
            navigate(PROFILE_PAGE);
        }
    }, []);

    return (
        <div className={s.loginPage}>
            <div className={s.loginFormContainer}>
                <img className={s.logo} src={raccoon} alt="logo" />
                <h1 className={s.title}>Welcome back!</h1>
                <div className={s.inputs}>
                    {err.message && <p className={s.validationError}>{err.message}</p>}
                    <label className={s.inputLabel}>
                        Phone number
                        <input 
                            onChange={e => setPhoneNumber(e.target.value)}
                            className={s.prompt} 
                            type="text" 
                            placeholder="0991234567" 
                        />
                    </label>
                    <label className={s.inputLabel}>
                        Password
                        <input 
                            onChange={e => setPassword(e.target.value)} 
                            className={s.prompt} 
                            type="password" 
                            placeholder="********" 
                        />
                    </label>
                </div>
                <Link 
                    className={s.signUpLink} 
                    to={REGISTRATION_PAGE}>
                    Sign Up
                </Link>  
                <button 
                    className={s.submitButton}
                    onClick={() => authoriseAndRedirect()}>Sign In</button>
            </div>
        </div>
    )
}