import s from "../../style/Cart.module.css";
import FormInput from "./FormInput";
import { useState } from "react";

export default (props) => {
    const customer = props.customer;
    const err = props.err;

    const [phoneNumber, setPhoneNumber] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [region, setRegion] = useState();
    const [district, setDistrict] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [building, setBuilding] = useState();
    const [apartment, setApartment] = useState();
    const [postalCode, setPostalCode] = useState();

    customer.phoneNumber = phoneNumber;
    customer.firstname = firstname;
    customer.lastname = lastname;
    customer.region = region;
    customer.district = district;
    customer.city = city;
    customer.street = street;
    customer.building = building;
    customer.apartment = apartment;
    customer.postalCode = postalCode;

    return (
        <div className={s.unregisteredForm}>
            <FormInput
                name="Phone number"
                err={ err.phoneNumber }
                setValue={ setPhoneNumber }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="Firstname"
                err={ err.firstname }
                setValue={ setFirstname }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="Lastname"
                err={ err.lastname }
                setValue={ setLastname }
                type={ "text" }
            />
            <FormInput
                name="Region"
                err={ err.region }
                setValue={ setRegion }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="District"
                err={ err.district }
                setValue={ setDistrict }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="City"
                err={ err.city }
                setValue={ setCity }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="Street"
                err={ err.street }
                setValue={ setStreet }
                type={ "text" }
            />
            <FormInput
                name="Building"
                err={ err.building }
                setValue={ setBuilding }
                type={ "number" }
            />
            <FormInput
                name="Apartment"
                err={ err.apartment }
                setValue={ setApartment }
                type={ "number" }
            />
            <FormInput
                name="Postal code"
                err={ err.postalCode }
                setValue={ setPostalCode }
                type={ "number" }
            />
        </div>
    );
}