import React, { useContext, useEffect, useState } from 'react'
import './../../CSS/Access.css'
import { Slider } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import api from '../../AxiosConfig/contacts';
import VerifyToken from '../..//Utils/Api/VerifyToken';
import { Context } from '../../Context/AuthContext';


import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function notify(toastMessage, toastType) {
    toast(toastMessage, {
        type: toastType
    })
};

export default function SignUp() {

    const values = useContext(Context);

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem("token") || false;
        if (token) {
            VerifyToken().then((resultUsers) => {
                if (resultUsers) {
                    values.logIn.setIsLog(true);
                    navigate(path);
                }
            });
        }
    }, []);

    const animatedComponents = makeAnimated();

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

    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState("/");
    const [textTheme, setTextTheme] = useState("red");

    const [passwordMode, setPasswordMode] = useState(true);
    const [passwordModeCon, setPasswordModeCon] = useState(true);
    const [selectedUserType, setSelectedUserType] = useState("");

    const [user, setUser] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        businessType: "",
        address: "",
        organizationName: "",
        wasteInfoType: "",
        wasteInfoRange: ""
    });

    const [checkInput, setCheckInput] = useState({
        username: false,
        phone: false,
        email: false,
        password: false,
        confirmPassword: false,
        businessType: false,
        address: false,
        organizationName: false,
        wasteInfoType: false,
        wasteInfoRange: false,
        type: false,
    });

    const [messageWarning, setMessageWarning] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        businessType: "",
        address: "",
        organizationName: "",
        wasteInfoType: "",
        wasteInfoRange: "",
        type: "",
        submit: ""
    });

    function handleUsername(event) {

        setCheckInput({ ...checkInput, username: false });

        const name = event.target.value;
        const patternUesrName = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;

        if (name === "") {
            setMessageWarning({ ...messageWarning, username: "This field is required" });
        }
        else if (!patternUesrName.test(name)) {
            setMessageWarning({
                ...messageWarning, username: `
                    Username can contain letters (both uppercase and lowercase), numbers, underscores, and hyphens.
                    It must start with a letter.
                    It should be 3 to 20 characters long.
            ` });
        } else {
            setMessageWarning({ ...messageWarning, username: "" });
            setUser({ ...user, username: name });
            setCheckInput({ ...checkInput, username: true });
        }
    }

    function handlePhone(event) {

        setCheckInput({ ...checkInput, phone: false });

        const patternPhone = /^07\d{8}$/;
        const phone = event.target.value;

        if (phone === "") {
            setMessageWarning({ ...messageWarning, phone: "This field is required" });
        } else if (!patternPhone.test(phone)) {
            setMessageWarning({ ...messageWarning, phone: "Invalid number" });
        } else {
            setMessageWarning({ ...messageWarning, phone: "" });
            setUser({ ...user, phone: phone });
            setCheckInput({ ...checkInput, phone: true });
        }
    }

    function handleAddress(event) {
        setCheckInput({ ...checkInput, address: false });

        const address = event.target.value;

        if (address === "") {
            setMessageWarning({ ...messageWarning, address: "This field is required" });
        } else {
            setMessageWarning({ ...messageWarning, address: "" });
            setUser({ ...user, address: address });
            setCheckInput({ ...checkInput, address: true });
        }
    }

    function handleEmail(event) {
        setCheckInput({ ...checkInput, email: false });

        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
        const email = event.target.value;

        if (email === "") {
            setMessageWarning({ ...messageWarning, email: "This field is required" });
        } else if (!patternEmail.test(email)) {
            setMessageWarning({ ...messageWarning, email: "Invalid email" });
        } else {
            setMessageWarning({ ...messageWarning, email: "" });
            setUser({ ...user, email: email });
            setCheckInput({ ...checkInput, email: true });
        }
    }

    function handlePasswordMode() {
        setPasswordMode(!passwordMode);
    }

    function handlePasswordModeCon() {
        setPasswordModeCon(!passwordModeCon);
    }

    function handlePassword(event) {
        // more than 8 characters, with at least 1 number, uppercase, and special characters.
        const patternPassword =
            /^(?=.*[A-Z]?)(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        setCheckInput({ ...checkInput, password: false });
        const password = event.target.value;

        if (password === "") {
            setMessageWarning({ ...messageWarning, password: "This field is required" });
        } else if (!patternPassword.test(password)) {
            setMessageWarning({
                ...messageWarning,
                password:
                    "Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters",
            });
        } else {
            setMessageWarning({ ...messageWarning, password: "" });
            setUser({ ...user, password: password });
            setCheckInput({ ...checkInput, password: true });
        }
    }

    function handleConfirmPassword(event) {
        const password = event.target.value;

        setCheckInput({ ...checkInput, confirmPassword: false });

        if (password === "") {
            setMessageWarning({ ...messageWarning, confirmPassword: "This field is required" });
        } else if (password !== user.password) {
            setMessageWarning({
                ...messageWarning,
                confirmPassword: "Password does not match",
            });
        } else {
            setMessageWarning({ ...messageWarning, confirmPassword: "" });
            setCheckInput({ ...checkInput, confirmPassword: true });
        }
    }

    function handleUserType(e) {
        const type = e.target.value;

        setSelectedUserType(type);
        setCheckInput({ ...checkInput, type: true });

    }

    function handleBusinessType(e) {
        const businessType = e.target.value;
        setCheckInput({ ...checkInput, type: false });

        if (businessType === "") {
            setMessageWarning({
                ...messageWarning,
                businessType: "This field is required",
            });
        } else {
            setMessageWarning({
                ...messageWarning,
                businessType: "",
            });
            setUser({ ...user, businessType: businessType });
            setCheckInput({ ...checkInput, businessType: true });
        }
    }

    function handleAddress(e) {
        const address = e.target.value;
        setCheckInput({ ...checkInput, address: false });

        if (address === "") {
            setMessageWarning({
                ...messageWarning,
                address: "This field is required",
            });
        } else {
            setMessageWarning({
                ...messageWarning,
                address: "",
            });
            setUser({ ...user, address: address });
            setCheckInput({ ...checkInput, address: true });
        }
    }

    function handleOrganizationName(e) {
        const organizationName = e.target.value;
        setCheckInput({ ...checkInput, organizationName: false });

        if (organizationName === "") {
            setMessageWarning({
                ...messageWarning,
                organizationName: "This field is required",
            });
        } else {
            setMessageWarning({
                ...messageWarning,
                organizationName: "",
            });
            setUser({ ...user, organizationName: organizationName });
            setCheckInput({ ...checkInput, organizationName: true });
        }
    }

    function handleWasteInfoType(selected) {
        const wasteInfoType = Array.isArray(selected) ? selected : [];
        setCheckInput({ ...checkInput, wasteInfoType: false });

        if (wasteInfoType.length === 0) {
            setMessageWarning({
                ...messageWarning,
                wasteInfoType: "Please choose at least one type",
            });
        } else {
            setMessageWarning({
                ...messageWarning,
                wasteInfoType: "",
            });
            const valueTypes = wasteInfoType.map((type) => type.value);
            setUser({ ...user, wasteInfoType: valueTypes });
            setCheckInput({ ...checkInput, wasteInfoType: true });
        }
    }

    function handleWasteInfoRange(e) {
        const wasteInfoRange = e.target.value;
        setCheckInput({ ...checkInput, wasteInfoRange: false });

        if (wasteInfoRange <= 0 || wasteInfoRange > 1000) {
            setMessageWarning({
                ...messageWarning,
                wasteInfoRange: "Please select a valid range",
            });
            setUser({ ...user, wasteInfoRange: wasteInfoRange });
        } else {
            setMessageWarning({
                ...messageWarning,
                wasteInfoRange: "",
            });
            setUser({ ...user, wasteInfoRange: wasteInfoRange });
            setCheckInput({ ...checkInput, wasteInfoRange: true });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (selectedUserType != 'station' && selectedUserType != 'company') {
            setMessageWarning({
                ...messageWarning,
                submit:
                    "Please select the type of user",
                type:
                    "Please select the type of user",
            });
            return;
        }

        if (
            checkInput.username &&
            checkInput.phone &&
            checkInput.email &&
            checkInput.password &&
            checkInput.confirmPassword &&
            checkInput.businessType &&
            checkInput.address &&
            checkInput.organizationName &&
            checkInput.wasteInfoType &&
            checkInput.wasteInfoRange
        ) {

            await sendDataToServer(event);
        } else {
            setMessageWarning({
                ...messageWarning,
                submit:
                    "Please fill in all fields or verify that the input is correct.",
            });
            notify("Please fill in all fields or verify that the input is correct.",
                'error')
        }
    }

    async function sendDataToServer(event) {

        try {
            const res = await api.post(`/${selectedUserType === "company" ? "company" : "station"}`, user);

            if (selectedUserType === "station") {
                notify("The operation was completed successfully, you must wait for the approval of the administrator now, you will receive an email with the result",
                    'success')

                setTextTheme('green')
                event.target.reset();
                return;
            }
            navigate(path);
            localStorage.setItem("token", res.data.token);
            values.logIn.setIsLog(true);
            event.target.reset();
        } catch (err) {
            setMessageWarning({
                ...messageWarning,
                email: "Email is already exist",
            });
            notify("Email is already exist",
                'error')
            console.log(err);
        }
    }

    return (
        <>
            <ToastContainer />
            <main className="main row justify-content-center align-items-center me-0 ">
                <section className="hero-card">
                    <h1 className="hero-text-card">Sign up for your EcoBridge account</h1>
                </section>
                <section className="row container-sing-up justify-content-center col-12 p-0">
                    <form onSubmit={handleSubmit} className="row justify-content-center col-12 m-0 p-0">
                        <div className="hero-text-signUp">
                            <h1 className="text-center mt-3 main-color">
                                user <span className="yellow-color">type</span> :
                            </h1>
                        </div>
                        <div className="d-flex flex-wrap align-items-center justify-content-around">
                            <div className="form-check my-3">
                                <label
                                    htmlFor="station"
                                    className="form-check-label block text-sm font-weight-medium"
                                >
                                    Station
                                </label>
                                <input
                                    onClick={handleUserType}
                                    value="station"
                                    checked={selectedUserType === "station"}
                                    type="radio"
                                    id="station"
                                    name="flexRadioDefault"
                                    className="form-check-input"
                                />
                            </div>
                            <div className="form-check">
                                <label
                                    htmlFor="company"
                                    className="form-check-label block text-sm font-weight-medium"
                                >
                                    Company
                                </label>
                                <input
                                    onClick={handleUserType}
                                    value="company"
                                    checked={selectedUserType === "company"}
                                    type="radio"
                                    id="company"
                                    name="flexRadioDefault"
                                    className="form-check-input"
                                />
                            </div>
                        </div>
                        <span className={`error-Massage text-center`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.type}</span>
                        <hr className="line" />
                        <div className="row col-12 col-sm-10 justify-content-center">
                            <div className="hero-text-signUp">
                                <h1 className="text-center mt-3 main-color">
                                    Account <span className="yellow-color">information</span> :
                                </h1>
                            </div>
                            <div className="form p-0">
                                <div className="input-field">
                                    <label
                                        className="text-font text-bold-color label"
                                        htmlFor="userName"
                                    >
                                        User Name
                                    </label>
                                    <input onBlur={handleUsername}
                                        className="form-control"
                                        id="userName"
                                        type="text"
                                        name="userName"
                                    />
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.username}</span>
                                </div>
                                <div className="input-field">
                                    <label className="text-font text-bold-color label" htmlFor="phone">
                                        Phone Number
                                    </label>
                                    <input onBlur={handlePhone}
                                        className="form-control"
                                        id="phone"
                                        type="text"
                                        name="phone"
                                    />
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.phone}</span>
                                </div>
                                <div className="input-field">
                                    <label className="text-font text-bold-color label" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input onBlur={handleEmail}
                                        className="form-control"
                                        id="email"
                                        type="text"
                                        name="email"
                                    />
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.email}</span>
                                </div>
                                <div className="input-field password">
                                    <label className="text-font text-bold-color label" htmlFor="password">
                                        Password
                                    </label>
                                    <input onBlur={handlePassword} className="form-control" id="password" type={passwordMode ? 'password' : 'text'} />
                                    <span className="eye mt-sm-1" onClick={handlePasswordMode}>
                                        <i className={`fas fa-eye ${passwordMode ? 'd-block' : 'd-none'}`} id="showEye" />
                                        <i className={`fas fa-eye-slash ${passwordMode ? 'd-none' : 'd-block'}`} id="hideEye" />
                                    </span>
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.password}</span>
                                </div>
                                <div className="input-field password">
                                    <label className="text-font text-bold-color label" htmlFor="password">
                                        Confirm Password
                                    </label>
                                    <input onBlur={handleConfirmPassword} className="form-control" id="password" type={passwordModeCon ? 'password' : 'text'} />
                                    <span className="eye mt-sm-1" onClick={handlePasswordModeCon}>
                                        <i className={`fas fa-eye ${passwordModeCon ? 'd-block' : 'd-none'}`} id="showEye" />
                                        <i className={`fas fa-eye-slash ${passwordModeCon ? 'd-none' : 'd-block'}`} id="hideEye" />
                                    </span>
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.confirmPassword}</span>
                                </div>
                            </div>
                        </div>
                        <hr className="line" />
                        <div className="row col-12 col-sm-10 justify-content-center p-0">
                            <div className="hero-text-signUp">
                                <h1 className="text-center main-color">
                                    Business <span className="yellow-color">information</span> :
                                </h1>
                            </div>
                            <div className="form p-0">
                                <div className="input-field">
                                    <label
                                        className="text-font text-bold-color label"
                                        htmlFor="userName"
                                    >
                                        Business type
                                    </label>
                                    <input onBlur={handleBusinessType}
                                        className="form-control"
                                        id="userName"
                                        type="text"
                                        name="userName"
                                    />
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.businessType}</span>
                                </div>
                                <div className="input-field">
                                    <label className="text-font text-bold-color label" htmlFor="phone">
                                        Address
                                    </label>
                                    <input onBlur={handleAddress}
                                        className="form-control"
                                        id="phone"
                                        type="text"
                                        name="phone"
                                    />
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.address}</span>
                                </div>
                                <div className="input-field">
                                    <label className="text-font text-bold-color label" htmlFor="email">
                                        Organization name
                                    </label>
                                    <input onBlur={handleOrganizationName}
                                        className="form-control"
                                        id="email"
                                        type="text"
                                        name="email"
                                    />
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.organizationName}</span>
                                </div>
                            </div>
                        </div>
                        <hr className="line" />
                        {selectedUserType &&
                            <div className="row col-12 col-sm-10 justify-content-center p-0">
                                <div className="hero-text-signUp">
                                    <h1 className="text-center main-color">
                                        Waste <span className="yellow-color">information</span> :
                                    </h1>
                                </div>
                                <div className="select mb-3">
                                    <label
                                        className="text-font text-bold-color label"
                                        htmlFor="inputBirthday"
                                    >
                                        {selectedUserType === "company" ? "Type of waste produced" : "Type of waste accepted"}
                                    </label>
                                    <Select
                                        className="custom-select"
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={options}
                                        onChange={handleWasteInfoType}
                                    />
                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.wasteInfoType}</span>
                                </div>
                                <div className="select mb-3">
                                    <label
                                        className="text-font text-bold-color label"
                                        htmlFor="inputRange"
                                    >
                                        {selectedUserType === "company" ? "The amount of waste produced per week (KG)" : "Capacity of the Station per week (KG)"}
                                    </label>
                                    <Slider onChange={handleWasteInfoRange}
                                        id="inputRange"
                                        defaultValue={50}
                                        min={0}
                                        max={1000}
                                        valueLabelDisplay="auto"
                                        color='success'
                                        aria-label="Temperature"
                                        step={10}
                                        marks
                                    />
                                    <p className='text-bold-color'>{user.wasteInfoRange} KG</p>

                                    <span className={`error-Massage`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.wasteInfoRange}</span>
                                </div>
                            </div>
                        }
                        <div className="row col-12 col-sm-10 justify-content-center my-3 ">
                            <button type="submit" className="button p-0">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <h6 className="text-center text-font text-bold-color mb-3">
                        Already have an account ?
                        <Link className="link" to={"/signIn"}>
                            <b>Log In</b>
                        </Link>
                    </h6>
                    <div className={`error-Massage text-center pb-3`} style={{ color: textTheme, fontSize: '13px' }}>{messageWarning.submit}</div>
                </section>
            </main>
        </>
    )
}
