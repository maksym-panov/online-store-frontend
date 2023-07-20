import s from "../../style/Cart.module.css";
import profileS from "../../style/Profile.module.css";

export default (props) => {
    const customer = props.customer;
    const setCustomer = props.setCustomer;
    const err = props.err;

    return (
        <div className={s.unregisteredForm}>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>Phone number*</h4>
                {err.phoneNumber && <p className={profileS.validationError}>{err.phoneNumber}</p>}
                <input 
                    onChange={e => {
                        customer.phoneNumber = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>First name*</h4>
                {err.firstname && <p className={profileS.validationError}>{err.firstname}</p>}
                <input 
                    onChange={e => {
                        customer.firstname = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>Last name</h4>
                {err.lastname && <p className={profileS.validationError}>{err.lastname}</p>}
                <input 
                    onChange={e => {
                        customer.lastname = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="text"
                />
            </label>

            <hr className={profileS.ruler} />

            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>Region*</h4>
                {err.region && <p className={profileS.validationError}>{err.region}</p>}
                <input 
                    onChange={e => {
                        customer.region = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>District*</h4>
                {err.district && <p className={profileS.validationError}>{err.district}</p>}
                <input 
                    onChange={e => {
                        customer.district = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>City*</h4>
                {err.city && <p className={profileS.validationError}>{err.city}</p>}
                <input 
                    onChange={e => {
                        customer.city = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>Street</h4>
                {err.street && <p className={profileS.validationError}>{err.street}</p>}
                <input
                    onChange={e => {
                        customer.street = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>Building</h4>
                {err.building && <p className={profileS.validationError}>{err.building}</p>}
                <input 
                    onChange={e => {
                        customer.building = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="number"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>Apartment</h4>
                {err.apartment && <p className={profileS.validationError}>{err.apartment}</p>}
                <input
                    onChange={e => {
                        customer.apartment = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="number"
                />
            </label>
            <label className={profileS.changeDataPiece}>
                <h4 className={profileS.dataHead}>Postal code</h4>
                {err.postalCode && <p className={profileS.validationError}>{err.postalCode}</p>}
                <input 
                    onChange={e => {
                        customer.postalCode = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileS.dataBody} ${profileS.prompt}`} 
                    type="number"
                />
            </label>
        </div>
    );
}