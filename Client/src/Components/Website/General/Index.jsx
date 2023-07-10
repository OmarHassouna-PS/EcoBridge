import React, { useContext } from 'react'
import './../../../CSS/index.css'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/AuthContext';

import LandingPage from './LandingPage'
import Station from '../../Website/ForStation/Home'
import Product from '../../Website/ForProduct/Home'

export default function Home() {
    const values = useContext(Context);

    switch (values.UserInfo?.role) {
        case 'company':
            return <Product />
        case 'station':
            return <Station />
        default:
            return <LandingPage />
    }
}
