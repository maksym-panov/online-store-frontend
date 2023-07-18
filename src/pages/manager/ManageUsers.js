import { 
    useEffect, 
    useState 
} from "react";
import s from "../../style/ManagerUsers.module.css";
import { useSelector } from "react-redux";
import { 
    useNavigate, 
    useSearchParams
} from "react-router-dom";
import { 
    API_ENTITIES_PER_PAGE_PARAM,
    API_OFFSET_PARAM,
    API_PHONE_PARAM,
    ERROR_PAGE, 
    USERS, 
    USERS_PER_PAGE
} from "../../utils/constants";
import { api } from "../../utils/axiosHelper";
import { Pagination } from "../../common/Pagination";
import ManageableUser from "../../components/users/ManageableUser";

export default (props) => {
    const isAdmin = props.isAdmin;

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
                            <ManageableUser key={ u.userId } user={ u } isAdmin={ isAdmin } />   
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

