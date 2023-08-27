import React, { useContext, useEffect, useState } from 'react'
import './../../../CSS/Add-Show-request.css'
import { useParams } from 'react-router-dom';
import { Context } from '../../../Context/AuthContext';
import api from '../../../AxiosConfig/contacts';
import Loader from './Loader';
import Unauthorized from './Unauthorized';
import staticImage from './../../../Images/static.jpg'
import TableModal from '../util/TableModal'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewPost() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    function notify(toastMessage, toastType) {
        toast(toastMessage, {
            type: toastType
        })
    };

    const values = useContext(Context);


    const [station, setStation] = useState();
    const [companyRequests, setCompanyRequests] = useState();
    const [requestId, setRequestId] = useState(false);

    const [listMaterialsAndPrices, setListMaterialsAndPrices] = useState();
    console.log("🚀 ~ file: ViewStation.jsx:32 ~ ViewPost ~ listMaterialsAndPrices:", listMaterialsAndPrices)
    const [modal, setModle] = useState('')
    const [modalImg, setModalImg] = useState('');
    const [stationImage, setStationImage] = useState();
    const [loading, setLoading] = useState(false);
    const [showApply, setShowApply] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');


    const stationId = useParams('id');


    function handelGallery(event) {
        if (event.target.tagName === 'IMG') {
            setModle('block');
            setModalImg(event.target.src);
        }
    };

    async function getStation() {
        try {
            const response = await api.get(`/station/${stationId.id}`);
            setStation(response.data[0]);

            const arrayPrice = response.data[0].list_materials_and_prices?.map((jsonString) => JSON.parse(jsonString));
            
            setListMaterialsAndPrices(arrayPrice);
        } catch (error) {
            console.error(error);
        }
    }

    async function getCompanyRequest() {
        try {
            const response = await api.get(`/request`);
            setCompanyRequests(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    function setImages() {

        let imagesTag = <img src={staticImage} alt="station images" />;

        if (station?.avatar_image) {
            const buffer = station.avatar_image.data;

            let binary = "";
            const bytes = new Uint8Array(buffer);
            const len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }

            const b64 = btoa(binary);
            imagesTag = <img src={`data:image/*;base64,${b64}`} alt="station images" />

        }

        setStationImage(imagesTag)
    }

    async function handelApplyRequest() {

        if (!requestId) {
            setErrorMessage('Please choose request!');
            return;
        }

        try {
            setLoading(true);
            const res = await api.post(`/company_movement/`, { request_id: requestId, station_id: stationId.id });
            console.log(res)
            setLoading(false);
            setShowApply(false);
            notify('The submission was successful. You will be notified if it is accepted in your Movements list', 'success');

        } catch (err) {
            console.log(err)
            setLoading(false);
            setShowApply(false);

            if (err.response.status === 406) {
                notify('This request has already been applying!', 'warning');
            }
        }
    }

    function handelCloseApply() {
        setShowApply(false)
    }

    function handelShowApply() {
        setShowApply(true)
    }

    useEffect(() => {
        getStation();
        getCompanyRequest();
    }, [])

    useEffect(() => {
        setImages();
    }, [station])
    
    if (!station || loading) {
        return <Loader />
    }

    if (values.UserInfo?.role !== 'company') {
        return <Unauthorized />
    }


    return (
        <>
            <ToastContainer />
            <main className="container-fluid row justify-content-center align-items-center m-0 p-0">
                <section className="col-12 hero-card">
                    <h1 className="hero-text-card">Show  Station</h1>
                </section>
                <section className="container-fluid col-12 row my-5 py-4 justify-content-center container-show-request p-0">
                    <div className="">
                        <div style={{ cursor: "pointer" }} onClick={(e) => handelGallery(e)} class="station-image row justify-content-center" >
                            {stationImage}
                        </div>

                        <div className="col-12 text-center mt-3">
                            <p class="main-color text-center info">{station.organization_name}</p>
                        </div>
                    </div>
                    <hr className="line" />
                    <div className="row gx-3 mb-3">
                        <div className="col-12 text-center">
                            <h6 id="organizationName" className="col-12 text-bold-color" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
                                Business Type :
                            </h6>
                            <p class="main-color text-center info">{station.business_type}</p>
                        </div>
                    </div>
                    <div className="row gx-3">
                        <div className="col-md-6">

                            <div className="select mb-3">
                                <h6 className="text-font text-bold-color">
                                    Acceptable material type :
                                </h6>
                                <div className="waste-types justify-content-center about-content">

                                    {station.waste_info_type?.map((element) => <p className="waste-type">{element}</p>)}

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 justify-content-center">
                            <h6 className="text-font text-bold-color">
                                Condition :
                            </h6>
                            <div className='waste-types justify-content-center about-content'>
                                <label className='label-card' style={{ color: station.condition ? "var(--main-color)" : "#f00", borderColor: station.condition ? "var(--main-color)" : "#f00" }}>
                                    {station.condition ? "Available" : "Unavailable"}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <h6 className="text-font text-bold-color">
                                address :
                            </h6>
                            <p class="main-color text-center info">{station.address}</p>
                        </div>
                        <div className="col-md-6">
                            <h6
                                id="quantity"
                                className="text-font text-bold-color"
                                htmlFor="quantity"
                            >
                                Capacity per day - KG :
                            </h6>
                            <p class="main-color text-center info">{station.waste_info_range}</p>
                        </div>
                    </div>
                    <div onClick={() => setModle('none')} className="modal" style={{ display: modal }}>
                        <img src={modalImg} className="modal-content" style={{ display: modalImg }} />
                    </div>

                    <hr className="line" />

                    <div className="container">
                        <div className="button-container">
                            <div className="md-button">
                                <button onClick={handelShowApply} className="button p-0">
                                    Apply
                                </button>
                                {/* <Link className="button p-0" to={`/send-capture-request/${station.station_id}`}>
                                </Link> */}
                            </div>
                            <TableModal materialTypeList={listMaterialsAndPrices} />
                        </div>
                    </div>
                </section>
            </main>
            <div>
                <Dialog open={showApply} onClose={handelCloseApply}>
                    <DialogTitle color="success">Chose the request</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the request that you want to apply for.
                        </DialogContentText>

                        <div className="input-field mb-2 mt-2 password">

                            <select
                                onChange={(event) => { setRequestId(event.target.value) }}
                                required
                                id="TypeOfWaste"
                                className="form-select form-control"
                            >
                                <option value="" >
                                    Choose Request
                                </option>

                                {companyRequests?.map((request) => {
                                    return (
                                        <>
                                            <label>{request.title}</label>
                                            <option value={request.requests_id}>{request.title}</option>
                                        </>
                                    )
                                })}

                            </select>

                            <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{errorMessage}</span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="success" onClick={handelCloseApply}>Cancel</Button>
                        <Button color="success" onClick={handelApplyRequest}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}
