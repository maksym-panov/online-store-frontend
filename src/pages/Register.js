import { LOGIN_PAGE, PROFILE_PAGE, SIGN_UP_USER, USERS } from "../utils/constants";
import loginStyles from "../style/Login.module.css";
import greeting from "../img/greeting.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../utils/axiosHelper";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/userSlice";

export function Register() {
    const [err, setErr] = useState({});
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            setErr(error.response.data);
            return;
        }
        

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
    }
    
    return (
        <div className={loginStyles.loginPage}>
            <div className={loginStyles.loginFormContainer}>
                <img className={loginStyles.logo} src={greeting} alt="greeting" />
                <h1 className={loginStyles.title}>Nice to meet you!</h1>
                <div className={loginStyles.inputs}>
                    <label className={loginStyles.inputLabel}>
                        First name*
                        { err.firstname && <p className={loginStyles.validationError}>{err.firstname}</p>}
                        <input 
                            onChange={e => setFirstname(e.target.value)}
                            className={loginStyles.prompt} 
                            type="text" 
                            placeholder="John" 
                        />
                    </label>
                    <label className={loginStyles.inputLabel}>
                        Last name
                        { err.lastname && <p className={loginStyles.validationError}>{err.lastname}</p>}
                        <input 
                            onChange={e => setLastname(e.target.value)}
                            className={loginStyles.prompt} 
                            type="text" 
                            placeholder="Doe" 
                        />
                    </label>
                    <label className={loginStyles.inputLabel}>
                        Phone number*
                        { err.phoneNumber && <p className={loginStyles.validationError}>{err.phoneNumber}</p>}
                        <input 
                            onChange={e => setPhoneNumber(e.target.value)}
                            className={loginStyles.prompt} 
                            type="text" 
                            placeholder="0991234567" 
                        />
                    </label>
                    <label className={loginStyles.inputLabel}>
                        Email
                        { err.email && <p className={loginStyles.validationError}>{err.email}</p>}
                        <input 
                            onChange={e => setEmail(e.target.value)}
                            className={loginStyles.prompt} 
                            type="email" 
                            placeholder="email@example.com" 
                        />
                    </label>
                    <label className={loginStyles.inputLabel}>
                        Password
                        { err.password && <p className={loginStyles.validationError}>{err.password}</p>}
                        <input 
                            onChange={e => setPassword(e.target.value)} 
                            className={loginStyles.prompt} 
                            type="password" 
                            placeholder="********" 
                        />
                    </label>
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