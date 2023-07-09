import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../style/Profile.module.css";
import { getBase64 } from "../utils/webHelpers";
import accountWhite from "../img/accountWhite.png";
import { useNavigate } from "react-router-dom";
import { PROFILE_PAGE, USERS } from "../utils/constants";
import { api } from "../utils/axiosHelper";
import { setUser } from "../features/auth/userSlice";

export function ChangeProfile() {
    const [err, setErr] = useState({});
    const [errorState, setErrorState] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cusr = useSelector(state => state.user);
    const cpi = cusr.personalInfo;
    const ca = cusr.address;

    const [image, setImage] = useState(cusr.image);

    const [phoneNumber, setPhoneNumber] = useState(cpi.phoneNumber);
    const [email, setEmail] = useState(cpi.email ? cpi.email : "");
    const [firstname, setFirstname] = useState(cpi.firstname);
    const [lastname, setLastname] = useState(cpi.lastname ? cpi.lastname : "");

    const [region, setRegion] = useState(ca.region ? ca.region : "");
    const [district, setDistrict] = useState(ca.district ? ca.district : "");
    const [city, setCity] = useState(ca.city ? ca.city : "");
    const [street, setStreet] = useState(ca.street ? ca.street : "");
    const [building, setBuilding] = useState(ca.building ? ca.building : "");
    const [apartment, setApartment] = useState(ca.apartment ? ca.apartment : "");
    const [postalCode, setPostalCode] = useState(ca.postalCode ? ca.postalCode : "");

    const applyChanges = async () => {
        let toSend = {
            image: image,
            personalInfo: {
                phoneNumber: phoneNumber,
                email: email,
                firstname: firstname,
                lastname: lastname
            },
            address: {
                region: region,
                district: district,
                city: city,
                street: street,
                building: building,
                apartment: apartment,
                postalCode: postalCode
            }
        };

        let authEntity;

        try {
            authEntity = await api.patch(
                USERS + "/" + cusr.userId,
                toSend,
                {
                    headers: {
                        "Authorization": cusr.jwt
                    }
                }
            )
            .then(resp => resp.data)
        } catch (error) {
            setErrorState(true);
            setErr(error.response.data)
            console.log(err);
            return;
        }

        let jwt;
        if (authEntity.jwt === "") {
            jwt = cusr.jwt;
        } else {
            jwt = "Bearer " + authEntity.jwt;
        }

        const newUser = await api.get(
            USERS + "/" + authEntity.userId,
            {
                headers: {
                    "Authorization": jwt
                }
            }
        ).then(resp => resp.data)


        if (authEntity.jwt !== "") {
            newUser.jwt = jwt;
        } else {
            newUser.jwt = cusr.jwt;
        }

        dispatch(setUser(newUser));
        navigate(PROFILE_PAGE);
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileImage}>
                <div 
                    className={styles.image}
                    style={
                        image ? 
                        { backgroundImage: `url("data:image/png;base64,${image}")` } :
                        { 
                            backgroundImage: `url(${accountWhite})`, 
                            backgroundColor: "#d4d4d4" 
                        }
                    }
                >
                </div>
                <label className={styles.changeDataPiece}>
                    <input 
                        className={styles.inputImage}
                        type="file"  
                        onChange={ 
                            e => getBase64(
                                e.target.files[0], 
                                setImage
                            ) 
                        }
                    />
            </label>
            </div>
            <div className={`${styles.profile} ${styles.changeProfile}`}>
                <div className={`${styles.column} ${styles.changePageColumn}`}>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Phone number</h4>
                        {err.phoneNumber && <p className={styles.validationError}>{err.phoneNumber}</p>}
                        <input 
                            onChange={e => setPhoneNumber(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="text"
                            value={phoneNumber} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Email</h4>
                        {err.email && <p className={styles.validationError}>{err.email}</p>}
                        <input 
                            onChange={e => setEmail(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="email"
                            value={email} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>First name</h4>
                        {err.firstname && <p className={styles.validationError}>{err.firstname}</p>}
                        <input 
                            onChange={e => setFirstname(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="text"
                            value={firstname} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Last name</h4>
                        {err.lastname && <p className={styles.validationError}>{err.lastname}</p>}
                        <input 
                            onChange={e => setLastname(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="text"
                            value={lastname} />
                    </label>

                    <hr className={styles.ruler} />

                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Region</h4>
                        {err.region && <p className={styles.validationError}>{err.region}</p>}
                        <input 
                            onChange={e => setRegion(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="text"
                            value={region} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>District</h4>
                        {err.district && <p className={styles.validationError}>{err.district}</p>}
                        <input 
                            onChange={e => setDistrict(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="text"
                            value={district} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>City</h4>
                        {err.city && <p className={styles.validationError}>{err.city}</p>}
                        <input 
                            onChange={e => setCity(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="text"
                            value={city} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Street</h4>
                        {err.street && <p className={styles.validationError}>{err.street}</p>}
                        <input
                            onChange={e => setStreet(e.target.value)} 
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="text"
                            value={street} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Building</h4>
                        {err.building && <p className={styles.validationError}>{err.building}</p>}
                        <input 
                            onChange={e => setBuilding(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="number"
                            value={building} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Apartment</h4>
                        {err.apartment && <p className={styles.validationError}>{err.apartment}</p>}
                        <input
                            onChange={e => setApartment(e.target.value)} 
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="number"
                            value={apartment} />
                    </label>
                    <label className={styles.changeDataPiece}>
                        <h4 className={styles.dataHead}>Postal code</h4>
                        {err.postalCode && <p className={styles.validationError}>{err.postalCode}</p>}
                        <input 
                            onChange={e => setPostalCode(e.target.value)}
                            className={`${styles.dataBody} ${styles.prompt}`} 
                            type="number"
                            value={postalCode} />
                    </label>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button 
                    onClick={applyChanges}
                    className={`${styles.button} ${styles.changeButton}`}>
                    Apply
                </button>
                <button 
                    onClick={() => navigate(PROFILE_PAGE)}
                    className={`${styles.button} ${styles.logOutButton}`}>
                    Back
                </button>
            </div>
            {errorState && <p className={styles.validationError}>Incorrect data</p>}
        </div>
    );
}

