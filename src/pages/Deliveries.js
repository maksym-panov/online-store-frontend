import Axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, DELIVERIES } from "../utils/constants";

export function Deliveries() {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        const prom = await Axios.get(API_BASE_URL + DELIVERIES);
        setDeliveries(prom.data);
    }

    return (
        <div>
            {deliveries.map(deliv => <h1 key={deliv.deliveryTypeId}>{deliv.name}</h1>)}
        </div>
    );
}