import React, { useContext, useEffect, useState } from 'react'
import './../../CSS/Access.css'
import { useParams } from 'react-router-dom';
import api from '../../AxiosConfig/contacts';
import Alert from '../Website/util/Alert';
import { Context } from '../../../src/Context/AuthContext';

import Unauthorized from './../Website/General/Unauthorized';

export default function PasswordRecover() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    const values = useContext(Context);

    const { token } = useParams();
    

    const [passwordShowNew, setPasswordShowNew] = useState(true);
    const [passwordShowConform, setPasswordShowConform] = useState(true);

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [selectedUserType, setSelectedUserType] = useState("");

    const [operatingSystem, setOperatingSystem] = useState("");
    const [browserName, setBrowserName] = useState("");

    const [messageWarning, setMessageWarning] = useState({
        email: '',
        newPassword: '',
        confirmPassword: '',
        submit: ''
    })

    const [checkInput, setCheckInput] = useState({
        email: false,
        newPassword: false,
        confirmPassword: false,
        type: false
    });

    const [alertMessage, setAlertMessage] = useState({
        show: false,
        title: '',
        message: '',
        buttonMessage: ''
    })

    function handlePasswordShowNew() {
        setPasswordShowNew(!passwordShowNew);
    }

    function handlePasswordShowConform() {
        setPasswordShowConform(!passwordShowConform);
    }

    useEffect(() => {
        // Retrieve operating system
        const os = navigator.platform;
        setOperatingSystem(os);

        // Retrieve browser name
        const browser = navigator.userAgent;
        setBrowserName(browser);
    }, []);

    function handleUserType(e) {
        const type = e.target.value;
        setCheckInput({ ...checkInput, type: false });

        if (type === "") {
            setMessageWarning({
                ...messageWarning,
                type: "Please select user type",
            });
        } else {
            setMessageWarning({
                ...messageWarning,
                type: "",
            });
            setSelectedUserType(e.target.value);
            setCheckInput({ ...checkInput, type: true });
        }
    }

    function handleEmail(event) {
        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
        const email = event.target.value;

        setCheckInput({ ...checkInput, email: false });

        if (!patternEmail.test(email)) {
            setMessageWarning({ ...messageWarning, email: 'Invalid email' });
        }
        else {
            setMessageWarning({ ...messageWarning, email: '' });
            setEmail(email);
            setCheckInput({ ...checkInput, email: true });
        }
    }

    function handleNewPassword(event) {
        const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        const password = event.target.value;
        setCheckInput({ ...checkInput, newPassword: false });

        if (password === '') {
            setMessageWarning({ ...messageWarning, newPassword: 'This field is required' });
        }
        else if (!patternPassword.test(password)) {
            setMessageWarning({ ...messageWarning, newPassword: `Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters` })
        }
        else {
            setMessageWarning({ ...messageWarning, newPassword: '' });
            setNewPassword(password);
            setCheckInput({ ...checkInput, newPassword: true });
        }
    }

    function handleConfirmPassword(event) {
        const password = event.target.value;

        setCheckInput({ ...checkInput, confirmPassword: false });

        if (password === "") {
            setMessageWarning({ ...messageWarning, confirmPassword: "This field is required" });
        } else if (password !== newPassword) {
            setMessageWarning({
                ...messageWarning,
                confirmPassword: "Password does not match",
            });
        } else {
            setConfirmPassword(password)
            setMessageWarning({ ...messageWarning, confirmPassword: "" });
            setCheckInput({ ...checkInput, confirmPassword: true });
        }
    }

    async function handleSubmitSendEmail(event) {
        event.preventDefault();

        if (!checkInput.email && !checkInput.type) {
            setMessageWarning({
                ...messageWarning,
                submit: "Please enter all fields and verify that the entry is correct.",
            });
            return;
        }
        try {
            const res = await api.post(`/send_email_reset_password`, {
                email: email,
                operatingSystem: operatingSystem,
                browserName: browserName,
                userType: selectedUserType
            });

            setAlertMessage({
                show: true,
                title: 'Password reset details have been sent to your email.',
                message: 'Please check your inbox or check your spam',
                buttonMessage: 'Ok'
            })

        } catch (err) {
            console.error(err);

            if (err.response?.status === 404) {
                setMessageWarning({
                    ...messageWarning,
                    submit: "No account with this email was found",
                });
                return;
            }

            setMessageWarning({
                ...messageWarning,
                submit: "Something went wrong, please try again later",
            });
        }
    }

    async function handleSubmitRestPassword(event) {
        event.preventDefault();
        if (!checkInput.newPassword && !checkInput.confirmPassword) {
            setMessageWarning({
                ...messageWarning,
                submit: "Please enter all fields and verify that the entry is correct.",
            });
            return;
        }
        try {
            const res = await api.post(`/reset_password`, {
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setAlertMessage({
                show: true,
                title: 'Bin\'s password has been reset.',
                message: 'You can now log into your account with the new password!',
                buttonMessage: 'Ok'
            })
            console.log(res)
            // event.target.reset();
        } catch (err) {
            console.error(err);

            if (err.response?.status === 401) {
                setMessageWarning({
                    ...messageWarning,
                    submit: "The password reset session has expired or you have already changed the password, you can reset the password again by sending a new request.",
                });
                return;
            }

            setMessageWarning({
                ...messageWarning,
                submit: "Something went wrong, please try again later",
            });
        }
    }

    if (values.logIn.isLog) {
        return (
            <Unauthorized />
        )
    }

    return (
        <>
            <main className="container-fluid row justify-content-center align-items-center m-0 p-0">

                <section className="col-12 hero-card">
                    <Alert
                        show={alertMessage.show}
                        title={alertMessage.title}
                        message={alertMessage.message}
                        buttonMessage={alertMessage.buttonMessage} />

                    <h1 className="hero-text-card">{token ? 'Create a new password' : 'Password Recovery'}</h1>
                </section>
                {
                    token ?
                        <>
                            <section className="col-12 row justify-content-center py-4 container-password-recovery">
                                <form onSubmit={handleSubmitRestPassword} className="row justify-content-center align-items-center">
                                    <p className="col-12 text-start text-font text-paragraph-color ">
                                        Please enter a new password.
                                    </p>
                                    <div className="col-lg-10 form ">

                                        <div className="input-field password">
                                            <label className="text-bold-color label" htmlFor="password">
                                                New Password
                                            </label>
                                            <input onBlur={handleNewPassword}
                                                className="form-control"
                                                id="password"
                                                type={passwordShowNew ? 'password' : 'text'}
                                                name="password"
                                            />
                                            <span className="error-Massage text-center mt-3" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.newPassword}</span>

                                            <span className="eye" onClick={handlePasswordShowNew}>
                                                <i className={`fas fa-eye ${passwordShowNew ? 'd-block' : 'd-none'}`} id="showEye" />
                                                <i className={`fas fa-eye-slash ${passwordShowNew ? 'd-none' : 'd-block'}`} id="hideEye" />
                                            </span>
                                        </div>
                                        <div className="input-field password mt-3">
                                            <label
                                                className="text-bold-color label"
                                                htmlFor="confirmPassword"
                                            >
                                                Confirm your Password
                                            </label>
                                            <input onBlur={handleConfirmPassword}
                                                className="form-control"
                                                id="password"
                                                type={passwordShowConform ? 'password' : 'text'}
                                                name="password"
                                            />
                                            <span className="eye" onClick={handlePasswordShowConform}>
                                                <i className={`fas fa-eye ${passwordShowConform ? 'd-block' : 'd-none'}`} id="showEye" />
                                                <i className={`fas fa-eye-slash ${passwordShowConform ? 'd-none' : 'd-block'}`} id="hideEye" />
                                            </span>
                                            <span className="error-Massage text-center mt-3" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.confirmPassword}</span>
                                        </div>
                                    </div>
                                    <div className="row col-md-3 mt-3 justify-content-center">
                                        <button type="submit" className="button p-0">
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                                <span className="error-Massage text-center mt-3" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.submit}</span>

                            </section>

                        </>
                        :
                        <>
                            <section className="container-fluid col-12 row justify-content-center py-4 container-password-recovery">
                                <form onSubmit={handleSubmitSendEmail} className="row justify-content-center">
                                    <div className="hero-text-signUp">
                                        <h1 className="text-center mt-3 main-color">
                                            user <span className="yellow-color">type</span> :
                                        </h1>
                                    </div>
                                    <div className="d-flex flex-wrap align-items-center justify-content-around  border-success border-opacity-50 rounded-4">
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
                                    <p className="col-12 text-start text-font text-paragraph-color">
                                        Please enter your email address. We will send you an email to reset your
                                        password.
                                    </p>
                                    <div className="col-lg-10 form">
                                        <div className="field-input">
                                            <label className="text-font text-bold-color label" htmlFor="email">
                                                Email
                                            </label>
                                            <input onBlur={handleEmail}
                                                className="form-control"
                                                id="email"
                                                type="text"
                                                name="email"
                                            />
                                            <span className="error-Massage text-center mt-3" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.email}</span>
                                        </div>
                                    </div>
                                    <div className="row col-md-3 mt-4 justify-content-center">
                                        <button type="submit" className="button">
                                            Send
                                        </button>
                                    </div>
                                    <span className="error-Massage text-center mt-3" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.submit}</span>

                                </form>
                            </section>
                        </>
                }




            </main>
        </>
    )
}
