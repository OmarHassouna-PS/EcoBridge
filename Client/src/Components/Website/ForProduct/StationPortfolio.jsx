import React from 'react'
import './../../../CSS/Portfolios.css'

export default function StationPortfolio() {
    return (
        <>
            <main>
                <section className="container-portfilio">
                    <div className="title">
                        <h1 className="text-first-color fw-bold">Stations <span className="text-second-color">Information</span></h1>
                    </div>

                    <section className="container-form">
                        <div className="container-xl px-4 mt-4">
                            <hr className="mt-0 mb-4" />
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card mb-4 mb-xl-0">
                                        <div className="card-header">Profile Picture</div>
                                        <div className="card-body text-center">
                                            <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="card mb-4">
                                        <div className="card-header">Station Details</div>
                                        <div className="card-body">

                                            <div className="row gx-3 mb-3">
                                                <div className="col-md-6">
                                                    <h6>Organization name :</h6>
                                                    <h2 className="main-color">EcoBridge</h2>
                                                </div>

                                                <div className="col-md-6">
                                                    <h6>capacity of the Station per day :</h6>
                                                    <h2 className="main-color">1000 KG</h2>
                                                </div>
                                            </div>

                                            <hr className="line" />

                                            <div className="mb-3">
                                                <div className="select text-center">
                                                    <h6 className="mb-3">Type of waste accepted</h6>

                                                    <div className="" data-aos="fade-up-left" data-aos-duration="3000">
                                                        <div className="waste-types justify-content-center about-content">
                                                            <div className="waste-type" data-aos="zoom-in-down">Paper</div>
                                                            <div className="waste-type" data-aos="zoom-in-up">Cardboard</div>
                                                            <div className="waste-type" data-aos="zoom-in-down">Glass</div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
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
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="circle-card text-center">
                                <div>
                                    <p className="m-0 text-bold-color fw-bold">Material received</p>
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
