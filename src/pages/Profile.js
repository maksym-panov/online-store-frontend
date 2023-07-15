import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    BASE64_RESOLVER, 
    EMPTY_PAGE, 
    LOGIN_PAGE, 
    PROFILE_PAGE
} from "../utils/constants";
import { setUser } from "../features/auth/userSlice";
import { clearCart } from "../features/cartSlice";
import s from "../style/Profile.module.css";
import accountWhite from "../img/accountWhite.png";
import { api } from "../utils/axiosHelper";
import { 
    useEffect
} from "react";
import Orders from "../components/orders/Orders";

export function Profile() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearCart());
        dispatch(setUser({}));
        navigate(EMPTY_PAGE);
    };

    const ping = async () => {
        if (!user.userId) {
            navigate(LOGIN_PAGE)
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
                navigate(LOGIN_PAGE);
            }
        } catch(error) {
            dispatch(setUser({}));
            navigate(LOGIN_PAGE);
        }
    }

    useEffect(() => {
        ping();
    }, []);

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.column}>
                    <div className={s.profileImage}>
                        <div 
                            className={s.image}
                            style={
                                user.image ?
                                { backgroundImage: "url(" + BASE64_RESOLVER + user.image + ")" } :
                                { 
                                    backgroundImage: `url(${accountWhite})`,
                                    border: "2px black solid",
                                    backgroundColor: "black"  
                                }
                            }
                        >

                        </div>
                        <h1 className={s.userName}>
                            {
                                user.personalInfo?.firstname + 
                                (
                                    user.personalInfo?.lastname ? 
                                    " " + user.personalInfo.lastname : 
                                    ""
                                )
                            }
                        </h1>
                    </div>

                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Phone number</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.phoneNumber ?
                                user.personalInfo.phoneNumber :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Email</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.email ?
                                user.personalInfo.email :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>First name</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.firstname ?
                                user.personalInfo.firstname :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Last name</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.lastname ?
                                user.personalInfo.lastname :
                                "-"
                            }
                        </p>
                    </div>
                    <hr />
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Region</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.region ?
                                user.address.region :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>District</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.district ?
                                user.address.district :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>City</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.city ?
                                user.address.city :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Street</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.street ?
                                user.address.street :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Building</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.building ?
                                user.address.building :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Apartment</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.apartment ?
                                user.address.apartment :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Postal code</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.postalCode ?
                                user.address.postalCode :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.buttonContainer}>
                        <button
                            onClick={
                                () =>
                                    navigate(PROFILE_PAGE + "/change")
                            }
                            className={`${s.button} ${s.changeButton}`}
                        >
                            Change
                        </button>
                        <button 
                            onClick={logout} 
                            className={`${s.button} ${s.logOutButton}`}
                        >
                        Log Out
                        </button>
                    </div>
                </div>
            </div>
            <Orders userId={ user.userId } />
        </div>
    );
}