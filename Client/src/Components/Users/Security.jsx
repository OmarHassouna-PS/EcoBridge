import React, { useContext, useEffect, useState } from 'react'
import './../../CSS/Portfolios.css'
import { Link, useNavigate } from 'react-router-dom';
import api from '../../AxiosConfig/contacts';
import { Context } from '../../Context/AuthContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '../Website/util/Alert';
import Unauthorized from '../Website/General/Unauthorized';

// more than 8 characters, with at least 1 number, uppercase, and special characters.
const patternPassword = /^(?=.*[A-Z]?)(?=.*?[0-9])(?=.*?[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?]).{8,}$/;

export default function Securely() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const values = useContext(Context);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [passwordDeleteAccount, setPasswordDeleteAccount] = useState(true);

    const [passwordShowCurrent, setPasswordShowCurrent] = useState(true);
    const [passwordShowNew, setPasswordShowNew] = useState(true);
    const [passwordShowConform, setPasswordShowConform] = useState(true);
    const [passwordShowDeleteAccount, setPasswordShowDeleteAccount] = useState(true);
    const [showAlert, setShowAlert] = useState(true);

    const handleClickOpen = (event) => {
        event.preventDefault();
        setShowAlert(showAlert + 1);
        setOpen(true);
    };

    const handleClose = (event) => {
        event.preventDefault();
        setOpen(false);
    };

    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""

    });

    const [checkInput, setCheckInput] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [messageWarning, setMessageWarning] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        DeleteAccountPassword: '',
        submit: ''
    })

    function handlePasswordShowDeleteAccount() {
        setPasswordShowDeleteAccount(!passwordShowDeleteAccount);
    }

    function handlePasswordShowCurrent() {
        setPasswordShowCurrent(!passwordShowCurrent);
    }

    function handlePasswordShowNew() {
        setPasswordShowNew(!passwordShowNew);
    }

    function handlePasswordShowConform() {
        setPasswordShowConform(!passwordShowConform);
    }

    function handleDeleteAccountPassword(event) {

        const password = event.target.value;
        if (password === "") {
            setMessageWarning({ ...messageWarning, DeleteAccountPassword: "This field is required" });
        } else if (!patternPassword.test(password)) {
            setMessageWarning({
                ...messageWarning,
                DeleteAccountPassword:
                    "Invalid password",
            });
        } else {
            setMessageWarning({ ...messageWarning, DeleteAccountPassword: "" });
            console.log(password)
            setPasswordDeleteAccount(password);
        }
    }

    function handleOldPassword(event) {

        setCheckInput({ ...checkInput, oldPassword: false });
        const password = event.target.value;

        if (password === "") {
            setMessageWarning({ ...messageWarning, oldPassword: "This field is required" });
        } else if (!patternPassword.test(password)) {
            setMessageWarning({
                ...messageWarning,
                oldPassword:
                    "Invalid password",
            });
        } else {
            setMessageWarning({ ...messageWarning, oldPassword: "" });
            setPasswords({ ...passwords, oldPassword: password });
            setCheckInput({ ...checkInput, oldPassword: true });
        }
    }

    function handleNewPassword(event) {

        setCheckInput({ ...checkInput, newPassword: false });
        const password = event.target.value;

        if (password === "") {
            setMessageWarning({ ...messageWarning, newPassword: "This field is required" });
        } else if (!patternPassword.test(password)) {
            setMessageWarning({
                ...messageWarning,
                newPassword:
                    "Invalid password, Password must consist of 8 characters, with at least 1 number, uppercase, and special characters",
            });
        } else {
            setMessageWarning({ ...messageWarning, newPassword: "" });
            setPasswords({ ...passwords, newPassword: password });
            setCheckInput({ ...checkInput, newPassword: true });
        }
    }

    function handleConfirmPassword(event) {
        const password = event.target.value;
        setCheckInput({ ...checkInput, confirmPassword: false });

        if (password === "") {
            setMessageWarning({ ...messageWarning, confirmPassword: "This field is required" });
        } else if (password !== passwords.newPassword) {
            setMessageWarning({
                ...messageWarning,
                confirmPassword: "Password does not match",
            });
        } else {
            setMessageWarning({ ...messageWarning, confirmPassword: "" });
            setPasswords({ ...passwords, confirmPassword: password });
            setCheckInput({ ...checkInput, confirmPassword: true });
        }
    }

    async function handleDeleteAccount(event) {
        event.preventDefault();

        try {
            const res = await api.delete(`/${values.UserInfo.role === "company" ? "company" : "station"}`, {
                data: { passwordDeleteAccount }
            });

            localStorage.removeItem('token');
            values.logIn.setIsLog(false);
            values.setUserInfo(undefined);
            // navigate('/');
            // event.target.reset();
        } catch (err) {
            setMessageWarning({ ...messageWarning, DeleteAccountPassword: "Invalid password" });
            console.log(err);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        console.log(passwords)
        if (
            checkInput.newPassword &&
            checkInput.confirmPassword &&
            checkInput.oldPassword
        ) {

            await sendDataToServer();
            // event.target.reset();
        } else {
            setMessageWarning({
                ...messageWarning,
                submit:
                    "Please fill in all fields or verify that the input is correct.",
            });
        }
    }

    async function sendDataToServer() {

        try {
            const res = await api.put(`/${values.UserInfo.role === "company" ? "change_company_password" : "change_station_password"}`, passwords);

            localStorage.setItem('token', res.data.token);
            console.log(res.data.token);
        } catch (err) {
            setMessageWarning({
                ...messageWarning,
                submit: "Something is wrong please try another time",
            });
            console.log(err);
        }
    }

    if (!values.logIn.isLog && !values.UserInfo) {
        return (
            <Unauthorized />
        )
    }

    return (
        <>
            <main>
                <section className="container-portfilio">
                    <div className="text-center mt-5">
                        <h1 className="text-first-color fw-bold">
                            Sec<span className="text-second-color">urity</span>
                        </h1>
                    </div>
                    <section className="container-form">
                        <div className="container-xl px-4 mt-4">
                            <nav className="nav nav-borders">

                                <Link to={'/portfolio'} class="nav-link active ms-0" >Profile</Link>
                                <Link to={'/security'} class="nav-link">Security</Link>

                            </nav>
                            <hr className="mt-0 mb-4" />
                        </div>
                        <div className="container-xl px-4 mt-4 pb-5">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="card mb-4">
                                        <div className="card-header">Change Password</div>
                                        <div className=" card-body">
                                            <form onSubmit={handleSubmit} className='security-form'>
                                                <div className="mb-3">
                                                    <div className="input-field password">
                                                        <label
                                                            className="small mb-1"
                                                            htmlFor="confirmPassword"
                                                        >
                                                            Confirm your old Password
                                                        </label>
                                                        <input onBlur={handleOldPassword} className="form-control" id="currentPassword" type={passwordShowCurrent ? 'password' : 'text'} />
                                                        <span className="eye" onClick={handlePasswordShowCurrent}>
                                                            <i className={`fas fa-eye ${passwordShowCurrent ? 'd-block' : 'd-none'}`} id="showEye" />
                                                            <i className={`fas fa-eye-slash ${passwordShowCurrent ? 'd-none' : 'd-block'}`} id="hideEye" />
                                                        </span>
                                                        <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.oldPassword}</span>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="input-field password">
                                                        <label
                                                            className="small mb-1"
                                                            htmlFor="confirmPassword"
                                                        >
                                                            New Password
                                                        </label>
                                                        <input onBlur={handleNewPassword} className="form-control" id="currentPassword" type={passwordShowNew ? 'password' : 'text'} />
                                                        <span className="eye" onClick={handlePasswordShowNew}>
                                                            <i className={`fas fa-eye ${passwordShowNew ? 'd-block' : 'd-none'}`} id="showEye" />
                                                            <i className={`fas fa-eye-slash ${passwordShowNew ? 'd-none' : 'd-block'}`} id="hideEye" />
                                                        </span>
                                                        <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.newPassword}</span>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="input-field password">
                                                        <label
                                                            className="small mb-1"
                                                            htmlFor="confirmPassword"
                                                        >
                                                            Confirm Password
                                                        </label>
                                                        <input onBlur={handleConfirmPassword} className="form-control" id="currentPassword" type={passwordShowConform ? 'password' : 'text'} />
                                                        <span className="eye" onClick={handlePasswordShowConform}>
                                                            <i className={`fas fa-eye ${passwordShowConform ? 'd-block' : 'd-none'}`} id="showEye" />
                                                            <i className={`fas fa-eye-slash ${passwordShowConform ? 'd-none' : 'd-block'}`} id="hideEye" />
                                                        </span>
                                                        <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.confirmPassword}</span>
                                                    </div>
                                                </div>
                                                <div className="md-button">
                                                    <button type='submit' className="button text-center first-btn">
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <span className="error-Massage text-center mb-2" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.submit}</span>
                                    </div>
                                </div>
                                <div className="card mb-4 col-lg-4 p-0">
                                    <div className="card-header">Delete Account</div>
                                    <div className="card-body delete-account-card">
                                        <p>
                                            Deleting your account is a permanent action and cannot be
                                            undone. If you are sure you want to delete your account, select
                                            the button below.
                                        </p>
                                        <button onClick={handleClickOpen} className="btn btn-danger-soft text-danger" type="button">
                                            I understand, delete my account
                                        </button>
                                    </div>
                                </div>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle color="success">confirm password</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Please enter the password to continue the process.
                                        </DialogContentText>

                                        <div className="input-field mb-2 mt-2 password">
                                            <input onChange={handleDeleteAccountPassword} className="form-control" id="password" type={passwordShowDeleteAccount ? 'password' : 'text'} />
                                            <span className="eye mb-4" onClick={handlePasswordShowDeleteAccount}>
                                                <i className={`fas fa-eye ${passwordShowDeleteAccount ? 'd-block' : 'd-none'}`} id="showEye" />
                                                <i className={`fas fa-eye-slash ${passwordShowDeleteAccount ? 'd-none' : 'd-block'}`} id="hideEye" />
                                            </span>
                                            <span className="error-Massage" style={{ color: 'red', fontSize: '13px' }}>{messageWarning.DeleteAccountPassword}</span>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button color="success" onClick={handleClose}>Cancel</Button>
                                        <Button color="success" onClick={handleDeleteAccount}>save</Button>
                                    </DialogActions>
                                    <Alert
                                        show={showAlert}
                                        message={'I understand that when I delete my account, it will be final and irreversible, and all my transactions within the site will be deleted except for the records.'}
                                        title={'Do you understand the next step?'}
                                        buttonMessage={'I understand'} />
                                </Dialog>
                            </div>

                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}
