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
            const resMovement = await api.get(`/station_movement`);

            setMovement(resMovement.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete(MovementId) {
        
        try {
            const resMovement = await api.delete(`/station_movement/${MovementId}`);

            notify('Your interest in the order has been successfully deleted', 'success');
            getMovements();
        } catch (error) {
            console.error(error);

            notify('An error occurred, please try again later', 'success');
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
                        <th className="py-2 px-3">Delete</th>
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
                                    onClick={() => handleDelete(movement.id)}
                                    className="btn btn-danger"
                                    style={{ padding: '0.35rem 1.2rem', fontSize: '1rem'}}
                                >
                                    Delete
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