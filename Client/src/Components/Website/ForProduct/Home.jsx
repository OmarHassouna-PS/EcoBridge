import React, { useEffect, useState } from 'react'
import './../../../CSS/Home.css'
import Slider from '../util/Slider'
import { Link } from 'react-router-dom';
import SliderPost from "../util/SliderPost";
import Loader from "../General/Loader";
import useFetch from './../../../Hooks/useFetch'
import Unauthorized from '../General/Unauthorized';
import staticImage from './../../../Images/static.jpg'
import TableModal from '../util/TableModal'

export default function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { loading: requestLoading, data: requestData, error: requestError } = useFetch('/request');
    const { loading: stationLoading, data: stationData, error: stationError } = useFetch('/station');

    const [requests, setRequests] = useState();
    const [stations, setStations] = useState();

    const scrollToElement = () => {
        const element = document.getElementById('station');
        element.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        handleRequests();
        handleStations();
    }, [requestData, stationData])

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
                <div key={card.requests_id} className="swiper-slide requests-card">
                    <div className="ribbon ribbon-top-left">
                        <span>ID {card.requests_id}</span>
                    </div>
                    <div className="user-image">
                        <SliderPost blocks={imagesTag} />
                    </div>
                    <div className="content">
                        <h3 className="text-first-color fw-bold">{card.title}</h3>
                        <hr className="" />
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="text-first-color text-start ps-4">Material type :</h6>
                                <p className="text-bold-color">{card.material_type}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-first-color text-start ps-4">Condition :</h6>
                                <p className="text-bold-color">{card.condition}</p>
                            </div>
                        </div>
                        <hr className="" />
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="text-first-color text-start ps-4">Location :</h6>
                                <p className="text-bold-color">{card.location}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-first-color text-start ps-4">Quantity:</h6>
                                <p className="text-bold-color">{card.quantity} KG</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-0" />
                    <div className="footerCard">
                        <div className="md-button mb-4">
                            <Link to={`/view-request/${card.requests_id}`} className="button mb-3">Show</Link>
                        </div>
                    </div>
                </div>
            )
        })

        setRequests(arrRequests)
    }

    function handleStations() {
        const arrRequests = stationData?.slice(0, 5).map((station) => {

            let imagesTag = <img src={staticImage} alt="request images" />;
            const list_materials_and_prices = station.list_materials_and_prices?.map((jsonString) => JSON.parse(jsonString));

            if (station.avatar_image) {

                const buffer = station.avatar_image?.data;

                let binary = "";
                const bytes = new Uint8Array(buffer);
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }

                imagesTag = <img src={`data:image/*;base64,${btoa(binary)}`} alt="avatar station" />
            }

            return (
                <div key={station.station_id} class="swiper-slide requests-card">
                    <div class="ribbon ribbon-top-left"><span>ID {station.station_id}</span></div>
                    <div class="user-image">
                        {imagesTag}
                    </div>
                    <h3 class="text-first-color fw-bold">{station.organization_name}</h3>
                    <div class="content">
                        <hr className="" />
                        <h6 class="text-first-color text-start ps-4">Acceptable materials type :</h6>
                        <div className="waste-types justify-content-center">
                            {station.waste_info_type?.map((item) => {
                                return (
                                    <p className="waste-type ms-1">{item}</p>
                                )
                            })}
                        </div>

                        <hr className="" />
                        <div className="row">
                            <div className="col-md-6">

                                <h6 class="text-first-color text-start ps-4">Condition :</h6>
                                <label className='label-card' style={{ color: station.condition ? "var(--main-color)" : "#f00", borderColor: station.condition ? "var(--main-color)" : "#f00" }}>
                                    {station.condition ? "Available" : "Unavailable"}
                                </label>
                            </div>
                            <div className="col-md-6">

                                <h6 class="text-first-color text-start ps-4">business Type :</h6>
                                <p class="text-bold-color">{station.business_type}</p>
                            </div>
                        </div>
                        <hr className="" />

                        <div className="row">
                            <div className="col-md-6">

                                <h6 class="text-first-color text-start ps-4">address :</h6>
                                <p class="text-bold-color">{station.address}</p>
                            </div>
                            <div className="col-md-6">

                                <h6 class="text-first-color text-start ps-4">Capacity per day :</h6>
                                <p class="text-bold-color">{station.waste_info_range} KG</p>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-0" />
                    <div class="footerCard">
                        <TableModal materialTypeList={list_materials_and_prices} />
                        <div class="md-button mb-4">
                            <Link to={`/view-station/${station.station_id}`} class="button mb-3">Show</Link>
                        </div>
                    </div>

                </div>
            )
        })

        setStations(arrRequests)
    }

    if (requestLoading || stationLoading) {
        return <Loader />
    }

    if (requestError || stationError) {
        return <Unauthorized />
    }

    return (
        <>
            <main>
                <section className="container-home">
                    <section className="hero">
                        <div className='background'>
                            <div className="hero-text color-text-hero">
                                <span className="">
                                    <h1>
                                        <span className="">" </span>
                                        <span className="">Recycling is essential for a
                                            cleaner and more sustainable future. Let's make it a daily habit and
                                            work together to build a
                                            greener world</span>
                                        <span className=""> "</span>
                                    </h1>
                                </span>
                            </div>
                            <div className="md-button">
                                <Link to={'/add-request'} className="button text-center first-btn">
                                    Add a request
                                </Link>
                                <Link onClick={scrollToElement}
                                    className="button text-center second-btn"
                                >
                                    Find a station
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="requests">
                        <div className="title">
                            <h1 className="text-first-color fw-bold">
                                My <span className="text-second-color">Requests</span>
                            </h1>
                        </div>

                        <Slider blocks={requests} />

                        <div className="text-center">
                            <Link to={'/show-requests'} className="link">
                                Show all..
                            </Link>
                        </div>
                    </section>

                    <section className="stations" id='station'>
                        <div className="title">
                            <h1 className="text-first-color fw-bold">
                                Recycling <span className="text-second-color">Stations</span>
                            </h1>
                        </div>

                        <Slider blocks={stations} />
                        <div className="text-center">
                            <Link to={'/show-stations'} className="link">
                                Show all..
                            </Link>
                        </div>
                    </section>

                    <section className="recycle-right">
                        <div className="recycle-right-card">
                            <div className="recycle-right-image">
                                <img className="" src="../Images/Recycle-right.jpg" alt="" />
                            </div>
                            <div className="recycle-right-field">
                                <h1 className="text-first-color fw-bold mb-4">
                                    Recycle <span className="text-second-color">right</span>
                                </h1>
                                <h4 className="black-text fw-bold">We are your recycling partner</h4>
                                <p className="black-text">
                                    Every time you choose to recycle, you're giving that item a second
                                    life to serve a new purpose and save natural resources. Now more
                                    than ever, it’s important that only the right items, free from
                                    contamination, make their way into your recycling bin.
                                </p>
                                <div className="md-button">
                                    <Link
                                        to="/recycle-right"
                                        className="button text-center first-btn"
                                    >
                                        Learn more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}
