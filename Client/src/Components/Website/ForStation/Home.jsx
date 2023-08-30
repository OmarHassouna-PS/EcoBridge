import React, { useEffect, useState } from 'react'
import './../../../CSS/Home.css'
import Slider from '../util/Slider';
import { Link } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import staticImage from './../../../Images/static.jpg';
import SliderPost from "../util/SliderPost";

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { loading: requestLoading, data: requestData, error: requestError } = useFetch('/getAllRequests');
    const [requests, setRequests] = useState();

    useEffect(() => {
        handleRequests();
    }, [requestData])

    function handleRequests() {
        const arrRequests = requestData?.slice(0, 5).map((card) => {

            let imagesTag = [<img src={staticImage} alt="request images" />];

            if (card?.images.length !== 0) {
                imagesTag = card?.images.map((img) => {
                    const buffer = img[0].data;

                    let binary = "";
                    const bytes = new Uint8Array(buffer);
                    const len = bytes.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }

                    const b64 = btoa(binary);

                    return (
                        <img src={`data:image/*;base64,${b64}`} alt="aa" />
                    )
                })
            }

            return (
                <div key={card.requests_id} class="swiper-slide requests-card">
                    <div class="ribbon ribbon-top-left"><span>ID {card.requests_id}</span></div>
                    <div class="user-image">
                        <SliderPost blocks={imagesTag} />
                    </div>
                    <div class="content">
                        <h3 class="text-first-color fw-bold">{card.title}</h3>
                        <hr className="" />

                        <div className="row">
                            <div className="col-md-6">

                                <h6 class="text-first-color text-start ps-4">Material type :</h6>
                                <div className="waste-types justify-content-center">
                                    <p className="waste-type m-0">{card.material_type}</p>
                                </div>
                            </div>
                            <div className="col-md-6">

                                <h6 class="text-first-color text-start ps-4">Condition :</h6>
                                <p class="text-bold-color">{card.condition}</p>

                            </div>
                        </div>

                        <hr className="" />

                        <div className="row">
                            <div className="col-md-6">

                                <h6 class="text-first-color text-start ps-4">Location :</h6>
                                <p class="text-bold-color">{card.location}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 class="text-first-color text-start ps-4">Quantity:</h6>
                                <p class="text-bold-color">{card.quantity} KG</p>

                            </div>
                        </div>


                    </div>
                    <div class="footerCard">
                        <hr className="mt-0" />
                        <div class="md-button mb-4">
                            <Link to={`/view-request/${card.requests_id}`} class="button mb-3">Show</Link>
                        </div>
                    </div>

                </div>
            )
        })

        setRequests(arrRequests)
    }

    return (
        <>
            <main>

                <section className="container-home">

                    <section className="hero">

                        <dir className='background color-text-hero'>
                            <div className="hero-text">
                                <h1 className=''>
                                    <span className=""></span>
                                    <span className="">Recycling is essential for a
                                        cleaner and more sustainable future. Let's make it a daily habit and
                                        work together to build a
                                        greener world</span>
                                    <span className=""> </span>
                                </h1>
                            </div>

                            <div className="md-button">
                                <Link to={'/show-requests'} className="button text-center first-btn">Requests list</Link>
                                <Link to={'/update-price'} className="button text-center second-btn">Update prices</Link>
                            </div>
                        </dir>

                    </section>

                    <section className="requests">
                        <div className="title">
                            <h1 className="text-first-color fw-bold">
                                Req<span className="text-second-color">uests</span>
                            </h1>
                        </div>

                        <Slider blocks={requests} />

                        <div className="text-center">

                            <Link to={'/show-requests'} className="link">
                                Show all..
                            </Link>

                        </div>
                    </section>

                    {/* <section className="Trans-Eval-info">

                        <div className="circles">

                            <div className="circle-card text-center">
                                <div>
                                    <p className="text-bold-color fw-bold">Successful operations</p>
                                    <div className="hr">
                                        <hr className="line" />
                                    </div>
                                </div>
                                <div className="percent" >
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
                                    <p className="m-0 text-bold-color fw-bold">Goal achievement</p>
                                    <p className="text-bold-color fw-bold">this year</p>
                                    <div className="hr">
                                        <hr className="line" />
                                    </div>
                                </div>
                                <div className="percent" style={{ '--num': 70 }}>
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
                                        <h2>100<span>KG</span></h2>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section> */}

                    <section className="recycle-right">
                        <div className="recycle-right-card">

                            <div className="recycle-right-image">
                                <img className="" src="../Images/Recycle-right.jpg" alt="Images Recycle right" />
                            </div>

                            <div className="recycle-right-field">

                                <h1 className="text-first-color fw-bold mb-4">Recycle <span className="text-second-color">right</span>
                                </h1>

                                <h4 className="black-text fw-bold">We are your recycling partner</h4>

                                <p className="black-text">Every time you choose to recycle, you're giving that item a second life to
                                    serve a new purpose and save natural resources. Now more than ever, it’s important that only
                                    the right items, free from contamination, make their way into your recycling bin.</p>

                                <div className="md-button">
                                    <Link to={'/recycle-right'} className="button text-center first-btn">Learn more</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                </section>
            </main>
        </>
    )
}
