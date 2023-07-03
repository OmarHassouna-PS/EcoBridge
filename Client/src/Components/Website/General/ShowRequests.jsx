import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import './../../../CSS/Show-Requests-Station.css'
import './../../../CSS/Home.css'
import useFetch from '../../../Hooks/useFetch';
import Loader from './Loader';
import Unauthorized from './Unauthorized';
import SliderPost from "../util/SliderPost";
import { Link } from 'react-router-dom';
import staticImage from './../../../Images/static.jpg'
import { Context } from '../../../Context/AuthContext';

export default function ShowRequest() {
    const values = useContext(Context);

    const { loading, data, error } = useFetch(`/${values.UserInfo.role === 'company' ? 'request' : 'getAllRequests'}`);
    const [requests, setRequests] = useState();

    const [materialType, setMaterialType] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [search, setSearch] = useState("");
    const [maxQuantity, setMaxQuantity] = useState("");
    const [minQuantity, setMinQuantity] = useState("");


    useEffect(() => {
        handleRequests()
    }, [data, materialType, selectedCondition, search, selectedLocation, maxQuantity, minQuantity])


    function handleRequests() {

        const filteredCards = data?.filter((card) => {
            if (materialType && card.material_type !== materialType) {
                return false;
            }
            if (selectedCondition && card.condition !== selectedCondition) {
                return false;
            }
            if (selectedLocation && card.location !== selectedLocation) {
                return false;
            }
            if (search && !card.title.toLowerCase().includes(search.toLowerCase())) {
                return false;
            }
            if (maxQuantity && card.quantity > maxQuantity) {
                return false;
            }
            if (minQuantity && card.quantity < minQuantity) {
                return false;
            }
            return true;
        });

        const arrRequests = filteredCards?.map((card) => {

            let imagesSlider = [<img src={staticImage} alt="request images" />];

            if (card.images.length !== 0) {
                imagesSlider = card.images.map((img) => {
                    console.log(img)
                    const buffer = img[0].data;

                    let binary = "";
                    const bytes = new Uint8Array(buffer);
                    const len = bytes.byteLength;
                    for (let i = 0; i < len; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }

                    const b64 = btoa(binary);

                    return (
                        <img src={`data:image/*;base64,${b64}`} alt="request images" />
                    )
                })
            }


            return (
                <div key={card.requests_id} class="swiper-slide requests-card show-requests-card">
                    <div class="ribbon ribbon-top-left"><span>ID {card.requests_id}</span></div>
                    <div class="show-image">
                        <SliderPost blocks={imagesSlider} />
                    </div>
                    <div class="content">
                        <h3 class="text-first-color fw-bold">{card.title}</h3>
                        <hr className="line" />
                        <h6 class="text-first-color text-start ps-4">Material type :</h6>
                        <div className="waste-types justify-content-center">
                            <p className="waste-type m-0">{card.material_type}</p>
                        </div>
                        <h6 class="text-first-color text-start ps-4">Condition :</h6>
                        <p class="text-bold-color">{card.condition}</p>

                        <h6 class="text-first-color text-start ps-4">Location :</h6>
                        <p class="text-bold-color">{card.location}</p>

                        <h6 class="text-first-color text-start ps-4">Quantity:</h6>
                        <p class="text-bold-color">{card.quantity} KG</p>
                    </div>
                    <hr className="line" />
                    <div class="footerCard">
                        <div class="hr">
                        </div>
                        <div class="md-button mb-4">
                            <Link to={`/view-request/${card.requests_id}`} class="button mb-3">Show</Link>
                        </div>
                    </div>

                </div>
            )
        })

        setRequests(arrRequests)
    }

    const handleMaterialTypeChange = (event) => {
        setMaterialType(event.target.value);
    };

    const handleConditionChange = (event) => {
        setSelectedCondition(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleMaxQuantityChange = (event) => {
        setMaxQuantity(Number(event.target.value));
    };
    const handleMinQuantityChange = (event) => {
        setMinQuantity(Number(event.target.value));
    };

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <Unauthorized />
    }

    return (
        <>
            <main>
                <Container>
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-center mt-5">
                                <div
                                    style={{
                                        position: "relative",
                                        width: "50%",
                                    }}
                                >
                                    <input
                                        style={{
                                            paddingLeft: '2.375rem'
                                        }}
                                        className='form-control'
                                        type="search"
                                        placeholder="Search By Title"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "0.5rem",
                                            transform: "translateY(-50%)",
                                        }}
                                    >
                                        <svg
                                            className="search-icon d-inline "
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
                                </div>
                            </div>
                        </Col>
                        <hr className='line my-4'></hr>
                        <Col lg="12">
                            <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
                                <select
                                    onChange={handleMaterialTypeChange}
                                    value={materialType}
                                    className="select-group form-select form-control"
                                >
                                    <option value="">Select material type</option>
                                    {[...new Set(data?.map((item) => item.material_type))]?.map((material_type) => (
                                        <option key={material_type} value={material_type}>
                                            {material_type}
                                        </option>
                                    )
                                    )}
                                </select>
                                <select
                                    onChange={handleConditionChange}
                                    value={selectedCondition}
                                    className="select-group form-select form-control"
                                >
                                    <option value="">Select Condition</option>
                                    {[...new Set(data?.map((item) => item.condition))]?.map(
                                        (condition) => (
                                            <option key={condition} value={condition}>
                                                {condition}
                                            </option>
                                        )
                                    )}
                                </select>
                                <select
                                    onChange={handleLocationChange}
                                    value={selectedLocation}
                                    className="select-group form-select form-control"
                                >
                                    <option value="">Select Location</option>
                                    {[...new Set(data?.map((item) => item.location))]?.map(
                                        (location) => (
                                            <option key={location} value={location}>
                                                {location}
                                            </option>
                                        )
                                    )}
                                </select>
                                <div className="d-flex align-items-center">
                                    <input
                                        placeholder="Min Quantity"
                                        name="Min"
                                        type="number"
                                        min="0"
                                        onChange={handleMinQuantityChange}
                                        className="select-group w-100 form-control"
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <input
                                        placeholder="Max Quantity"
                                        type="number"
                                        min={minQuantity}
                                        onChange={handleMaxQuantityChange}
                                        className="select-group w-100 form-control"
                                    />
                                </div>
                            </div>
                        </Col>
                        <hr className='line my-4'></hr>
                        <section class="container-requests">
                            <h1 class="text-first-color fw-bold">All {values?.UserInfo.role === 'company' ? 'your ' : ''}<span class="text-second-color">requests</span></h1>
                            <section class="requests-cards">
                                {requests}
                            </section>
                        </section>
                    </Row>
                </Container>
            </main>
        </>
    )
}
