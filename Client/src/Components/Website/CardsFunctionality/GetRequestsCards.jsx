import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../AxiosConfig/contacts";

export default function GetRequestsCards(number) {

    const [requests, setRequests] = useState();

    async function getRequest() {
        try {
            const response = await api.get(`/request`);
            setRequests(response.data);

        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getRequest();
    }, [])

    return (
        requests
    );
}
