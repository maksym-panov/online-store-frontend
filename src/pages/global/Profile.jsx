import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    BASE64_RESOLVER, 
    EMPTY_PAGE, 
    PROFILE_PAGE
} from "../../utils/constants";
import { setUser } from "../../features/auth/userSlice";
import { clearCart } from "../../features/cartSlice";
import s from "../../style/Profile.module.css";
import accountWhite from "../../img/accountWhite.png";
import Orders from "./Orders";
import ProfileDataPiece from "../../components/users/ProfileDataPiece";
import { ping } from "../../utils/webHelpers";
import { useEffect } from "react";

export default () => {
    const user = useSelector(state => state.user);
    const pi = user.personalInfo;
    const a = user.address;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearCart());
        dispatch(setUser({}));
        navigate(EMPTY_PAGE);
    };

    useEffect(() => {
        ping(user, dispatch);
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
                                pi?.firstname + 
                                (
                                    pi?.lastname ? 
                                    " " + pi.lastname : 
                                    ""
                                )
                            }
                        </h1>
                    </div>

                    <ProfileDataPiece 
                        name={ "Phone number" } 
                        value={ pi?.phoneNumber }
                    />
                    <ProfileDataPiece 
                        name={ "Email" } 
                        value={ pi?.email }
                    />
                    <ProfileDataPiece 
                        name={ "Firstname" } 
                        value={ pi?.firstname }
                    />
                    <ProfileDataPiece 
                        name={ "Lastname" } 
                        value={ pi?.lastname }
                    />
                    <ProfileDataPiece 
                        name={ "Region" } 
                        value={ a?.region }
                    />
                    <ProfileDataPiece 
                        name={ "District" } 
                        value={ a?.district }
                    />
                    <ProfileDataPiece 
                        name={ "City" } 
                        value={ a?.city }
                    />
                    <ProfileDataPiece 
                        name={ "Street" } 
                        value={ a?.street }
                    />
                    <ProfileDataPiece 
                        name={ "Building" } 
                        value={ a?.building }
                    />
                    <ProfileDataPiece 
                        name={ "Apartment" } 
                        value={ a?.apartment }
                    />
                    <ProfileDataPiece 
                        name={ "Postal code" } 
                        value={ a?.postalCode }
                    />
                    
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