import ProfileDataPiece from "./ProfileDataPiece";
import s from "../../style/Profile.module.css";
import ph from "../../utils/profileHelper";
const ProfileData = (props) => {
  const ctx = props.mediator;

  return (
    <>
      <div className={s.profileImage}>
        <div 
          className={s.image}
          style={ ph.profileImageStyle(ctx.user.image) }
        ></div>
        <h1 className={s.userName}>{ ph.fullname(ctx) }</h1>
      </div>

      <ProfileDataPiece 
          name={ "Phone number" } 
          value={ ctx.pi?.phoneNumber }
      />
      <ProfileDataPiece 
          name={ "Email" } 
          value={ ctx.pi?.email }
      />
      <ProfileDataPiece 
          name={ "Firstname" } 
          value={ ctx.pi?.firstname }
      />
      <ProfileDataPiece 
          name={ "Lastname" } 
          value={ ctx.pi?.lastname }
      />
      <ProfileDataPiece 
          name={ "Region" } 
          value={ ctx.a?.region }
      />
      <ProfileDataPiece 
          name={ "District" } 
          value={ ctx.a?.district }
      />
      <ProfileDataPiece 
          name={ "City" } 
          value={ ctx.a?.city }
      />
      <ProfileDataPiece 
          name={ "Street" } 
          value={ ctx.a?.street }
      />
      <ProfileDataPiece 
          name={ "Building" } 
          value={ ctx.a?.building }
      />
      <ProfileDataPiece 
          name={ "Apartment" } 
          value={ ctx.a?.apartment }
      />
      <ProfileDataPiece 
          name={ "Postal code" } 
          value={ ctx.a?.postalCode }
      />
    </>
  );
}

export default ProfileData;