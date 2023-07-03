import React, { Suspense, useContext, useEffect, useRef, useState } from 'react'
import './../../../CSS/Nav-Footer.css'
import './../../../CSS/Portfolios.css'
import { Link, Outlet } from 'react-router-dom';
import Loader from './Loader';
import { Context } from '../../../Context/AuthContext';
import UserAvatar from '../util/UserAvatar';

export default function Header() {
    const values = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown();
        }
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    function handleLogOut() {
        localStorage.removeItem('token');
        values.logIn.setIsLog(false);
        setIsOpen(false);
    }

    return (
        <>
            <header className="container-fluid navbar-interior-design">
                <nav className="co-12 navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to={'/'} id="logo">
                            <img
                                className="logo-img"
                                src="/Images/Ecobridge-Logo.png"
                                alt="LOGO"
                            />
                        </Link>
                        <button
                            className="navbar-toggler hamburger-menu"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link
                                        to={'/'}
                                        className="nav-link pe-4"
                                        aria-current="page"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={'/recycle-right'}
                                        className="nav-link pe-4"
                                        aria-current="page"
                                    >
                                        Recycle right
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={'/achievements'}
                                        className="nav-link pe-4"
                                        aria-current="page"
                                    >
                                        Our achievements
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={'/contact'}
                                        className="nav-link pe-4"
                                        aria-current="page"
                                    >
                                        Contact us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={'/about'}
                                        className="nav-link pe-4"
                                        aria-current="page"
                                    >
                                        About us
                                    </Link>
                                </li>
                            </ul>
                            <div className="search-input me-auto">
                                <span className="form-control-feedback">
                                    <svg
                                        className="search-icon d-inline"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        version="1.1"
                                        id="Capa_1"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 513.749 513.749"
                                        style={{ enableBackground: "new 0 0 513.749 513.749" }}
                                        xmlSpace="preserve"
                                        width={15}
                                    >
                                        <g>
                                            <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" />
                                        </g>
                                    </svg>
                                </span>
                                <input className="form-control" type="search" placeholder="Search" />
                            </div>
                            {values.logIn.isLog ?
                                <div className="dropdown" ref={dropdownRef}>
                                    <div className="user-image-container">
                                        <div onClick={toggleDropdown}>
                                            <UserAvatar style={'dropbtn'} state={values.logIn.setIsLog} selectedImage={false} />
                                        </div>
                                    </div>
                                    {isOpen && (
                                        <div className="dropdown-content">
                                            <Link to="/show-requests" onClick={() => setIsOpen(false)} className="drop-down-link pe-4" aria-current="page">
                                                {values.UserInfo.role === 'company' ? 'My requests' : 'Show requests'}
                                            </Link>
                                            <Link to={`/${values.UserInfo.role === 'company' ? 'company_movements_history' : 'station_movements_history'}`} onClick={() => setIsOpen(false)} className="drop-down-link pe-4" aria-current="page">
                                                Movements History
                                            </Link>
                                            {values.UserInfo.role === 'station' &&
                                            <Link to="/update-price" onClick={() => setIsOpen(false)} className="drop-down-link pe-4" aria-current="page">
                                                Update price
                                            </Link>
                                            }
                                            <Link to="/portfolio" onClick={() => setIsOpen(false)} className="drop-down-link pe-4" aria-current="page">
                                                Profile
                                            </Link>
                                            <Link to={'/signIn'} onClick={handleLogOut} className="drop-down-link pe-4" aria-current="page">
                                                Log Out
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                :
                                <div className="link-log-in">
                                    <Link to={'/signIn'} className="nav-link ">
                                        Log In
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                </nav>
            </header>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </>
    )
}
