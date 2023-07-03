import React, { useContext, useEffect, useState } from 'react'
import './../../../CSS/Add-Show-request.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../../Context/AuthContext';
import api from '../../../AxiosConfig/contacts';
import Loader from './Loader';
import SliderPost from "../util/SliderPost";
import Unauthorized from './Unauthorized';
import Confirm from '../util/Confirm';
import Alert from '../util/Alert';
import staticImage from './../../../Images/static.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewPost() {
    function notify(toastMessage, toastType) {
        toast(toastMessage, {
            type: toastType
        })
    };

    const [request, setRequest] = useState();
    const values = useContext(Context);
    const navigate = useNavigate();

    const [modal, setModle] = useState('')
    const [modalImg, setModalImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [ConfirmShow, setConfirmShow] = useState(false);
    const [AlertShow, setAlertShow] = useState(false);
    const [imagesSlider, setImagesSlider] = useState();

    const requestId = useParams('id');

    function handelGallery(event) {
        if (event.target.tagName === 'IMG') {
            setModle('block');
            setModalImg(event.target.src);
        }
    };

    async function getRequest() {
        try {
            const response = await api.get(`/${values.UserInfo.role === 'company' ? 'request' : 'getRequestByID'}/${requestId.id}`);
            setRequest(response.data[0]);

        } catch (error) {
            console.error(error);
        }
    }

    function setImages() {

        let imagesTag = [<img src={staticImage} alt="request images" />];

        if (request?.images.length !== 0) {
            imagesTag = request?.images.map((img) => {
                const buffer = img[0].data;

                let binary = "";
                const bytes = new Uint8Array(buffer);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }

                const b64 = btoa(binary);

                return (
                    <img src={`data:image/*;base64,${b64}`} alt="aa" />
                )
            })
        }

        setImagesSlider(imagesTag)
    }

    function handelCloseRequest() {
        setConfirmShow(false)
    }

    async function handelDeleteRequest() {
        try {
            setLoading(true);
            const res = await api.delete(`/request/${requestId.id}`,);

            setLoading(false);
            setConfirmShow(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            console.log(err)
            setConfirmShow(false)
        }
    }

    function handelConfirm() {
        setConfirmShow(true)
    }

    async function handelInterestedStation() {
  
        try {
            const resMovement = await api.post(`/station_movement`, { request_id: request.requests_id, company_id: request.company_id });

            notify('Your interest has been sent successfully', 'success');
        } catch (error) {
            console.error(error);

            if (error.response.status === 406) {
                notify('You have already expressed interest in the request', 'warning');
            }
        }

    }

    useEffect(() => {
        getRequest();
    }, [])

    useEffect(() => {
        setImages();
    }, [request])

    if (values.UserInfo?.role !== 'company' && values.UserInfo?.role !== 'station') {
        return <Unauthorized />
    }

    if (!request || loading) {
        return <Loader />
    }

    return (
        <>
            <ToastContainer />
            <Confirm show={ConfirmShow} buttonMessageReject={'No, Keep it'} buttonMessageResolve={'Ok, Delete it'} handleFunctionReject={handelCloseRequest} handleFunctionResolve={handelDeleteRequest} title={'Are you sure to delete this request?'} message={'With your acceptance, you are about to delete the application permanently, it cannot be retrieved, and if there was an active transaction on the application, it will remain effective and in progress'} />
            <main className="container-fluid row justify-content-center align-items-center m-0 p-0">
                <section className="col-12 hero-card">
                    <h1 className="hero-text-card">Show a request</h1>
                </section>
                <section className="container-fluid col-12 row my-5 py-4 justify-content-center container-show-request p-0">
                    <div className="">
                        <div onClick={(e) => handelGallery(e)} class="post-image" >
                            <SliderPost blocks={imagesSlider} />
                        </div>

                        <div className="col-12 text-center mt-3">
                            <p class="main-color text-center info">{request.organization_name}</p>
                        </div>
                    </div>
                    <hr className="line" />
                    <div className="row gx-3 mb-3">
                        <div className="col-12 text-center">
                            <h6 id="organizationName" className="col-12 text-bold-color" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
                                Title :
                            </h6>
                            <p class="main-color text-center info">{request.title}</p>
                        </div>
                    </div>
                    <div className="row gx-3">
                        <div className="col-md-6">

                            <div className="select mb-3">
                                <h6 className="text-font text-bold-color">
                                    Material type :
                                </h6>
                                <div className="waste-types justify-content-center about-content">

                                    <p className="waste-type" data-aos="zoom-in-down">{request.material_type}</p>

                                </div>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <h6 className="text-font text-bold-color">
                                Condition :
                            </h6>
                            <p class="main-color text-center info">{request.condition}</p>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <h6 className="text-font text-bold-color">
                                Location :
                            </h6>
                            <p class="main-color text-center info">{request.location}</p>
                        </div>
                        <div className="col-md-6">
                            <h6
                                id="quantity"
                                className="text-font text-bold-color"
                                htmlFor="quantity"
                            >
                                Quantity - KG :
                            </h6>
                            <p class="main-color text-center info">{request.quantity}</p>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-12 ">
                            <h6 id="additionalInformation" className="text-font text-bold-color">
                                Additional information :
                            </h6>
                            <p class="main-color text-center info" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>{request.additional_info}</p>
                        </div>
                    </div>
                    <div onClick={() => setModle('none')} className="modal" style={{ display: modal }}>
                        <img src={modalImg} className="modal-content" style={{ display: modalImg }} />
                    </div>

                    <hr className="line" />

                    {values.UserInfo.role === 'company' ?

                        <div className="container">
                            <div className="button-container">
                                <div className="md-button">
                                    <Link className="button p-0" to={`/edit-request/${requestId.id}`}>
                                        <button className="button p-0">
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                                <button onClick={handelConfirm} class="Delete-button"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                            </div>
                        </div>
                        :
                        <div className="container">
                            <div className="button-container">
                                <div className="md-button">
                                    <button onClick={handelInterestedStation} className="button p-0">
                                        Interested
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                </section>
            </main>
        </>
    )
}
