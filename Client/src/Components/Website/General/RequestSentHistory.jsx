import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import api from '../../../AxiosConfig/contacts';

function RequestSentHistory() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const values = useContext(Context);

    const [movements, setMovement] = useState();

    useEffect(() => {
        getMovements()
    }, [values])

    async function getMovements() {
        if (!values) return;

        try {
            const resMovement = await api.get(`/${values.UserInfo.role === 'company' ? 'capture_requests_company' : 'capture_requests_station'} `);

            setMovement(resMovement.data);
            console.log(resMovement.data)
        } catch (error) {
            console.error(error);
        }
    }

    if (!movements) {
        return <Loader />
    }
    return (
        <>
            <table className="table table-sm table-responsive">
                <thead className="bg-light text-black fs-lg fw-medium border-bottom">
                    <tr>
                        <th className="py-2 px-3">ID movement</th>
                        <th className="py-2 px-3">Condition</th>
                        <th className="py-2 px-3">Request</th>
                        {values?.UserInfo?.role === 'company' ? <th className="py-2 px-3">{values?.UserInfo?.role === 'company' ? 'Station' : 'Company'}</th> : null}
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">City</th>
                        <th className="py-2 px-3">Delivery address</th>
                        <th className="py-2 px-3">Delivery date</th>
                        <th className="py-2 px-3">Delivery time</th>
                        <th className="py-2 px-3">Material price</th>
                        <th className="py-2 px-3">Material quantity</th>
                        <th className="py-2 px-3">Material type</th>
                        <th className="py-2 px-3">Payment method</th>
                        <th className="py-2 px-3">Total price</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {movements?.map((movement) => (
                        <tr key={movement.id}>
                            <td className="px-3 py-2">{movement.id}</td>
                            <td className="px-3 py-2">{movement.condition}</td>
                            <td className="px-3 py-2">
                                <Link to={`/view-request/${movement.request_id}`} className="btn btn-outline-success">
                                    Show request
                                </Link>
                            </td>
                            {values?.UserInfo?.role === 'company' ?
                                <td className="px-3 py-2">
                                    <Link to={`/view-station/${ movement.station_id}`} className="btn btn-outline-success">
                                        Show station
                                    </Link>
                                </td>
                                : null
                            }


                            <td className="px-3 py-2">{movement.date.split('T')[0]}</td>
                            <td className="px-3 py-2">{movement.city}</td>
                            <td className="px-3 py-2">{movement.delivery_address}</td>
                            <td className="px-3 py-2">{movement.delivery_date.split('T')[0]}</td>
                            <td className="px-3 py-2">{movement.delivery_time}</td>
                            <td className="px-3 py-2">
                                {values?.UserInfo?.role === 'company' ? movement.material_price : String((Number(movement.material_price) / (1 - Number(movement.profit_ratio))).toFixed(3)).slice(0, -1)}
                            </td>
                            <td className="px-3 py-2">{movement.material_quantity}</td>
                            <td className="px-3 py-2">{movement.material_type}</td>
                            <td className="px-3 py-2">{movement.payment_method}</td>
                            <td className="px-3 py-2">
                                {values?.UserInfo?.role === 'company' ? movement.total_price : String((Number(movement.total_price) / (1 - Number(movement.profit_ratio))).toFixed(3)).slice(0, -1)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default RequestSentHistory