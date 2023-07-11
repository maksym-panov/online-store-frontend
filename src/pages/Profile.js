import { 
    useDispatch, 
    useSelector 
} from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
    BASE64_RESOLVER, 
    EMPTY_PAGE, 
    ERROR_PAGE, 
    LOGIN_PAGE, 
    ORDERS,  
    PROFILE_PAGE, 
    USERS
} from "../utils/constants";
import { setUser } from "../features/auth/userSlice";
import { clearCart } from "../features/cartSlice";
import s from "../style/Profile.module.css";
import accountWhite from "../img/accountWhite.png";
import { api } from "../utils/axiosHelper";
import { 
    useEffect, 
    useState 
} from "react";

export function Profile() {
    const user = useSelector(state => state.user);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(clearCart());
        dispatch(setUser({}));
        navigate(EMPTY_PAGE);
    };

    const fetchOrders = async () => {
        if (!user.userId) {
            return;
        }
        
        try {
            const res = await api
            .get(
                USERS + "/" + user.userId + ORDERS,
                {
                    headers: {
                        "Authorization": user.jwt
                    }
                }
            )
            .then(res => res.data);
        setOrders(res);
        } catch(error) {
            navigate(ERROR_PAGE);
        }
    };

    const ping = async () => {
        if (!user.userId) {
            navigate(LOGIN_PAGE)
            return;
        }
        
        try {
            const valid = await api.post(
                "/ping/" + user.userId,
                user.jwt.substring(7),
                {
                    headers: {
                        "Authorization": user.jwt
                    }
                }
            );

            if (!valid) {
                dispatch(setUser({}));
                navigate(LOGIN_PAGE);
            }
        } catch(error) {
            dispatch(setUser({}));
            navigate(LOGIN_PAGE);
        }
    }

    useEffect(() => {
        ping();
        fetchOrders();
    }, []);

    const statCol = (stat) => {
        const col = { };

        switch (stat) {
            case "POSTED":
                col.color = "grey";
                break;
            case "ACCEPTED":
                col.color = "gold";
                break;
            case "SHIPPING":
                col.color = "orange";
                break;
            case "DELIVERED":
                col.color = "blue";
                break;
            case "COMPLETED":
                col.color = "lightgreen";
                break;
            case "ABOLISHED":
                col.color = "red";
                break;
            default: 
                col.color = "black";
                break;
        }

        return col;
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profile}>
                <div className={s.column}>
                    <div className={s.profileImage}>
                        <div 
                            className={s.image}
                            style={
                                user.image ?
                                { backgroundImage: "url(" + BASE64_RESOLVER + user.image + ")" } :
                                { 
                                    backgroundImage: `url(${accountWhite})`,
                                    border: "2px black solid",
                                    backgroundColor: "black"  
                                }
                            }
                        >

                        </div>
                        <h1 className={s.userName}>
                            {
                                user.personalInfo?.firstname + 
                                (
                                    user.personalInfo?.lastname ? 
                                    " " + user.personalInfo.lastname : 
                                    ""
                                )
                            }
                        </h1>
                    </div>

                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Phone number</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.phoneNumber ?
                                user.personalInfo.phoneNumber :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Email</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.email ?
                                user.personalInfo.email :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>First name</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.firstname ?
                                user.personalInfo.firstname :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Last name</h5>
                        <p className={s.dataBody}>
                            {
                                user.personalInfo?.lastname ?
                                user.personalInfo.lastname :
                                "-"
                            }
                        </p>
                    </div>
                    <hr />
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Region</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.region ?
                                user.address.region :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>District</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.district ?
                                user.address.district :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>City</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.city ?
                                user.address.city :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Street</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.street ?
                                user.address.street :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Building</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.building ?
                                user.address.building :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Apartment</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.apartment ?
                                user.address.apartment :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.dataPiece}>
                        <h5 className={s.dataHead}>Postal code</h5>
                        <p className={s.dataBody}>
                            {
                                user.address?.postalCode ?
                                user.address.postalCode :
                                "-"
                            }
                        </p>
                    </div>
                    <div className={s.buttonContainer}>
                        <button
                            onClick={
                                () =>
                                    navigate(PROFILE_PAGE + "/change")
                            }
                            className={`${s.button} ${s.changeButton}`}
                        >
                            Change
                        </button>
                        <button 
                            onClick={logout} 
                            className={`${s.button} ${s.logOutButton}`}
                        >
                        Log Out
                        </button>
                    </div>
                </div>
            </div>
            <div className={s.ordCont}>
                <h1 className={s.title}>Placed orders</h1>
                <hr />
                {
                    orders.map(o => (
                            <div className={s.ordBod}>
                                <div className={s.ordMeta}> 
                                    <p className={s.text}>Order number: {o.orderId}</p>
                                    <p className={s.text}>Posted: 
                                        {
                                            new Date(
                                                parseInt(o.postTime)
                                            )
                                            .toLocaleString("uk-UA")
                                        }
                                    </p>
                                    <p className={s.text}>Completed: 
                                        {
                                            o.completeTime 
                                            ?
                                            new Date(
                                                parseInt(o.completeTime)
                                            )
                                            .toLocaleString("uk-UA")
                                            :
                                            " - "
                                        }
                                    </p>
                                    <p 
                                        style={ { fontWeight: "bold"} } 
                                        className={s.text}
                                    >
                                    Status: <span style={ statCol(o.status) }>{o.status}</span>
                                    </p>
                                </div>
                                <div className={s.ordProdSect}>
                                    <h5 className={s.ordProdTitle}>Contents</h5>
                                    <div className={s.prodLst}>
                                        <div className={s.prod}>
                                            <p style={ { fontWeight: "bold" } } className={s.text}>Product name</p>
                                            <p style={ { fontWeight: "bold", width: "80px", textAlign: "center" } } className={s.text}>Quantity</p>
                                        </div>
                                        <hr className={s.ruler} />
                                        {
                                            o.orderProducts.map(op => (
                                                <div className={s.prod}>
                                                    <p className={s.text}>- {op.product.name}</p>
                                                    <p style={ { width: "80px", textAlign: "center" } } className={s.text}>{op.quantity}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <hr className={s.ruler} />
                                    <h4 className={s.total}>Total: ${o.total}</h4>
                                </div>
                            </div>
                    ))
                }
            </div>
        </div>
    );
}