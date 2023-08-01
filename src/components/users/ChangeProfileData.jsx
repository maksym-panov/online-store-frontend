import ph from "../../utils/profileHelper";
import { getBase64 } from "../../utils/webHelpers";
import { useState } from "react";
import s from "../../style/Profile.module.css";
import FormInput from "../common/FormInput";

const ChangeProfileData = (props) => {
  const ctx = props.mediator;

  const [image, setImage] = useState(ctx.cusr.image);
  const [phoneNumber, setPhoneNumber] = useState(ctx.cpi.phoneNumber);
  const [email, setEmail] = useState(ctx.cpi.email ? ctx.cpi.email : "");
  const [firstname, setFirstname] = useState(ctx.cpi.firstname);
  const [lastname, setLastname] = useState(ctx.cpi.lastname ? ctx.cpi.lastname : "");
  const [region, setRegion] = useState(ctx.ca.region ? ctx.ca.region : "");
  const [district, setDistrict] = useState(ctx.ca.district ? ctx.ca.district : "");
  const [city, setCity] = useState(ctx.ca.city ? ctx.ca.city : "");
  const [street, setStreet] = useState(ctx.ca.street ? ctx.ca.street : "");
  const [building, setBuilding] = useState(ctx.ca.building ? ctx.ca.building : "");
  const [apartment, setApartment] = useState(ctx.ca.apartment ? ctx.ca.apartment : "");
  const [postalCode, setPostalCode] = useState(ctx.ca.postalCode ? ctx.ca.postalCode : "");
  
  ctx.toSend = {
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

  const changeImageCommand = (e) => getBase64(e.target.files[0], setImage);

  return (
    <>
      <div className={s.profileImage}>
        <div 
          className={s.image}
          style={ ph.profileImageStyle(image) }
        >
        </div>
        <label className={s.changeDataPiece}>
          <input 
            className={s.inputImage}
            type="file"  
            onChange={ changeImageCommand }
          />
        </label>
      </div>
      <FormInput
        name="Phone number"
        err={ ctx.err.phoneNumber }
        value={ phoneNumber }
        setValue={ setPhoneNumber }
        type={ "text" }
      /> 
      <FormInput
        name="Email"
        err={ ctx.err.email }
        value={ email }
        setValue={ setEmail }
        type={ "email" }
      /> 
      <FormInput
        name="Firstname"
        err={ ctx.err.firstname }
        value={ firstname }
        setValue={ setFirstname }
        type={ "text" }
      /> 
      <FormInput
        name="Lastname"
        err={ ctx.err.lastname }
        value={ lastname }
        setValue={ setLastname }
        type={ "text" }
      /> 

      <hr className={s.ruler} />

      <FormInput
        name="Region"
        err={ ctx.err.region }
        value={ region }
        setValue={ setRegion }
        type={ "text" }
      /> 
      <FormInput
        name="District"
        err={ ctx.err.district }
        value={ district }
        setValue={ setDistrict }
        type={ "text" }
      /> 
      <FormInput
        name="City"
        err={ ctx.err.city }
        value={ city }
        setValue={ setCity }
        type={ "text" }
      /> 
      <FormInput
        name="Street"
        err={ ctx.err.street }
        value={ street }
        setValue={ setStreet }
        type={ "text" }
      /> 
      <FormInput
        name="Building"
        err={ ctx.err.building }
        value={ building }
        setValue={ setBuilding }
        type={ "number" }
      /> 
      <FormInput
        name="Apartment"
        err={ ctx.err.apartment }
        value={ apartment }
        setValue={ setApartment }
        type={ "number" }
      /> 
      <FormInput
        name="Postal code"
        err={ ctx.err.postalCode }
        value={ postalCode }
        setValue={ setPostalCode }
        type={ "number" }
      /> 
    </>
  );
}

export default ChangeProfileData;