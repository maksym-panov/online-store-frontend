import { useState } from "react";
import s from "../../style/Orders.module.css";
import DataInput from "../common/DataInput";

export default (props) => {
    const order = props.order;
    const setOrder = props.setOrder;
    const err = props.err;

    const c = order.unregCust;

    const [firstname, setFirstname] = useState(c.firstname);
    const [lastname, setLastname] = useState(c.lastname);
    const [phoneNumber, setPhoneNumber] = useState(c.phoneNumber);
    const [region, setRegion] = useState(c.region);
    const [district, setDistrict] = useState(c.district);
    const [city, setCity] = useState(c.city);
    const [street, setStreet] = useState(c.street);
    const [building, setBuilding] = useState(c.building);
    const [apartment, setApartment] = useState(c.apartment);
    const [postalCode, setPostalCode] = useState(c.postalCode);

    c.firstname = firstname;
    c.lastname = lastname;
    c.phoneNumber = phoneNumber;
    c.region = region;
    c.district = district;
    c.city = city;
    c.street = street;
    c.building = building;
    c.apartment = apartment;
    c.postalCode = postalCode;
    
    return (
        <div className={s.custData}>
            <h3 
                style={ {fontWeight: "bold"} } 
                className={s.ordProdTitle}
            >
            Customer #{c.unregisteredCustomerId} personal information</h3>
            <div className={s.cData}>
                <div className={s.cDataCol}>
                    <h4 className={s.ordProdTitle}>Contacts</h4>
                    { err?.firstname && <p className={s.validationError}>{ err.firstname }</p> }
                    <DataInput 
                        value={ firstname }
                        setValue={ setFirstname }
                        name={"First name"}
                        type="text"
                    />
                    { err?.lastname && <p className={s.validationError}>{ err.lastname }</p> }
                    <DataInput 
                        value={ lastname }
                        setValue={ setLastname }
                        name={"Last name"}
                        type="text"
                    />
                    { err?.phoneNumber && <p className={s.validationError}>{ err.phoneNumber }</p> }
                    <DataInput 
                        value={ phoneNumber }
                        setValue={ setPhoneNumber }
                        name={"Phone number"}
                        type="text"
                    />
    
                </div>
                <div className={s.cDataCol}>
                    <h4 className={s.ordProdTitle}>Address</h4>
                    { err?.region && <p className={s.validationError}>{ err.region }</p> }
                    <DataInput 
                        value={ region }
                        setValue={ setRegion }
                        name={"Region"}
                        type="text"
                    />
                    { err?.district && <p className={s.validationError}>{ err.district }</p> }
                    <DataInput 
                        value={ district }
                        setValue={ setDistrict }
                        name={"District"}
                        type="text"
                    />
                    { err?.city && <p className={s.validationError}>{ err.city }</p> }
                    <DataInput 
                        value={ city }
                        setValue={ setCity }
                        name={"City"}
                        type="text"
                    />
                    { err?.street && <p className={s.validationError}>{ err.street }</p> }
                    <DataInput 
                        value={ street }
                        setValue={ setStreet }
                        name={"Street"}
                        type="text"
                    />
                    { err?.building && <p className={s.validationError}>{ err.building }</p> }
                    <DataInput 
                        value={ building }
                        setValue={ setBuilding }
                        name={"Building"}
                        type="number"
                    />
                    { err?.apartment && <p className={s.validationError}>{ err.apartment }</p> }
                    <DataInput 
                        value={ apartment }
                        setValue={ setApartment }
                        name={"Apartment"}
                        type="number"
                    />
                    { err?.postalCode && <p className={s.validationError}>{ err.postalCode }</p> }
                    <DataInput 
                        value={ postalCode }
                        setValue={ setPostalCode }
                        name={"Postal code"}
                        type="number"
                    />
                </div>
            </div>
        </div>
    );
}