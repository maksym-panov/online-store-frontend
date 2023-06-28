import Axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL, USERS } from "../utils/constants";

export function Contacts() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const prom = await Axios.get(API_BASE_URL + USERS);
        setUsers(prom.data);
    }

    console.log(users);

    return (
        <div>
            {users?.map(u => <h1>{u.personalInfo.firstname}</h1>)}
        </div>
    );
}