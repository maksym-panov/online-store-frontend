import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EMPTY_PAGE, PROFILE_PAGE } from "../utils/constants";
import { setUser } from "../features/auth/userSlice";
import styles from "../style/Profile.module.css";
import accountWhite from "../img/accountWhite.png";

export function Profile() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setUser({}));
        navigate(EMPTY_PAGE);
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
                <div 
                    className={styles.image}
                    style={
                        user.image ?
                        { backgroundImage: `url("data:image/png;base64,${user.image}")` } :
                        { 
                            backgroundImage: `url(${accountWhite})`, 
                            backgroundColor: "#d4d4d4" 
                        }
                    }
                >

                </div>
                <h1 className={styles.userName}>
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
            <div className={styles.profile}>
                <div className={styles.column}>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Phone number</h5>
                        <p className={styles.dataBody}>
                            {
                                user.personalInfo.phoneNumber ?
                                user.personalInfo.phoneNumber :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Email</h5>
                        <p className={styles.dataBody}>
                            {
                                user.personalInfo.email ?
                                user.personalInfo.email :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>First name</h5>
                        <p className={styles.dataBody}>
                            {
                                user.personalInfo.firstname ?
                                user.personalInfo.firstname :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Last name</h5>
                        <p className={styles.dataBody}>
                            {
                                user.personalInfo.lastname ?
                                user.personalInfo.lastname :
                                "-"
                            }
                        </p>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Region</h5>
                        <p className={styles.dataBody}>
                            {
                                user.address.region ?
                                user.address.region :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>District</h5>
                        <p className={styles.dataBody}>
                            {
                                user.address.district ?
                                user.address.district :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>City</h5>
                        <p className={styles.dataBody}>
                            {
                                user.address.city ?
                                user.address.city :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Street</h5>
                        <p className={styles.dataBody}>
                            {
                                user.address.street ?
                                user.address.street :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Building</h5>
                        <p className={styles.dataBody}>
                            {
                                user.address.building ?
                                user.address.building :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Apartment</h5>
                        <p className={styles.dataBody}>
                            {
                                user.address.apartment ?
                                user.address.apartment :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={styles.dataPiece}>
                        <h5 className={styles.dataHead}>Postal code</h5>
                        <p className={styles.dataBody}>
                            {
                                user.address.postalCode ?
                                user.address.postalCode :
                                "-"
                            }
                        </p>
                    </div>
                </div>
            </div>
       
            <div className={styles.buttonContainer}>
                <button
                    onClick={
                        () =>
                            navigate(PROFILE_PAGE + "/change")
                    }
                    className={`${styles.button} ${styles.changeButton}`}
                >
                    Change
                </button>
                <button 
                    onClick={logout} 
                    className={`${styles.button} ${styles.logOutButton}`}
                >
                Log Out
                </button>
            </div>
        </div>
    );
}