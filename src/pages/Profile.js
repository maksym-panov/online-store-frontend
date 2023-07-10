import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE64_RESOLVER, EMPTY_PAGE, PROFILE_PAGE } from "../utils/constants";
import { setUser } from "../features/auth/userSlice";
import { clearCart } from "../features/cartSlice";
import s from "../style/Profile.module.css";
import accountWhite from "../img/accountWhite.png";

export function Profile() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearCart());
        dispatch(setUser({}));
        navigate(EMPTY_PAGE);
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profileImage}>
                <div 
                    className={s.image}
                    style={
                        user.image ?
                        { backgroundImage: "url(" + BASE64_RESOLVER + user.image + ")" } :
                        { 
                            backgroundImage: `url(${accountWhite})`, 
                            backgroundColor: "#d4d4d4" 
                        }
                    }
                >

                </div>
                <h1 className={s.userName}>
                    {
                        user.personalInfo.firstname + 
                        (
                            user.personalInfo.lastname ? 
                            " " + user.personalInfo.lastname : 
                            ""
                        )
                    }
                </h1>
            </div>
            <div className={s.profile}>
                <div className={s.column}>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Phone number</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo.phoneNumber ?
                                user.personalInfo.phoneNumber :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Email</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo.email ?
                                user.personalInfo.email :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>First name</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo.firstname ?
                                user.personalInfo.firstname :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Last name</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo.lastname ?
                                user.personalInfo.lastname :
                                "-"
                            }
                        </p>
                    </div>
                </div>
                <div className={s.column}>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Region</h5>
                        <p className={s.dataBody}>
                            {
                                user.address.region ?
                                user.address.region :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>District</h5>
                        <p className={s.dataBody}>
                            {
                                user.address.district ?
                                user.address.district :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>City</h5>
                        <p className={s.dataBody}>
                            {
                                user.address.city ?
                                user.address.city :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Street</h5>
                        <p className={s.dataBody}>
                            {
                                user.address.street ?
                                user.address.street :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Building</h5>
                        <p className={s.dataBody}>
                            {
                                user.address.building ?
                                user.address.building :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Apartment</h5>
                        <p className={s.dataBody}>
                            {
                                user.address.apartment ?
                                user.address.apartment :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Postal code</h5>
                        <p className={s.dataBody}>
                            {
                                user.address.postalCode ?
                                user.address.postalCode :
                                "-"
                            }
                        </p>
                    </div>
                </div>
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
    );
}