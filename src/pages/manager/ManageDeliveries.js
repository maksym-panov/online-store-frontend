import { useEffect, useState } from "react";
import { api } from "../../utils/axiosHelper";
import { 
    DELIVERIES, 
    ERROR_PAGE 
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import s from "../../style/DeliveriesCategories.module.css";
import { useSelector } from "react-redux";

export default () => {
    const user = useSelector(state => state.user);
    const [deliveries, setDeliveries] = useState([]);
    const [name, setName] = useState("");
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDeliveries(setDeliveries, navigate);
    }, []);

    return (
        <div className={s.cont}>
            <div className={s.col}>
                <div className={s.newDCont}>
                    <h4 className={s.title}>Add new delivery</h4>
                    <label className={s.lab}>
                        { err && <p className={s.validationError}>{ err.name }</p> }
                        Name
                        <input 
                            type="text"
                            value={ name }
                            onChange={ e => setName(e.target.value) } 
                        />
                    </label>
                    { err?.general && <p className={s.validationError}>{ err.general }</p> }
                    <button 
                        className={s.btnP}
                        onClick={ 
                            () => createDelivery(name, user.jwt, setErr) 
                        }
                    >
                    Add
                    </button>
                    <button
                        onClick={ () => window.history.back() }
                        className={s.btnS} 
                    >
                    Back
                    </button>
                </div>
                <h4 className={s.title}>Existing delivery options</h4>
                <div className={s.list}>
                    {
                        deliveries?.map(d => 
                            <div className={s.ent}>
                                <div className={s.iCont}>
                                    <p className={s.text}>Id: { d.deliveryTypeId }</p>
                                </div>
                                <div className={s.tCont}>
                                    <p className={s.text}>{ d.name }</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                 
            </div>
        </div>
    );
}

const fetchDeliveries = async (setDeliveries, navigate) => {
    try {
        const deliveries = await api
            .get(DELIVERIES)
            .then(resp => resp.data);
        
            setDeliveries(deliveries);
    } catch(error) {
        navigate(ERROR_PAGE);
    }
}

const createDelivery = async (name, token, setErr) => {
    try {
        await api.post(
            DELIVERIES, 
            { 
                name: name 
            }, 
            {
                headers: {
                    "Authorization": token
                }
            }
        );

        window.location.reload(false);
    } catch(error) {
        if (error.response.data) {
            setErr(error.response.data);
            return;
        } 
        
        setErr({ general: "Something went wrong" });
    }
}