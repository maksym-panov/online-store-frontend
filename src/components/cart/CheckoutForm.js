import styles from "../../style/Cart.module.css";
import profileStyles from "../../style/Profile.module.css";

export const CheckoutForm = (props) => {
    const customer = props.customer;
    const setCustomer = props.setCustomer;
    const err = props.err;

    return (
        <div className={styles.unregisteredForm}>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Phone number*</h4>
                {err.phoneNumber && <p className={profileStyles.validationError}>{err.phoneNumber}</p>}
                <input 
                    onChange={e => {
                        customer.phoneNumber = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>First name*</h4>
                {err.firstname && <p className={profileStyles.validationError}>{err.firstname}</p>}
                <input 
                    onChange={e => {
                        customer.firstname = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Last name</h4>
                {err.lastname && <p className={profileStyles.validationError}>{err.lastname}</p>}
                <input 
                    onChange={e => {
                        customer.lastname = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="text"
                />
            </label>

            <hr className={profileStyles.ruler} />

            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Region*</h4>
                {err.region && <p className={profileStyles.validationError}>{err.region}</p>}
                <input 
                    onChange={e => {
                        customer.region = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>District*</h4>
                {err.district && <p className={profileStyles.validationError}>{err.district}</p>}
                <input 
                    onChange={e => {
                        customer.district = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>City*</h4>
                {err.city && <p className={profileStyles.validationError}>{err.city}</p>}
                <input 
                    onChange={e => {
                        customer.city = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Street</h4>
                {err.street && <p className={profileStyles.validationError}>{err.street}</p>}
                <input
                    onChange={e => {
                        customer.street = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="text"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Building</h4>
                {err.building && <p className={profileStyles.validationError}>{err.building}</p>}
                <input 
                    onChange={e => {
                        customer.building = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="number"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Apartment</h4>
                {err.apartment && <p className={profileStyles.validationError}>{err.apartment}</p>}
                <input
                    onChange={e => {
                        customer.apartment = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="number"
                />
            </label>
            <label className={profileStyles.changeDataPiece}>
                <h4 className={profileStyles.dataHead}>Postal code</h4>
                {err.postalCode && <p className={profileStyles.validationError}>{err.postalCode}</p>}
                <input 
                    onChange={e => {
                        customer.postalCode = e.target.value
                        setCustomer(customer)
                    }}
                    className={`${profileStyles.dataBody} ${profileStyles.prompt}`} 
                    type="number"
                />
            </label>
        </div>
    );
}