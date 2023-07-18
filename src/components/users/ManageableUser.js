import { Link } from "react-router-dom";
import { 
    MANAGE_ORDERS_PAGE,
    BASE64_RESOLVER, 
    USERS
} from "../../utils/constants";
import s from "../../style/ManagerUsers.module.css";
import account from "../../img/account.png";
import { useEffect, useState } from "react";
import { api } from "../../utils/axiosHelper";
import { useSelector } from "react-redux";

export default (props) => {
    const user = useSelector(state => state.user);
    const u = props.user;
    const isAdmin = props.isAdmin;

    const pi = u.personalInfo;
    const a = u.address;
    const address = compileAddress(a);

    const [access, setAccess] = useState("USER");

    const putAccess = async (value) => {
        try {
            await api
                .put(
                    USERS + "/" + u.userId,
                    value,
                    {
                        headers: {
                            "Authorization": user.jwt,
                            "Content-Type": "text/plain"
                        }
                    }    
                )
            
            setAccess(value); 
        } catch(ignored) {}
    }

    const fetchAccess = async () => {
        if (!isAdmin) {
            return;
        }
        
        try {
            const res = await api
                .get(
                    "/users/access/" + u.userId,
                    {
                        headers: {
                            "Authorization": user.jwt
                        }
                    }
                )
                .then(resp => resp.data);
                    
            setAccess(res);
        } catch(ignored) {}
    }

    useEffect(() => {
        fetchAccess();
    }, []);

    return (
        <div
            className={s.usr}
        >
            <Link 
                to={ MANAGE_ORDERS_PAGE + "?user=" + u.userId }
                style={
                    u.image ?
                    {
                        backgroundImage: `url(${BASE64_RESOLVER + u.image})`
                    }
                    :
                    {
                        backgroundImage: `url(${account})`
                    }
                }
                className={s.img}
            ></Link>
            <div className={s.data}>
                <p className={s.text}>User ID: { u.userId }</p>
                <p className={s.text}>Name: { pi.firstname + " " + (pi.lastname ? pi.lastname : "") }</p>
                <p className={s.text}>Phone: +38{ pi.phoneNumber }</p>
                <p className={s.text}>Email: { pi.email ? pi.email : " - "}</p>
                {
                    isAdmin &&
                    <label className={s.lab}>
                        {"Access level: "}
                        <select value={ access } onChange={ e => putAccess(e.target.value) }>
                            <option value={ "USER" }>User</option> 
                            <option value={ "MANAGER" }>Manager</option>
                            <option value={ "ADMINISTRATOR"}>Admin</option>
                        </select>
                    </label>
                } 
            </div>
            <div className={s.addr}>
                <p className={s.text}>Address:</p>
                { address !== "" ? <p className={s.text}>{ address }</p> : " - " }
            </div>
        </div>
    );
}

const compileAddress = (a) => {
    let address = "";
    if (a.region) {
        address += a.region + " reg.";
    }
    if (a.district) {
        address += ", ";
        address += a.district + " dist.";
    }
    if (a.city) {
        address += ", ";
        address += a.city;
    }
    if (a.street) {
        address += ", ";
        address += a.street + " st.";
    }
    if (a.building) {
        address += ", ";
        address += a.building + " b.";
    }
    if (a.apartment) {
        address += ", ";
        address += a.apartment + " ap.";
    }
    if (a.postalCode) {
        address += ", ";
        address += a.postalCode;
    }


    return address.replace(/^[, ]*/, "");
}