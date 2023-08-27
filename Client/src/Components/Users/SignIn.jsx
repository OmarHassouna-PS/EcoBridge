import React, { useContext, useEffect, useState } from 'react'
import './../../CSS/Access.css'
import { Link, useNavigate } from 'react-router-dom';
import api from '../../AxiosConfig/contacts';
import { Context } from '../../Context/AuthContext';
import VerifyToken from '../..//Utils/Api/VerifyToken';

export default function SignIn() {

    const values = useContext(Context);
    const [passwordMode, setPasswordMode] = useState(true);

    useEffect(() => {
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [path, setPath] = useState('/');


    const [selectedUserType, setSelectedUserType] = useState("");

    function handlePasswordMode() {
        setPasswordMode(!passwordMode);
    }

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

    const [checkInput, setCheckInput] = useState({
        email: false,
        password: false,
        type: false
    });

    const [messageWarning, setMessageWarning] = useState({
        email: '',
        password: '',
        submit: ''
    })

    function handleEmail(event) {
        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;
        const email = event.target.value;
        setCheckInput({ ...checkInput, email: false });

        if (email === '') {
            setMessageWarning({ ...messageWarning, email: 'This field is required' });
        }
        else if (!patternEmail.test(email)) {
            setMessageWarning({ ...messageWarning, email: 'Invalid email' });
        }
        else {
            setMessageWarning({ ...messageWarning, email: '' });
            setUser({ ...user, email: email });
            setCheckInput({ ...checkInput, email: true });
        }
    }

    function handlePassword(event) {
        const patternPassword = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;
        const password = event.target.value;
        setCheckInput({ ...checkInput, password: false });
        if (password === '') {
            setMessageWarning({ ...messageWarning, password: 'This field is required' });
        }
        else if (!patternPassword.test(password)) {
            setMessageWarning({ ...messageWarning, password: `Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters` })
        }
        else {
            setMessageWarning({ ...messageWarning, password: '' });
            setUser({ ...user, password: password });
            setCheckInput({ ...checkInput, password: true });
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!checkInput.email && !checkInput.password) {
            setMessageWarning({
                ...messageWarning,
                submit: "You must fill in the fields.",
            });
            return;
        }
        if (selectedUserType !== '') {
            try {
                const res = await api.post(`/${selectedUserType === "station" ? "logIn_station" : "logIn_company"}`, {
                    email: email,
                    password: password,
                });

                localStorage.setItem("token", res.data.token);
                values.logIn.setIsLog(true);
                navigate(path);

            } catch (err) {

                if (err.response.data === "Don't have access" && selectedUserType === "station") {
                    setMessageWarning({
                        ...messageWarning,
                        submit: "The account has not been approved by the administrator yet, you will receive an email when it is approved or rejected",
                    });
                    return;
                }

                setMessageWarning({
                    ...messageWarning,
                    submit: "The email or password is not valid",
                });
                console.error(err);
            }
        }
        else {
            
            setMessageWarning({
                ...messageWarning,
                submit: "Please select the type of user",
            });

            values.logIn.setIsLog(false);
        }
    }

    return (
        <>
            <main className="main row justify-content-center m-0">
                <section className="hero-card">
                    <h1 className="hero-text-card">Log in to your account</h1>
                </section>
                <section className="row justify-content-center m-0 p-0">
                    <div className="container-sing-in col-10 col-lg-5 col-md-6 col-sm-8">
                        <div className="hero-text-signIn">
                            <h1 className="text-center">
                                <span className="main-color">Sign</span>{" "}
                                <span className="yellow-color">In</span>
                            </h1>
                        </div>
                        <form onSubmit={handleSubmit} className="row justify-content-center">
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
                            <div className="form row justify-content-center">
                                <div className="input-field mb-2">
                                    <label className="text-bold-color label" htmlFor="email">
                                        Email
                                    </label>
                                    <input onBlur={handleEmail}
                                        className="form-control"
                                        id="email"
                                        type="text"
                                        name="email"
                                    />
                                    <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.email}</span>
                                </div>
                                <div className="input-field mb-2 password">
                                    <label className="text-bold-color label" htmlFor="password">
                                        Password
                                    </label>
                                    <input onBlur={handlePassword} className="form-control" id="password" type={passwordMode ? 'password' : 'text'} />
                                    <span className="eye" onClick={handlePasswordMode}>
                                        <i className={`fas fa-eye ${passwordMode ? 'd-block' : 'd-none'}`} id="showEye" />
                                        <i className={`fas fa-eye-slash ${passwordMode ? 'd-none' : 'd-block'}`} id="hideEye" />
                                    </span>
                                    <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.password}</span>
                                </div>
                                <div className="row p-ms-0">
                                    <div className="col-6 text-start p-0">
                                        {/* <input
                                            className="form-check-input"
                                            id="rememberMe"
                                            type="checkbox"
                                            name="rememberMe"
                                        />
                                        <label className="text-font link ms-2" htmlFor="rememberMe">
                                            <b>Remember me</b>
                                        </label> */}
                                    </div>
                                    <div className="col-6 text-end p-0">
                                        <Link to={'/password-recovery'} className="text-font link">
                                            <b>Forgot Password ?</b>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row col-12 justify-content-center mt-3 text-center mb-5">
                                    <button type="submit" className="button">
                                        Log in
                                    </button>
                                    <h6 className="text-center text-font text-bold-color mt-3">
                                        Don’t have an Account ?
                                        <Link to={'/signUp'} className="text-font link">
                                            <b> Register</b>
                                        </Link>
                                    </h6>
                                    <span className="error-Massage text-center" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.submit}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}
