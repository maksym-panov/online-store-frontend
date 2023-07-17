import { 
    useEffect, 
    useState 
} from "react";
import s from "../../style/ManagerUsers.module.css";
import { useSelector } from "react-redux";
import { 
    useNavigate, 
    useSearchParams,
    Link 
} from "react-router-dom";
import { 
    API_ENTITIES_PER_PAGE_PARAM,
    API_NAME_PARAM,
    API_OFFSET_PARAM,
    API_PHONE_PARAM,
    BASE64_RESOLVER,
    ERROR_PAGE, 
    MANAGE_ORDERS_PAGE, 
    USERS, 
    USERS_PER_PAGE
} from "../../utils/constants";
import { api } from "../../utils/axiosHelper";
import { Pagination } from "../../common/Pagination";
import account from "../../img/account.png";

export default () => {
    const [users, setUsers] = useState([]);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();
    const [phoneNumber, setPhoneNumber] = useState("");

    let page = params.get("page");

    useEffect(() => {
        if (page == null) {
            page = 1;
        }
        if (page <= 0) {
            setParams({ page: 1})
            page = 1;
        }
        fetchUsers(page, setParams, setUsers, user.jwt, navigate);
    }, [page]);

    return (
        <div className={s.cont}>
            <div className={s.col}> 
                <div className={s.search}>
                    <input 
                        className={s.inp} 
                        type="text" 
                        placeholder="Find user by phone number"
                        value={ phoneNumber }
                        onChange={ e => setPhoneNumber(e.target.value) }
                    />
                    <button 
                        onClick={ () => fetchByPhone(setUsers, phoneNumber, user.jwt, setParams) }
                        className={s.btn}>Search</button>
                </div>
                <div className={s.lst}>
                    {
                        users.slice(0, USERS_PER_PAGE).map(u => 
                            { 
                                const pi = u.personalInfo;
                                const a = u.address;
                                const address = compileAddress(a);

                                return (
                                    <Link 
                                        to={ MANAGE_ORDERS_PAGE + "?user=" + u.userId }
                                        className={s.usr}
                                    >
                                        <div 
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
                                        ></div>
                                        <div className={s.data}>
                                            <p className={s.text}>User ID: { u.userId }</p>
                                            <p className={s.text}>Name: { pi.firstname + " " + (pi.lastname ? pi.lastname : "") }</p>
                                            <p className={s.text}>Phone: +38{ pi.phoneNumber }</p>
                                            <p className={s.text}>Email: { pi.email ? pi.email : " - "}</p>
                                        </div>
                                        <div className={s.addr}>
                                            <p className={s.text}>Address:</p>
                                            { address !== "" ? <p className={s.text}>{ address }</p> : " - " }
                                        </div>
                                    </Link>
                                );
                                
                            }    
                        )
                    }
                </div>
                <Pagination 
                    current={ page }
                    perPage={ USERS_PER_PAGE }
                    entities={ users } />
            </div>
        </div>
    )
}

const fetchUsers = async (page, setParams, setUsers, token, navigate) => {
    try {
        const offset = (page - 1) * USERS_PER_PAGE;
        const number = 2 * USERS_PER_PAGE + 1;

        const users = await api
            .get(
                USERS + "?" + API_OFFSET_PARAM + offset + "&" + API_ENTITIES_PER_PAGE_PARAM + number,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data);

        if (users.length === 0 && page !== 1) {
            setParams({ page: 1 });
        }

        setUsers(users);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}

const fetchByPhone = async (setUsers, phoneNumber, token, setParams) => {
    try {
        setParams({});
        if (phoneNumber === "") {
            window.location.reload(false);
            return;
        }
        const user = await api
            .get(
                USERS + "?" + API_PHONE_PARAM + phoneNumber,
                {
                    headers: {
                        "Authorization": token
                    }
                }
            )
            .then(resp => resp.data);

        setUsers(user);
    } catch(error) {
        setUsers([]);
    }
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