import React from 'react'
import { Link } from 'react-router-dom'
import LogoFooter from './../../../Images/Ecobridge-Logo-Footer.png'

export default function Footer() {
    return (
        <>
            <footer
                id="Social"
                className="footer row justify-content-center align-items-center me-0"
            >
                <div className="fotter-logo">
                    <img
                        className="mx-auto d-block pt-2"
                        src={LogoFooter}
                        alt="Ecobridge Logo"
                        width="200px"
                    />
                </div>
                <div className="social pt-2">
                    <ul className="social list-unstyled d-flex justify-content-center">
                        <Link>
                            <li className="footer-icon me-4 ms-4">
                                <svg
                                    height="25px"
                                    style={{
                                        fillRule: "evenodd",
                                        clipRule: "evenodd",
                                        strokeLinejoin: "round",
                                        strokeMiterlimit: 2
                                    }}
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                    width="25px"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <path
                                        d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104"
                                        style={{ fillRule: "nonzero" }}
                                    />
                                </svg>
                            </li>
                        </Link>
                        <Link>
                            <li className="footer-icon me-4 ms-4">
                                <svg
                                    height="25px"
                                    style={{
                                        fillRule: "evenodd",
                                        clipRule: "evenodd",
                                        strokeLinejoin: "round",
                                        strokeMiterlimit: 2
                                    }}
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                    width="25px"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <path
                                        d="M512,257.555c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"
                                        style={{ fillRule: "nonzero" }}
                                    />
                                </svg>
                            </li>
                        </Link>
                        <Link>
                            <li className="footer-icon me-4 ms-4">
                                {/*?xml version="1.0" ?*/}
                                <svg
                                    height="25px"
                                    style={{
                                        fillRule: "evenodd",
                                        clipRule: "evenodd",
                                        strokeLinejoin: "round",
                                        strokeMiterlimit: 2
                                    }}
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                    width="25px"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <path
                                        d="M473.305,-1.353c20.88,0 37.885,16.533 37.885,36.926l0,438.251c0,20.393 -17.005,36.954 -37.885,36.954l-436.459,0c-20.839,0 -37.773,-16.561 -37.773,-36.954l0,-438.251c0,-20.393 16.934,-36.926 37.773,-36.926l436.459,0Zm-37.829,436.389l0,-134.034c0,-65.822 -14.212,-116.427 -91.12,-116.427c-36.955,0 -61.739,20.263 -71.867,39.476l-1.04,0l0,-33.411l-72.811,0l0,244.396l75.866,0l0,-120.878c0,-31.883 6.031,-62.773 45.554,-62.773c38.981,0 39.468,36.461 39.468,64.802l0,118.849l75.95,0Zm-284.489,-244.396l-76.034,0l0,244.396l76.034,0l0,-244.396Zm-37.997,-121.489c-24.395,0 -44.066,19.735 -44.066,44.047c0,24.318 19.671,44.052 44.066,44.052c24.299,0 44.026,-19.734 44.026,-44.052c0,-24.312 -19.727,-44.047 -44.026,-44.047Z"
                                        style={{ fillRule: "nonzero" }}
                                    />
                                </svg>
                            </li>
                        </Link>
                        <Link>
                            <li className="footer-icon me-4 ms-4">
                                {/*?xml version="1.0" ?*/}
                                <svg
                                    enableBackground="new 0 0 24 24"
                                    height="24px"
                                    id="Layer_1"
                                    version="1.1"
                                    viewBox="0 0 24 24"
                                    width="24px"
                                    xmlSpace="preserve"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <g>
                                        <path d="M17.7,0.5H6.3c-3.2,0-5.8,2.6-5.8,5.8v11.3c0,3.2,2.6,5.8,5.8,5.8h11.3c3.2,0,5.8-2.6,5.8-5.8V6.3   C23.5,3.1,20.9,0.5,17.7,0.5z M12,18.3c-3.5,0-6.3-2.8-6.3-6.3S8.5,5.7,12,5.7s6.3,2.8,6.3,6.3S15.5,18.3,12,18.3z M18.6,6.3   c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9S19.1,6.3,18.6,6.3z" />
                                    </g>
                                </svg>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="text-center">
                    <p className="copy-right">©2023 - EcoBridge | All right reserved</p>
                </div>
            </footer>

        </>
    )
}
