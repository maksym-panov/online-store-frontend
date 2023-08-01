import s from "../../style/Cart.module.css";
import FormInput from "./FormInput";
import { useState } from "react";

export default (props) => {
    const ctx = props.mediator;

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

    ctx.customer.phoneNumber = phoneNumber;
    ctx.customer.firstname = firstname;
    ctx.customer.lastname = lastname;
    ctx.customer.region = region;
    ctx.customer.district = district;
    ctx.customer.city = city;
    ctx.customer.street = street;
    ctx.customer.building = building;
    ctx.customer.apartment = apartment;
    ctx.customer.postalCode = postalCode;

    return (
        <div className={s.unregisteredForm}>
            <FormInput
                name="Phone number"
                err={ ctx.err.phoneNumber }
                setValue={ setPhoneNumber }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="Firstname"
                err={ ctx.err.firstname }
                setValue={ setFirstname }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="Lastname"
                err={ ctx.err.lastname }
                setValue={ setLastname }
                type={ "text" }
            />
            <FormInput
                name="Region"
                err={ ctx.err.region }
                setValue={ setRegion }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="District"
                err={ ctx.err.district }
                setValue={ setDistrict }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="City"
                err={ ctx.err.city }
                setValue={ setCity }
                type={ "text" }
                req={ true }
            />
            <FormInput
                name="Street"
                err={ ctx.err.street }
                setValue={ setStreet }
                type={ "text" }
            />
            <FormInput
                name="Building"
                err={ ctx.err.building }
                setValue={ setBuilding }
                type={ "number" }
            />
            <FormInput
                name="Apartment"
                err={ ctx.err.apartment }
                setValue={ setApartment }
                type={ "number" }
            />
            <FormInput
                name="Postal code"
                err={ ctx.err.postalCode }
                setValue={ setPostalCode }
                type={ "number" }
            />
        </div>
    );
}