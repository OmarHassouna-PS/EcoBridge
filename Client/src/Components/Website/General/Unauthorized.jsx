import React, { useEffect } from 'react'
import './../../../CSS/Add-Show-request.css'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    return (
        <>
            <div class="d-flex align-items-center justify-content-center vh-100">
                <div class="text-center">
                    <h1 class="display-1 fw-bold"><span className='main-color'>4</span><span className='yellow-color'>0</span><span className='main-color'>1</span></h1>
                    <p class="fs-3"><span class="main-color">Opps!</span>Unauthorized access</p>
                    <p class="lead">
                        The page you are trying to access is not authorized by you.
                    </p>
                    <div class="md-button row mt-4 justify-content-center">
                        <Link to={"/"}>
                            <button type="submit" class="button p-0">Back ot Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
