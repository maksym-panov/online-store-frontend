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
    BASE64_RESOLVER
} from "../../utils/constants";
import api from "../../utils/axiosHelper";
import { setUser } from "../../features/auth/userSlice";
import FormInput from "../../components/cart/FormInput"
import { ping } from "../../utils/webHelpers";

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

    useEffect(() => {
        ping(cusr, dispatch);
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
                    <FormInput
                        name="Phone number"
                        err={ err.phoneNumber }
                        value={ phoneNumber }
                        setValue={ setPhoneNumber }
                        type={ "text" }
                    /> 
                    <FormInput
                        name="Email"
                        err={ err.email }
                        value={ email }
                        setValue={ setEmail }
                        type={ "email" }
                    /> 
                    <FormInput
                        name="Firstname"
                        err={ err.firstname }
                        value={ firstname }
                        setValue={ setFirstname }
                        type={ "text" }
                    /> 
                    <FormInput
                        name="Lastname"
                        err={ err.lastname }
                        value={ lastname }
                        setValue={ setLastname }
                        type={ "text" }
                    /> 

                    <hr className={s.ruler} />

                    <FormInput
                        name="Region"
                        err={ err.region }
                        value={ region }
                        setValue={ setRegion }
                        type={ "text" }
                    /> 
                    <FormInput
                        name="District"
                        err={ err.district }
                        value={ district }
                        setValue={ setDistrict }
                        type={ "text" }
                    /> 
                    <FormInput
                        name="City"
                        err={ err.city }
                        value={ city }
                        setValue={ setCity }
                        type={ "text" }
                    /> 
                    <FormInput
                        name="Street"
                        err={ err.street }
                        value={ street }
                        setValue={ setStreet }
                        type={ "text" }
                    /> 
                    <FormInput
                        name="Building"
                        err={ err.building }
                        value={ building }
                        setValue={ setBuilding }
                        type={ "number" }
                    /> 
                    <FormInput
                        name="Apartment"
                        err={ err.apartment }
                        value={ apartment }
                        setValue={ setApartment }
                        type={ "number" }
                    /> 
                    <FormInput
                        name="Postal code"
                        err={ err.postalCode }
                        value={ postalCode }
                        setValue={ setPostalCode }
                        type={ "number" }
                    /> 
         
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

