import { Link } from "react-router-dom";
import s from "../style/Login.module.css";
import { PROFILE_PAGE, REGISTRATION_PAGE, SIGN_IN_USER, USERS } from "../utils/constants";
import raccoon from "../img/raccoon.png";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosHelper";

export function Login() {
    const [err, setErr] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
            
            console.log("login - " + authResp.jwt);

            user.jwt = "Bearer " + authResp.jwt;
            dispatch(setUser(user));
            navigate(PROFILE_PAGE);
        } catch(error) {
            setErr(error.response.data);
        }
    }

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