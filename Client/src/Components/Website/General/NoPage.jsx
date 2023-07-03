import React from 'react'
import './../../../CSS/Add-Show-request.css'
import { Link } from 'react-router-dom'

export default function NoPage() {

  return (
    <>
      <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
          <h1 class="display-1 fw-bold"><span className='main-color'>4</span><span className='yellow-color'>0</span><span className='main-color'>4</span></h1>
          <p class="fs-3"><span class="main-color">Opps!</span> Page not found.</p>
          <p class="lead">
            The page you’re looking for doesn’t exist.
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
