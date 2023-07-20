import s from "../../style/Orders.module.css";

export default (props) => {
    const user = props.user;
    const pi = user.personalInfo;
    const a = user.address;
    
    return (
        <div className={s.custData}>
            <h3
                style={ {fontWeight: "bold"} } 
                className={s.ordProdTitle}>User #{user.userId} personal information
            </h3>
            <div className={s.cData}>
                <div className={s.cDataCol}>
                    <div>
                        <h4 className={s.userDataTitle}>Contacts</h4>
                        <p className={s.userDataPiece}>First name: { " " + pi?.firstname }</p>
                        <p className={s.userDataPiece}>Last name: { pi?.lastname ? " " + pi?.lastname : " - " }</p>
                        <p className={s.userDataPiece}>Phone number: { " +38" + pi?.phoneNumber }</p>
                        <p className={s.userDataPiece}>Email: { pi?.email ? " " + pi?.email : " - " }</p>
                    </div>
                </div>
                <div className={s.cDataCol}>
                    <div>
                        <h4 className={s.userDataTitle}>Address</h4>
                        <p className={s.userDataPiece}>Region: { a?.region ? " " + a?.region : " - " }</p>
                        <p className={s.userDataPiece}>District: { a?.district ? " " + a?.district : " - " }</p>
                        <p className={s.userDataPiece}>City: { a?.city ? " " + a?.city : " - " }</p>
                        <p className={s.userDataPiece}>Street: { a?.street ? " " + a?.street : " - " }</p>
                        <p className={s.userDataPiece}>Building: { a?.building ? " " + a?.building : " - " }</p>
                        <p className={s.userDataPiece}>Apartment: { a?.apartment ? " " + a?.apartment : " - " }</p>
                        <p className={s.userDataPiece}>Postal code: { a?.postalCode ? " " + a?.postalCode : " - " }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}