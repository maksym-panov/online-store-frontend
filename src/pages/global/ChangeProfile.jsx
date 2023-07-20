import { 
    useState,
    useEffect 
} from "react";
import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import s from "../../style/Profile.module.css";
import { getBase64 } from "../../utils/webHelpers";
import accountWhite from "../../img/accountWhite.png";
import { useNavigate } from "react-router-dom";
import { 
    PROFILE_PAGE, 
    USERS, 
    LOGIN_PAGE ,
    BASE64_RESOLVER
} from "../../utils/constants";
import api from "../../utils/axiosHelper";
import { setUser } from "../../features/auth/userSlice";
import DataInput from "../../components/common/DataInput";


export default () => {
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

    const ping = async () => {
        if (!cusr.userId) {
            navigate(LOGIN_PAGE);
            return;
        }
        
        try {
            const valid = await api.post(
                "/ping/" + cusr.userId,
                cusr.jwt.substring(7),
                {
                    headers: {
                        "Authorization": cusr.jwt
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
            <div className={`${s.profile} ${s.changeProfile}`}>
                <div className={`${s.column} ${s.changePageColumn}`}>
                    <div className={s.profileImage}>
                        <div 
                            className={s.image}
                            style={
                                image ? 
                                { backgroundImage: "url(" + BASE64_RESOLVER + image + ")" } :
                                { 
                                    backgroundImage: `url(${accountWhite})`, 
                                    border: "2px black solid",
                                    backgroundColor: "black"   
                                }
                            }
                        >
                        </div>
                        <label className={s.changeDataPiece}>
                            <input 
                                className={s.inputImage}
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
                    
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Phone number</h4>
                        {err.phoneNumber && <p className={s.validationError}>{err.phoneNumber}</p>}
                        <input 
                            onChange={e => setPhoneNumber(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="text"
                            value={phoneNumber} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Email</h4>
                        {err.email && <p className={s.validationError}>{err.email}</p>}
                        <input 
                            onChange={e => setEmail(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="email"
                            value={email} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>First name</h4>
                        {err.firstname && <p className={s.validationError}>{err.firstname}</p>}
                        <input 
                            onChange={e => setFirstname(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="text"
                            value={firstname} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Last name</h4>
                        {err.lastname && <p className={s.validationError}>{err.lastname}</p>}
                        <input 
                            onChange={e => setLastname(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="text"
                            value={lastname} />
                    </label>

                    <hr className={s.ruler} />

                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Region</h4>
                        {err.region && <p className={s.validationError}>{err.region}</p>}
                        <input 
                            onChange={e => setRegion(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="text"
                            value={region} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>District</h4>
                        {err.district && <p className={s.validationError}>{err.district}</p>}
                        <input 
                            onChange={e => setDistrict(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="text"
                            value={district} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>City</h4>
                        {err.city && <p className={s.validationError}>{err.city}</p>}
                        <input 
                            onChange={e => setCity(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="text"
                            value={city} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Street</h4>
                        {err.street && <p className={s.validationError}>{err.street}</p>}
                        <input
                            onChange={e => setStreet(e.target.value)} 
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="text"
                            value={street} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Building</h4>
                        {err.building && <p className={s.validationError}>{err.building}</p>}
                        <input 
                            onChange={e => setBuilding(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="number"
                            value={building} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Apartment</h4>
                        {err.apartment && <p className={s.validationError}>{err.apartment}</p>}
                        <input
                            onChange={e => setApartment(e.target.value)} 
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="number"
                            value={apartment} />
                    </label>
                    <label className={s.changeDataPiece}>
                        <h4 className={s.dataHead}>Postal code</h4>
                        {err.postalCode && <p className={s.validationError}>{err.postalCode}</p>}
                        <input 
                            onChange={e => setPostalCode(e.target.value)}
                            className={`${s.dataBody} ${s.prompt}`} 
                            type="number"
                            value={postalCode} />
                    </label>
                    <div className={s.buttonContainer}>
                        <button 
                            onClick={applyChanges}
                            className={`${s.button} ${s.changeButton}`}>
                            Apply
                        </button>
                        <button 
                            onClick={() => navigate(PROFILE_PAGE)}
                            className={`${s.button} ${s.logOutButton}`}>
                            Back
                        </button>
                    </div>
                    {errorState && <p className={s.validationError}>Incorrect data</p>}
                </div>
            </div>
        </div>
    );
}

