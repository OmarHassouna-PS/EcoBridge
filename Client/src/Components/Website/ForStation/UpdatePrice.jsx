import React, { useRef, useState, useEffect, useContext, useReducer } from 'react'
import { Context } from '../../../Context/AuthContext';
import '../../../CSS/Add-Show-request.css'
import api from '../../../AxiosConfig/contacts';
import Unauthorized from './../../Website/General/Unauthorized'
import Loader from './../../Website/General/Loader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddRequest() {
    const values = useContext(Context);

    const [state, forceUpdate] = useReducer((x) => x + 1, 0);

    function notify(toastMessage, toastType) {
        toast(toastMessage, {
            type: toastType
        })
    };

    const [list, setList] = useState();
    const [profitInfo, setProfitInfo] = useState();

    const [loading, setLoading] = useState(false);

    async function getProfitRatio() {

        try {

            const response = await api.get(`/get_profit_ratio/${process.env.REACT_APP_PROFIT_INFO}`);

            setProfitInfo(response.data[0].profit_percentage);

        } catch (error) {
            console.error(error);
        }
    }

    async function getStation() {

        if (!values?.UserInfo?.id) return;
        
        try {

            const response = await api.get(`/station/${values.UserInfo.id}`);
            const data = response.data[0].list_materials_and_prices;

            const parsedData = data.map((jsonString) => JSON.parse(jsonString));

            setList(parsedData);
            forceUpdate();

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProfitRatio();
        getStation();
    }, [values])

    async function handleSubmitAdd(event) {
        event.preventDefault();

        setLoading(true);

        try {
            const response = await api.post(`/update_price`, { list: list });

            notify('Material prices have been updated successfully', 'success');
            setLoading(false);
            getStation();
        } catch (err) {
            setLoading(false);
            console.log(err)
        }
    }

    const handlePriceChange = (value, index) => {

        const updatedList = [...list];
        const updatedItem = { ...updatedList[index] };
        updatedItem.price = value;
        updatedList[index] = updatedItem;
        setList(updatedList);
    };

    const handleWeightUnitChange = (value, index) => {
        const updatedList = [...list];
        const updatedItem = { ...updatedList[index] };
        updatedItem.weightUnit = value;
        updatedList[index] = updatedItem;
        setList(updatedList);
    };

    if (values.UserInfo?.role != 'station') {
        return (
            <Unauthorized />
        )
    }

    else if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <ToastContainer />
            <main className="container-fluid row justify-content-center align-items-center m-0 p-0">
                <section className="col-12 hero-card">
                    <h1 className="hero-text-card">Update Materials Price </h1>
                </section>

                <section className="container-fluid col-12 row justify-content-center my-5 py-4 container-show-request">
                    <form onSubmit={handleSubmitAdd} className="row justify-content-center">
                        <p className="col-12 text-start text-font black-color">
                            Please check prices and weight units before saving information.
                        </p>
                        <div className="row gx-3 mb-3">
                            <div className="col-12">


                                <div className="container">
                                    <div className="row justify-content-center">
                                        {list?.map((item, index) => (
                                            <div key={index} className='row gap-3 mb-3'>
                                                <div className="col-lg-4 col-md-12">
                                                    <p className="waste-type m-0 text-center">{item.materialType}</p>
                                                </div>
                                                <div className="col-lg-4 col-md-12">
                                                    <input
                                                        className="form-control"
                                                        value={item.price}
                                                        onChange={(e) => handlePriceChange(e.target.value, index)}
                                                        type="number"
                                                        name="ConditionWast"
                                                        placeholder='Price'
                                                    />
                                                </div>
                                                <div className="col-lg-3 col-md-12">
                                                    <select
                                                        value={item.weightUnit}
                                                        onChange={(e) => handleWeightUnitChange(e.target.value, index)}
                                                        required
                                                        className="form-select form-control"
                                                    >
                                                        <option value="" disabled>
                                                            Choose weight Unit
                                                        </option>
                                                        <option value="KG">KG</option>
                                                        <option value="T">T</option>
                                                        <option value="L">L</option>
                                                    </select>
                                                </div>
                                                <hr className='line' />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md-button row col-sm-3  justify-content-center">

                            <button type="submit" className="button p-0">
                                Save
                            </button>
                        </div>
                    </form>
                    <span className="error-Massage text-center " style={{ color: 'red', fontSize: '13px' }}></span>
                </section>
            </main>
        </>
    )
}
