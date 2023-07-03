import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import './../../CSS/Portfolios.css'
import Slider from '@mui/material/Slider';
import Select from 'react-select'
import { Link } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';
import makeAnimated from 'react-select/animated';
import api from '../../AxiosConfig/contacts';
import Loader from '../Website/General/Loader';
import Unauthorized from '../Website/General/Unauthorized';
import UserAvatar from '../Website/util/UserAvatar'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


export default function Portfolio() {

    function notify(toastMessage, toastType) {
        toast(toastMessage, {
            type: toastType
        })
    };

    const [open, setOpen] = useState(false);
    const [unauthorizedError, setUnauthorizedError] = useState(false);
    const [passwordMode, setPasswordMode] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);


    const values = useContext(Context);
    const [state, forceUpdate] = useReducer((x) => x + 1, 0);

    const animatedComponents = makeAnimated();
    const [isEdit, setIsEdit] = useState(true);
    const [selectedWasteInfoType, setSelectedWasteInfoType] = useState();
    const [errorInput, setErrorInput] = useState(false);

    const [user, setUser] = useState();
    const fileInputRef = useRef(null);

    const options = [
        { label: 'Paper', value: 'paper' },
        { label: 'Cardboard', value: 'cardboard' },
        { label: 'Plastic', value: 'plastic' },
        { label: 'Glass', value: 'glass' },
        { label: 'Metal', value: 'metal' },
        { label: 'Electronics', value: 'electronics' },
        { label: 'Textiles', value: 'textiles' },
        { label: 'Batteries', value: 'batteries' },
        { label: 'Textiles', value: 'textiles' },
        { label: 'Oils', value: 'oils' },
    ];

    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = (event) => {
        event.preventDefault();
        setOpen(false);
    };


    function handlePasswordMode() {
        setPasswordMode(!passwordMode);
    }

    async function getUser() {
        if (!values.UserInfo || !values.UserInfo.role || !values.UserInfo.id) {
            setUnauthorizedError(true);
            return;
        }

        try {
            const res = await api.get(`${values.UserInfo.role === "company" ? "company" : "station"}/${values.UserInfo.id}`);
            setUser(res.data[0]);
            const arrWasteType = res.data[0].waste_info_type?.map((value) => ({
                label: value.charAt(0).toUpperCase() + value.slice(1),
                value: value,
            }));
            setSelectedWasteInfoType(arrWasteType);
        } catch (error) {
            console.log(error);
            setUnauthorizedError(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    function checkUsername(name) {

        const patternUesrName = /^[a-zA-Z0-9]+$/;

        if (name === "") {
            return false;
        }
        else if (!patternUesrName.test(name)) {
            return false;
        } else {
            return true;
        }
    }

    function checkPhone(phone) {


        const patternPhone = /^07\d{8}$/;

        if (phone === "") {
            return false;
        } else if (!patternPhone.test(phone)) {
            return false;
        } else {
            return true;
        }
    }

    function checkAddress(address) {

        if (address === "") {
            return false;
        } else {
            return true;
        }
    }

    function checkEmail(email) {

        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;

        if (email === "") {
            return false;
        } else if (!patternEmail.test(email)) {
            return false;
        } else {
            return true;
        }
    }

    function checkPassword(password) {
        // more than 8 characters, with at least 1 number, uppercase, and special characters.
        const patternPassword =
            /^(?=.*[A-Z]?)(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;

        if (password === "") {
            return false;
        } else if (!patternPassword.test(password)) {
            return false;
        } else {
            return true;
        }
    }

    function checkBusinessType(businessType) {

        if (businessType === "") {
            return false;
        } else {
            return true;
        }
    }

    function checkOrganizationName(organizationName) {

        if (organizationName === "") {
            return false;
        } else {
            return true;
        }
    }

    function checkWasteInfoType(selectedArray) {
        if (selectedArray.length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    function handleWasteInfoType(selected) {
        const wasteInfoType = Array.isArray(selected) ? selected : [];

        const valueTypes = wasteInfoType.map((type) => type.value);
        setUser({ ...user, waste_info_type: valueTypes })

    }

    function checkWasteInfoRange(wasteInfoRange) {

        if (wasteInfoRange <= 0 || wasteInfoRange > 1000) {
            return false;
        } else {
            return true;
        }
    }

    function handleEdit(event) {
        event.preventDefault();

        setIsEdit(!isEdit)
        setErrorInput(false);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        delete user.avatar_image;
        handleClose(event);

        const username = checkUsername(user.username)
        const phone = checkPhone(user.phone)
        const email = checkEmail(user.email)
        const address = checkAddress(user.address)
        const businessType = checkBusinessType(user.business_type)
        const organizationName = checkOrganizationName(user.organization_name)
        const wasteInfoRange = checkWasteInfoRange(user.waste_info_range)
        const wasteInfoType = checkWasteInfoType(user.waste_info_type)
        const password = checkPassword(user.password);

        if (
            username &&
            phone &&
            email &&
            businessType &&
            address &&
            organizationName &&
            wasteInfoType &&
            wasteInfoRange &&
            password
        ) {
            await sendDataToServer();
        } else {
            setErrorInput([
                { status: username, message: 'The username must not contain a space' },
                { status: phone, message: 'You must enter a valid phone number that starts with 07 and does not exceed 10 digits' },
                { status: email, message: 'Invalid email' },
                { status: address, message: 'You must enter a valid address' },
                { status: businessType, message: 'You must enter the type of business' },
                { status: organizationName, message: 'You must enter an organization name' },
                { status: wasteInfoRange, message: 'You must enter the amount of waste' },
                { status: wasteInfoType, message: 'Waste type must be entered' },
                { status: password, message: 'Incorrect password' },
            ])
        }
    }

    async function sendDataToServer() {

        try {
            const res = await api.put(`/${values.UserInfo.role === "company" ? "company" : "station"}`, user);

            setIsEdit(!isEdit)
            setErrorInput(false);
            getUser();
            notify('Your data has been modified successfully', 'success')
        } catch (err) {
            if (err.response.status === 400)
                setErrorInput([{ status: false, message: 'Incorrect password.' },])
            else
                setErrorInput([{ status: false, message: 'Something went wrong, please try again later.' },])
        }
    }

    const cancelChangeImage = () => {
        fileInputRef.current.value = null;
        setSelectedImage(null)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        // Check if the file size exceeds the limit (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size exceeds the limit of 5MB');
            return;
        }
        setSelectedImage(file);
    };

    const handleImageSubmit = async (event) => {
        event.preventDefault();

        if (!selectedImage) {
            alert('No image selected');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const res = await api.put(`/upload_avatar_image`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            cancelChangeImage();

            values.forceUpdate();

        } catch (err) {
            setErrorInput([{ status: false, message: 'Something went wrong, please try again later.' }]);
            console.log(err);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    if (unauthorizedError) {
        return (
            <Unauthorized />
            
        )
    }
    
    else if (!user && !unauthorizedError){
        return (
            <Loader />
        )
    }

    return (
        <>
            <ToastContainer />
            <main>
                <section className="container-portfilio">
                    <div className="title">
                        <h1 className="text-first-color fw-bold">Profile <span className="text-second-color">Personally</span></h1>
                    </div>
                    <section className="container-form">
                        <div className="container-xl px-4 mt-4">
                            <nav className="nav nav-borders">
                                <Link to={'/product-portfolio'} className="nav-link active ms-0" >Profile</Link>
                                <Link to={'/security'} className="nav-link">Security</Link>
                            </nav>
                            <hr className="mt-0 mb-4" />
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-header">Profile Picture</div>
                                        <div className="card-body text-center">
                                            <UserAvatar style={'img-account-profile rounded-circle mb-2 d-inline'} state={state} selectedImage={selectedImage} />

                                            <div className="small font-italic mb-4">JPG or PNG no larger than 5 MB</div>

                                            <div className="md-button">

                                                <form onSubmit={handleImageSubmit}>
                                                    <input
                                                        type="file"
                                                        name="image"
                                                        ref={fileInputRef}
                                                        className='d-none'
                                                        onChange={handleImageChange}
                                                    />
                                                    <div>
                                                        <button className="button text-center first-btn"
                                                            type={`${fileInputRef.current && fileInputRef.current.files.length > 0 ? 'submit' : 'button'}`}
                                                            onClick={fileInputRef.current && fileInputRef.current.files.length > 0 ? null : handleButtonClick}
                                                        >

                                                            {fileInputRef.current && fileInputRef.current.files.length > 0 ? 'Save' : 'Upload new image'}
                                                        </button>

                                                        {fileInputRef.current && fileInputRef.current.files.length > 0 &&
                                                            <button className="button text-center first-btn mt-3 m-sm-3"
                                                                type={'button'}
                                                                onClick={cancelChangeImage}
                                                            >
                                                                Cancel
                                                            </button>

                                                        }
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="card mb-4">
                                        <div className="card-header">Account Details</div>
                                        <div className="card-body">
                                            <form onSubmit={isEdit ? null : handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputUsername">Username (how your name will appear to other users on the site)</label>
                                                    <input disabled={isEdit} onChange={(event) => { setUser({ ...user, username: event.target.value }) }} className="form-control" id="inputUsername" type="text" defaultValue={user?.username} />
                                                </div>
                                                <div className="row gx-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                                        <input disabled={isEdit} onChange={(event) => { setUser({ ...user, email: event.target.value }) }} className="form-control" id="inputEmailAddress" type="email" defaultValue={user?.email} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                                                        <input disabled={isEdit} onChange={(event) => { setUser({ ...user, phone: event.target.value }) }} className="form-control" id="inputPhone" type="tel" defaultValue={user?.phone} />
                                                    </div>
                                                </div>

                                                <hr className="line" />

                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="inputOrgName">Organization name</label>
                                                    <input disabled={isEdit} onChange={(event) => { setUser({ ...user, organization_name: event.target.value }) }} className="form-control" id="inputOrgName" name="OrganizationName" type="text" defaultValue={user?.organization_name} />
                                                </div>
                                                <div className="row gx-3 mb-3">
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputScopeOfBusiness">Business type</label>
                                                        <input disabled={isEdit} onChange={(event) => { setUser({ ...user, business_type: event.target.value }) }} className="form-control" id="inputScopeOfBusiness" type="text" name="ScopeOfBusiness" defaultValue={user?.business_type} />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="small mb-1" htmlFor="inputLocation">Address</label>
                                                        <input disabled={isEdit} onChange={(event) => { setUser({ ...user, address: event.target.value }) }} className="form-control" id="inputLocation" type="text" defaultValue={user?.address} />
                                                    </div>
                                                </div>

                                                <hr className="line" />

                                                <div class={`${isEdit ? '' : 'row gx-3'} mb-3`}>

                                                    <div className={`select ${isEdit ? '' : ''}`}>
                                                        <label
                                                            className="small mb-1"
                                                            htmlFor="inputBirthday"
                                                        >
                                                            {values.UserInfo.role === "company" ? "Type of waste produced" : "Type of waste accepted"}
                                                        </label>
                                                        {
                                                            !isEdit ?
                                                                <Select
                                                                    defaultValue={selectedWasteInfoType}
                                                                    className="custom-select"
                                                                    closeMenuOnSelect={false}
                                                                    components={animatedComponents}
                                                                    isMulti
                                                                    options={options}
                                                                    onChange={handleWasteInfoType}
                                                                />

                                                                :
                                                                <div className="mt-2" data-aos="fade-up-left" data-aos-duration="3000">
                                                                    <div className="waste-types justify-content-center about-content">
                                                                        {user?.waste_info_type?.map((item, index) => {
                                                                            return (
                                                                                <div key={index} className="waste-type" data-aos="zoom-in-down">{item}</div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                        }
                                                    </div>

                                                    <div className="text-center mt-3">
                                                        <label className="small mb-1 text-center" htmlFor="inputRange">
                                                            {values.UserInfo.role === "company" ? 'The amount of waste produced per week (KG) ' : 'Station capacity per day (KG)'}</label>
                                                        {!isEdit ?
                                                            <>
                                                                <Slider onChange={(event) => { setUser({ ...user, waste_info_range: event.target.value }) }}
                                                                    id="inputRange"
                                                                    defaultValue={user?.waste_info_range}
                                                                    min={0}
                                                                    max={1000}
                                                                    aria-label="Default"
                                                                    valueLabelDisplay="auto"
                                                                    color='success'
                                                                />
                                                                <p>{user?.waste_info_range} KG</p>
                                                            </>
                                                            :
                                                            <p className='text-center'>{user?.waste_info_range} KG</p>
                                                        }

                                                    </div>
                                                </div>
                                                <div className="md-button flex-col">
                                                    <button
                                                        onClick={handleEdit}
                                                        type={'button'}
                                                        className="button text-center first-btn">
                                                        {isEdit ? 'Edit information' : 'Cancel'}
                                                    </button>
                                                    {!isEdit &&
                                                        <>
                                                            <button
                                                                onClick={handleClickOpen}
                                                                className="button text-center first-btn ms-3">
                                                                Save
                                                            </button>
                                                            <div>
                                                                <Dialog open={open} onClose={handleClose}>
                                                                    <DialogTitle color="success">confirm password</DialogTitle>
                                                                    <DialogContent>
                                                                        <DialogContentText>
                                                                            Please enter the password to continue the process.
                                                                        </DialogContentText>

                                                                        <div className="input-field mb-2 mt-2 password">
                                                                            <input onChange={(event) => { setUser({ ...user, password: event.target.value }) }} className="form-control" id="password" type={passwordMode ? 'password' : 'text'} />
                                                                            <span className="eye mb-4" onClick={handlePasswordMode}>
                                                                                <i className={`fas fa-eye ${passwordMode ? 'd-block' : 'd-none'}`} id="showEye" />
                                                                                <i className={`fas fa-eye-slash ${passwordMode ? 'd-none' : 'd-block'}`} id="hideEye" />
                                                                            </span>
                                                                            <span className="error-Massage"></span>
                                                                        </div>
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button color="success" onClick={handleClose}>Cancel</Button>
                                                                        <Button color="success" onClick={handleSubmit}>save</Button>
                                                                    </DialogActions>
                                                                </Dialog>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </form>
                                        </div>

                                        {
                                            errorInput &&
                                            <mark className="rounded-4 m-4 p-3">
                                                <div style={{ fontSize: "smaller", fontFamily: "monospace" }}>
                                                    {
                                                        errorInput?.map((error, index) => {
                                                            if (!error.status) {
                                                                return (
                                                                    <p key={index}>{error.message}</p>
                                                                );
                                                            }
                                                            return null;
                                                        })
                                                    }
                                                </div>
                                            </mark>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                    <section className="Trans-Eval-info">

                        <div className="circles">

                            <div className="circle-card text-center">
                                <div>
                                    <p className="text-bold-color fw-bold">Successful operations</p>
                                    <div className="hr">
                                        <hr className="line" />
                                    </div>
                                </div>
                                <div className="percent">
                                    <div className="dot"></div>
                                    <svg>
                                        <circle cx="70" cy="70" r="70"></circle>
                                        <circle cx="70" cy="70" r="70"></circle>
                                    </svg>
                                    <div className="number">
                                        <h2>85<span></span></h2>
                                    </div>
                                </div>
                            </div>

                            <div className="circle-card text-center">
                                <div>
                                    <p className="text-bold-color fw-bold">Evaluation</p>
                                    <div className="hr">
                                        <hr className="line" />
                                    </div>
                                </div>
                                <div className="percent">
                                    <div className="dot"></div>
                                    <svg>
                                        <circle cx="70" cy="70" r="70"></circle>
                                        <circle cx="70" cy="70" r="70"></circle>
                                    </svg>
                                    <div className="number">
                                        <h2>4<span></span></h2>
                                        <div>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="circle-card text-center">
                                <div>
                                    <p className="m-0 text-bold-color fw-bold">Goal achievement</p>
                                    <p className="text-bold-color fw-bold">this year</p>
                                    <div className="hr">
                                        <hr className="line" />
                                    </div>
                                </div>
                                <div className="percent">
                                    <div className="dot"></div>
                                    <svg>
                                        <circle cx="70" cy="70" r="70"></circle>
                                        <circle cx="70" cy="70" r="70"></circle>
                                    </svg>
                                    <div className="number">
                                        <h2>70<span>%</span></h2>
                                    </div>
                                </div>
                            </div>

                            <div className="circle-card text-center">
                                <div>
                                    <p className="m-0 text-bold-color fw-bold">Material delivered</p>
                                    <p className="text-bold-color fw-bold">this month</p>
                                    <div className="hr">
                                        <hr className="line" />
                                    </div>
                                </div>

                                <div className="percent">
                                    <div className="dot"></div>
                                    <svg>
                                        <circle cx="70" cy="70" r="70"></circle>
                                        <circle cx="70" cy="70" r="70"></circle>
                                    </svg>
                                    <div className="number">
                                        <h2>1000<span>KG</span></h2>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>
                </section>
            </main>
        </>
    )
}
