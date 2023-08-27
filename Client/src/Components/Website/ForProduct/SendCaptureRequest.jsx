import React, { useContext, useEffect, useState } from 'react'
import '../../../CSS/Add-Show-request.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../../../Context/AuthContext';
import api from '../../../AxiosConfig/contacts';
import Unauthorized from './../../Website/General/Unauthorized';
import Loader from './../../Website/General/Loader';
import Alert from '../util/Alert';

export default function SendCaptureRequest() {

    
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
    function notify(toastMessage, toastType) {
        toast(toastMessage, {
            type: toastType
        })
    };

    const values = useContext(Context);
    const movementId = useParams('id')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [requestInfo, setRequestInfo] = useState(false);

    const [captureRequestInfo, setCaptureRequestInfo] = useState({
        city: '',
        delivery_address: '',
        delivery_date: '',
        delivery_time: '',
        Account_number: '',
        payment_method: '',
        movement_id: movementId.id
    });

    const [errors, setErrors] = useState({
        city: '',
        delivery_address: '',
        delivery_date: '',
        delivery_time: '',
        Account_number: '',
        payment_method: ''
    });


    async function getInfo() {

        if (!values?.UserInfo?.id) return;

        try {
            setLoading(true);

            const res = await api.get(`/details_capture_request_process/${movementId.id}`);
            setRequestInfo(res.data)

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);

            if (error.response.status === 406) {
                setError(error.response.data.message)
                setShowAlert(true)
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let formIsValid = true;

        const newErrors = {
            city: '',
            delivery_address: '',
            delivery_date: '',
            delivery_time: '',
            Account_number: '',
            payment_method: '',
            submit: ''
        };

        if (captureRequestInfo.city.trim() === '') {
            formIsValid = false;
            newErrors.city = 'A city is required';
        }

        if (captureRequestInfo.delivery_address.trim() === '') {
            formIsValid = false;
            newErrors.delivery_address = 'You must enter a delivery address';
        }

        if (captureRequestInfo.delivery_date.trim() === '') {
            formIsValid = false;
            newErrors.delivery_date = 'Delivery date is required';
        }

        if (captureRequestInfo.delivery_time.trim() === '') {
            formIsValid = false;
            newErrors.delivery_time = 'Delivery time is required';
        }

        if (captureRequestInfo.Account_number.trim() === '') {
            formIsValid = false;
            newErrors.Account_number = 'Account number is required';
        }

        if (captureRequestInfo.payment_method.trim() === '') {
            formIsValid = false;
            newErrors.payment_method = 'Payment method is required';
        }

        if (formIsValid) {
            try {
                setLoading(true);

                const res = await api.post(`/capture_request`, captureRequestInfo);
                notify('The capture request has been sent successfully', 'success');
                setLoading(false);

            } catch (error) {
                setLoading(false)
                console.error(error);

                if (error.response.status === 406) {
                    setError(error.response.data.message)
                    setShowAlert(true)
                }
            }
        }
        else {
            newErrors.submit = 'Please enter all fields and verify the information';
        }

        setErrors(newErrors);
    }

    async function handleAlert() {
        navigate('/company_movements_history')
    }

    useEffect(() => {
        getInfo();
    }, [values])

    if (error) {

    }
    else if (values.UserInfo?.role !== 'company') {
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
            <Alert show={showAlert} title={'Something wrong'} message={error} buttonMessage={'OK'} handleClick={handleAlert} />
            <main className="container-fluid row justify-content-center align-items-center m-0 p-0">
                <section className="col-12 hero-card">
                    <h1 className="hero-text-card">Send a capture request</h1>
                </section>
                <section className="container-fluid col-12 row justify-content-center my-5 py-4 container-show-request">
                    <form onSubmit={handleSubmit} className="row justify-content-center">
                        <p className="col-12 text-start text-font black-color">
                            Material capture request form.
                        </p>
                        <div className="row gx-3">
                            <div className="col-lg-6">
                                <div className="select mb-4">
                                    <label className="text-font text-bold-color label" htmlFor="city">
                                    <span style={{ color: 'red', fontSize: '13px' }}>*</span>City
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setCaptureRequestInfo({ ...captureRequestInfo, city: e.target.value })}

                                        list="brow" id='city' className="form-select form-control"  />
                                    <datalist id="brow">
                                        <option value="Irbid"></option>
                                        <option value="Ajloun"></option>
                                        <option value="Jerash"></option>
                                        <option value="Mafraq"></option>
                                        <option value="Balqa"></option>
                                        <option value="Amman"></option>
                                        <option value="Zarqa"></option>
                                        <option value="Madaba"></option>
                                        <option value="Karak"></option>
                                        <option value="Tafilah"></option>
                                        <option value="Ma'an"></option>
                                        <option value="Aqaba"></option>
                                    </datalist>
                                    {errors.city && <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{errors.city}</span>}
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <label className="text-font text-bold-color label" htmlFor="delivery_address">
                                <span style={{ color: 'red', fontSize: '13px' }}>*</span>Provide the delivery address
                                </label>
                                <input 
                                    className="form-control"
                                    id="delivery_address"
                                    type="text"
                                    onChange={(e) =>
                                        setCaptureRequestInfo({ ...captureRequestInfo, delivery_address: e.target.value })
                                    }
                                />
                                {errors.delivery_address && (
                                    <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{errors.delivery_address}</span>
                                )}
                            </div>
                        </div>
                        <div className="row gx-3 mb-4">
                            <div className="col-lg-6 mb-3 mb-lg-0">
                                <label className="text-font text-bold-color label" htmlFor="delivery_date">
                                <span style={{ color: 'red', fontSize: '13px' }}>*</span>Select the delivery date
                                </label>
                                <input 
                                    className="form-control"
                                    id="delivery_date"
                                    type="date"
                                    onChange={(e) =>
                                        setCaptureRequestInfo({ ...captureRequestInfo, delivery_date: e.target.value })
                                    }
                                />
                                {errors.delivery_date && <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{errors.delivery_date}</span>}
                            </div>
                            <div className="col-lg-6">
                                <label className="text-font text-bold-color label" htmlFor="delivery_time">
                                <span style={{ color: 'red', fontSize: '13px' }}>*</span>Indicate the delivery time
                                </label>
                                <input 
                                    className="form-control"
                                    id="delivery_time"
                                    type="time"
                                    onChange={(e) =>
                                        setCaptureRequestInfo({ ...captureRequestInfo, delivery_time: e.target.value })
                                    }
                                />
                                {errors.delivery_time && <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{errors.delivery_time}</span>}
                            </div>
                        </div>
                        <div className="row gx-3 mb-4">
                            <div className="col-lg-6 mb-3 mb-lg-0">
                                <label className="text-font text-bold-color label" htmlFor="Account_number">
                                    <span style={{ color: 'red', fontSize: '13px' }}>*</span>Account number
                                </label>
                                <input 
                                    className="form-control"
                                    id="Account_number"
                                    type="number"
                                    onChange={(e) =>
                                        setCaptureRequestInfo({ ...captureRequestInfo, Account_number: e.target.value })
                                    }
                                />
                                {errors.Account_number && (
                                    <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{errors.Account_number}</span>
                                )}
                            </div>
                            <div className="col-lg-6">
                                <label className="text-font text-bold-color label" htmlFor="payment_method">
                                <span style={{ color: 'red', fontSize: '13px' }}>*</span>Payment method
                                </label>
                                <select
                                    
                                    id="payment_method"
                                    className="form-select form-control"
                                    onChange={(e) =>
                                        setCaptureRequestInfo({ ...captureRequestInfo, payment_method: e.target.value })
                                    }
                                >
                                    <option value="" disabled selected>
                                        Choose method
                                    </option>
                                    <option value={'Bank account'}>Bank account</option>
                                    <option value={'Electronic wallet'}>Electronic wallet</option>
                                </select>
                                {errors.payment_method && (
                                    <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{errors.payment_method}</span>
                                )}
                            </div>
                        </div>
                        <div className="row gx-3 mb-3">
                            <div className="col-lg-6">
                                <div className="text-bold-color">Material Quantity : {requestInfo.material_quantity} KG</div>
                                <div className="text-bold-color">Material Type : {requestInfo.material_type}</div>
                                <div className="text-bold-color">Material price per KG : {requestInfo.material_price} JD</div>
                                <hr className='line' />
                                <div className="main-color">The net amount : {requestInfo.total_price} JD</div>
                            </div>
                            <hr className="line" />
                        </div>
                        <form />
                        <div>
                            <p className="black-color">

                                You will receive an e-mail with the details of the process and its status,
                                and we will contact you on your phone number to receive the order.
                            </p>
                        </div>
                        <mark className="rounded-4">
                            <div style={{ fontSize: "smaller", fontFamily: "monospace" }}>
                                <p className="mt-3">Service Agreement:</p>
                                <p>
                                    Payment will be made within 7 days after the delivery process and confirmation of your order by the station.
                                </p>
                                <p>
                                    The delivery service will provide at least 24 hours notice before contacting you.
                                </p>
                                <p>
                                    In the event that the request does not match the information and images on the site,
                                    the product will bear the fees for all fees.
                                    Please see the <Link to={''}>Terms of Service agreement</Link> of service for more information.
                                </p>
                            </div>
                        </mark>
                        <div className="md-button col-sm-3 mt-4">
                            <button type='submit' className="button p-0">Confirmation</button>
                        </div>
                        {errors.submit && (
                            <span className="error-Massage text-center mt-3" style={{ color: 'red', fontSize: '13px' }}>{errors.submit}</span>
                        )}
                    </form>
                </section>
            </main>
        </>
    )
}
