import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Loader from '../General/Loader';
import api from '../../../AxiosConfig/contacts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReceivedRequests() {
    const values = useContext(Context);

    function notify(toastMessage, toastType) {
        toast(toastMessage, {
            type: toastType
        })
    };
    
    const [movements, setMovement] = useState();

    useEffect(() => {
        getMovements()
    }, [values])

    async function getMovements() {
        if (!values) return;

        try {
            const resMovement = await api.get(`/company_movement_for_station`);

            setMovement(resMovement.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleAccept(movement) {

        try {
            const resMovement = await api.post(`/accept_movement`, { movement_id: movement.id, company_id: movement.company_id });

            notify('The request has been successfully accepted', 'success');
            getMovements();
        } catch (error) {
            console.error(error);
        }
    }

    if (!movements) {
        return <Loader />
    }
    return (
        <>
            <ToastContainer />
            <table className="table table-sm table-responsive">
                <thead className="bg-light text-black fs-lg fw-medium border-bottom">
                    <tr>
                        <th className="py-2 px-3">ID movement</th>
                        <th className="py-2 px-3">Request</th>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Acceptance of requests</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {movements?.map((movement) => (
                        <tr key={movement.id}>
                            <td className="px-3 py-2">{movement.id}</td>
                            <td className="px-3 py-2">
                                <Link to={`/view-request/${movement.request_id}`} className="btn btn-outline-success">
                                    Show request
                                </Link>
                            </td>

                            <td className="px-3 py-2">{movement.date.split('T')[0]}</td>

                            <td className="py-2 px-3">
                                <button
                                    onClick={() => handleAccept(movement)}
                                    disabled={movement.condition}
                                    className="btn btn-success"
                                    style={{ padding: '0.35rem 1.2rem', fontSize: '1rem', width: '200px' }}
                                >
                                    {!movement.condition ? 'Accept' : 'Accepted'}
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ReceivedRequests