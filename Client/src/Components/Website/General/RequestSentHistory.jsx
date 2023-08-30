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
                        <th style={{padding: '5px 40px'}}>ID movement</th>
                        <th style={{padding: '5px 40px'}}>Condition</th>
                        <th style={{padding: '5px 40px'}}>Request</th>
                        {values?.UserInfo?.role === 'company' ? <th style={{padding: '5px 40px'}}>{values?.UserInfo?.role === 'company' ? 'Station' : 'Company'}</th> : null}
                        <th style={{padding: '5px 40px'}}>Date</th>
                        <th style={{padding: '5px 40px'}}>City</th>
                        <th style={{padding: '5px 40px'}}>Delivery address</th>
                        <th style={{padding: '5px 40px'}}>Delivery date</th>
                        <th style={{padding: '5px 40px'}}>Delivery time</th>
                        <th style={{padding: '5px 40px'}}>Material price</th>
                        <th style={{padding: '5px 40px'}}>Material quantity</th>
                        <th style={{padding: '5px 40px'}}>Material type</th>
                        <th style={{padding: '5px 40px'}}>Payment method</th>
                        <th style={{padding: '5px 40px'}}>Total price</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {movements?.map((movement) => (
                        <tr key={movement.id}>
                            <td style={{padding: '5px 40px'}}>{movement.id}</td>
                            <td style={{padding: '5px 40px'}}>{movement.condition}</td>
                            <td style={{padding: '5px 40px'}}>
                                <Link to={`/view-request/${movement.request_id}`} className="btn btn-outline-success">
                                    Show request
                                </Link>
                            </td>
                            {values?.UserInfo?.role === 'company' ?
                                <td style={{padding: '5px 40px'}}>
                                    <Link to={`/view-station/${ movement.station_id}`} className="btn btn-outline-success">
                                        Show station
                                    </Link>
                                </td>
                                : null
                            }


                            <td style={{padding: '5px 40px'}}>{movement.date.split('T')[0]}</td>
                            <td style={{padding: '5px 40px'}}>{movement.city}</td>
                            <td style={{padding: '5px 40px'}}>{movement.delivery_address}</td>
                            <td style={{padding: '5px 40px'}}>{movement.delivery_date.split('T')[0]}</td>
                            <td style={{padding: '5px 40px'}}>{movement.delivery_time}</td>
                            <td style={{padding: '5px 40px'}}>
                                {values?.UserInfo?.role === 'company' ? movement.material_price : String((Number(movement.material_price) / (1 - Number(movement.profit_ratio))).toFixed(3)).slice(0, -1)}
                            </td>
                            <td style={{padding: '5px 40px'}}>{movement.material_quantity}</td>
                            <td style={{padding: '5px 40px'}}>{movement.material_type}</td>
                            <td style={{padding: '5px 40px'}}>{movement.payment_method}</td>
                            <td style={{padding: '5px 40px'}}>
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