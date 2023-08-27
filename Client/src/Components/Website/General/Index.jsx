import React, { useContext } from 'react'
import './../../../CSS/index.css'
import { Context } from '../../../Context/AuthContext';

import LandingPage from './LandingPage'
import Station from '../../Website/ForStation/Home'
import Product from '../../Website/ForProduct/Home'

import PrivateLayout from '../../../Layout/PrivateLayout';
import PublicLayout from './../../../Layout/PublicLayout';

export default function Home() {
    const values = useContext(Context);

    switch (values.UserInfo?.role) {
        case 'company':
            return (
                <PrivateLayout >
                    <Product />
                </PrivateLayout>
            )
        case 'station':
            return (
                <PrivateLayout >
                    <Station />
                </PrivateLayout>
            )
        default:
            return (
                <PublicLayout >
                    <LandingPage />
                </PublicLayout>
            )
    }
}
