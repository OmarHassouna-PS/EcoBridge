import React, { useEffect, useRef, useState } from 'react'
import '../../../CSS/Contact.css'
import api from './../../../AxiosConfig/contacts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function notify(toastMessage, toastType) {
        toast(toastMessage, {
            type: toastType
        })
    };

    const form = useRef();


    const sendEmail = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const email = event.target.email.value;
        const message = event.target.message.value;

        const patternEmail = /^[A-z0-9\.]+@[A-z0-9]+\.[A-z]{3,5}$/;

        if (!email || !username || !message) {
            notify('Please fill all felid!', 'warning');
            return;
        }

        if (!patternEmail.test(email)) {
            notify('Invalid email!', 'warning');
            return;
        }

        try {
            const res = await api.post('message', { username : username, email : email, message : message });
            console.log(res);
            event.target.reset();
            notify('The message was sent successfully, thank you for contacting us', 'success');
        } catch (error) {
            notify('Something went wrong, please try again later', 'error');
            console.log(error);
        }
    };

    return (
        <>
            <ToastContainer />
            <main>
                <section className="contact-container">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="main-contact">
                            <h1 className="text-first-color fw-bold">
                                Contact <span className="text-second-color">Us</span>
                            </h1>
                            <div className="user-name-input">
                                <label className="text-font text-bold-color label" htmlFor="username">
                                    Name
                                </label>
                                <input
                                    className="form-control"
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="Name"
                                />
                                <span className="error-Massage" id="username" />
                            </div>
                            <div className="email-input">
                                <label className="text-font text-bold-color label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="form-control"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                />
                                <span className="error-Massage" id="warningEmail" />
                            </div>
                            <div className="text-arua-input">
                                <label className="text-font text-bold-color label" htmlFor="password">
                                    Message
                                </label>
                                <textarea
                                    className="form-control"
                                    name="message"
                                    id="textArea"
                                    maxLength={300}
                                    cols={30}
                                    rows={5}
                                    placeholder="Message"
                                    defaultValue={""}
                                />
                                <span className="error-Massage" id="warningTextArea" />
                            </div>
                            <button type="submit" className="button">
                                Send
                            </button>
                            <div className="contact-information">
                                <ul>
                                    <div>
                                        <li>
                                            <svg
                                                className="icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={40}
                                                height={40}
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                            </svg>
                                            <p>Jordan</p>
                                        </li>
                                    </div>
                                    <div>
                                        <li>
                                            <svg
                                                className="icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={40}
                                                height={40}
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                                                />
                                            </svg>
                                            <p>0778788014</p>
                                        </li>
                                    </div>
                                    <div>
                                        <li>
                                            <svg
                                                className="icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={40}
                                                height={40}
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                                                <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                                            </svg>
                                            <p>EcoBridge@gmail.com</p>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </form>
                </section>
            </main>

        </>
    )
}
