import React, { useContext, useEffect, useState } from 'react'
import api from '../../../AxiosConfig/contacts';
import { Context } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Unauthorized from '../General/Unauthorized';
import Loader from '../General/Loader';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MovementsHistory() {

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
            const resMovement = await api.get(`/company_movement`);

            setMovement(resMovement.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete(MovementId) {

        try {
            const resMovement = await api.delete(`/company_movement/${MovementId}`);

            notify('The submission has been successfully deleted', 'success');
            getMovements();
        } catch (error) {
            console.error(error);

            notify('An error occurred, please try again later', 'success');
        }
    }

    if (!movements) {
        return <Loader />
    }

    if (values.UserInfo?.role !== 'company') {
        return <Unauthorized />
    }


    return (

        <>
            <ToastContainer />
            <h1 className="text-first-color fw-bold text-center px-2 my-5">
                Movements <span className="text-second-color">History</span>
            </h1>
            <div className="container px-0" style={{ marginBottom: '10%' }}>
                <div className="mt-4 shadow border rounded-lg overflow-auto" style={{ height: '400px', overflowY: 'scroll' }}>
                    <table className="table table-sm table-responsive">
                        <thead className="bg-light text-black fs-lg fw-medium border-bottom">

                            <tr>
                                <th className="py-2 px-3">ID movement</th>
                                <th className="py-2 px-3">Request</th>
                                <th className="py-2 px-3">Station</th>
                                <th className="py-2 px-3">Date</th>
                                <th className="py-2 px-3">Condition</th>
                                <th className="py-2 px-3">Continuation in your request</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {movements?.map((movement) => (
                                <tr key={movement.id}>
                                    <td className="px-3 py-2">{movement.id}</td>
                                    <td className="px-3 py-2">
                                        <Link to={`/view-request/${movement.request_id}`} className="btn btn-success">
                                            Show request
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2">
                                        <Link to={`/view-station/${movement.station_id}`} className="btn btn-success">
                                            Show station
                                        </Link>
                                    </td>
                                    <td className="px-3 py-2">{movement.date.split('T')[0]}</td>
                                    <td className="px-3 py-2">
                                        <span style={{ color: movement.condition ? '#198754' : '#d4e23b', fontSize: '1rem' }}>
                                            {movement.condition ? 'acceptable' : "pending"}
                                        </span>
                                    </td>

                                    {movement.condition ?
                                        <td className="py-2 px-3">
                                            <Link to={`/send-capture-request/${movement.id}`} className="btn btn-outline-success">
                                                Continue
                                            </Link>
                                        </td>
                                        :
                                        <td className="py-2 px-3">
                                            ...
                                        </td>
                                    }

                                    <td className="py-2 px-3">

                                        <button
                                            onClick={() => handleDelete(movement.id)}
                                            className="btn btn-danger"
                                            style={{ padding: '0.35rem 1.2rem', fontSize: '1rem' }}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default MovementsHistory;