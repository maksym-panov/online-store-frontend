import { 
    ERROR_PAGE, 
    LOGIN_PAGE, 
    PROFILE_PAGE, 
    SIGN_UP_USER, 
    USERS 
} from "../../utils/constants";
import loginStyles from "../../style/Login.module.css";
import greeting from "../../img/greeting.png";
import { 
    Link, 
    useNavigate 
} from "react-router-dom";
import { 
    useState,
    useEffect 
} from "react";
import api from "../../utils/axiosHelper";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { setUser } from "../../features/auth/userSlice";
import RegistrationFormInput from "../../components/users/RegistrationFormInput";

export default () => {
    const [err, setErr] = useState({});
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    if (user.userId && user.jwt) {
        navigate(PROFILE_PAGE);
    }

    const registerAndRedirect = async () => {
        let authResp;

        try {
            authResp = await api.post(
                SIGN_UP_USER,
                {
                    firstname: firstname,
                    lastname: lastname,
                    phoneNumber: phoneNumber,
                    email: email,
                    password: password
                } 
            ).then(resp => resp.data);
        } catch(error) {
            if (!error.response) {
                navigate(ERROR_PAGE);
                return;
            }

            setErr(error.response.data);
            return;
        }
        
        try {
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

            navigate(PROFILE_PAGE);
        } catch(error) {
            navigate(ERROR_PAGE);
            return;
        }
    }

    const ping = async () => {
        if (!user.userId) {
            return;
        }
        
        try {
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
        <div className={loginStyles.loginPage}>
            <div className={loginStyles.loginFormContainer}>
                <img className={loginStyles.logo} src={greeting} alt="greeting" />
                <h1 className={loginStyles.title}>Nice to meet you!</h1>
                <div className={loginStyles.inputs}>
                    <RegistrationFormInput
                        name={ "Firstname" } 
                        err={ err.firstname }
                        setValue={ setFirstname }
                        plhol={ "John"}
                        type={ "text" }
                        req={ true }
                    />
                    <RegistrationFormInput
                        name={ "Lastname" } 
                        err={ err.lastname }
                        setValue={ setLastname }
                        plhol={ "Doe"}
                        type={ "text" }
                    />
                    <RegistrationFormInput
                        name={ "Phone number" } 
                        err={ err.phoneNumber }
                        setValue={ setPhoneNumber }
                        plhol={ "0991234567" }
                        type={ "text" }
                        req={ true }
                    />
                    <RegistrationFormInput
                        name={ "Email" } 
                        err={ err.email }
                        setValue={ setEmail }
                        plhol={ "example@gmail.com" }
                        type={ "email" }
                    />
                    <RegistrationFormInput
                        name={ "Password" } 
                        err={ err.password }
                        setValue={ setPassword }
                        plhol={ "********"}
                        type={ "password" }
                        req={ true }
                    />
                </div>
                <Link 
                    className={loginStyles.signUpLink} 
                    to={ LOGIN_PAGE }>
                    Sign In
                </Link>  
                <button 
                    className={loginStyles.submitButton}
                    onClick={() => registerAndRedirect()}    
                >
                    Sign Up
                </button>

                <p className={loginStyles.note}>Required fields are marked with *</p>
            </div>
        </div>
    );
}