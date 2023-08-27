import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './CSS/App.css'

// General
import Loader from './Components/Website/General/Loader';
import Header from './Components/Website/General/Header';
import Footer from './Components/Website/General/Footer';
import NoPage from './Components/Website/General/NoPage';
import AuthContext from './Context/AuthContext';

import PublicLayout from './Layout/PublicLayout';
import PrivateLayout from './Layout/PrivateLayout';


const Index = lazy(() => import('./Components/Website/General/Index'))
const About = lazy(() => import('./Components/Website/General/About'))
const Achievements = lazy(() => import('./Components/Website/General/Achievements'))
const Contact = lazy(() => import('./Components/Website/General/Contact'))
const Confirmation = lazy(() => import('./Components/Website/General/Confirmation'))
const RecycleRight = lazy(() => import('./Components/Website/General/RecycleRight'))
const ViewRequest = lazy(() => import('./Components/Website/General/ViewRequest'))
const ViewStation = lazy(() => import('./Components/Website/General/ViewStation'))

const HomeForProduct = lazy(() => import('./Components/Website/ForProduct/Home'))
const AddRequest = lazy(() => import('./Components/Website/ForProduct/AddRequest'))
const Portfolio = lazy(() => import('./Components/Users/Portfolio'))
const SendCaptureRequest = lazy(() => import('./Components/Website/ForProduct/SendCaptureRequest'))
const ShowRequests = lazy(() => import('./Components/Website/General/ShowRequests'))
const ShowStation = lazy(() => import('./Components/Website/General/ShowStations'))
const ShowPortfolio = lazy(() => import('./Components/Website/General/ShowPortfolio'))
const CompanyHistory = lazy(() => import('./Components/Website/ForProduct/MovementsHistory'))



const HomeForStation = lazy(() => import('./Components/Website/ForStation/Home'))
const UpdatePrice = lazy(() => import('./Components/Website/ForStation/UpdatePrice'))
const ProductPortfolioForStation = lazy(() => import('./Components/Website/ForStation/ProductPortfolio'))
const StationHistory = lazy(() => import('./Components/Website/ForStation/MovementsHistory'))


const PasswordRecovery = lazy(() => import('./Components/Users/PasswordRecovery'))
const Security = lazy(() => import('./Components/Users/Security'))
const SignIn = lazy(() => import('./Components/Users/SignIn'))
const SignUp = lazy(() => import('./Components/Users/SignUp'))


function App() {

  return (
    <BrowserRouter>
      <AuthContext>
        <Routes>
          <Route path='/' element={<Header />}>
            
            <Route path='/signIn' element={
              <PublicLayout >
                <SignIn />
              </PublicLayout>

            } />
            <Route path='/signUp' element={
              <PublicLayout >
                <SignUp />
              </PublicLayout>

            } />

            <Route path="*" element={
              <PublicLayout >
                <NoPage />
              </PublicLayout>
            } />

            <Route index element={<Index />} />

            <Route path='/about' element={
              <PublicLayout >
                <About />
              </PublicLayout>
            } />

            <Route path='/achievements' element={
              <PublicLayout >
                <Achievements />
              </PublicLayout>
            } />

            <Route path='/contact' element={
              <PublicLayout >
                <Contact />
              </PublicLayout>

            } />
            <Route path='/confirmation' element={
              <PublicLayout >
                <Confirmation />
              </PublicLayout>

            } />
            <Route path='/recycle-right' element={
              <PublicLayout >
                <RecycleRight />
              </PublicLayout>
            } />

            <Route path='/view-request/:id' element={
              <PrivateLayout >
                <ViewRequest />
              </PrivateLayout>
            } />

            <Route path='/view-station/:id' element={
              <PrivateLayout >
                <ViewStation />
              </PrivateLayout>
            } />

            <Route path='/home-for-product' element={
              <PrivateLayout >
                <HomeForProduct />
              </PrivateLayout>
            } />

            <Route path='/add-request' element={
              <PrivateLayout >
                <AddRequest />
              </PrivateLayout>
            } />

            <Route path='/edit-request/:id' element={
              <PrivateLayout >
                <AddRequest />
              </PrivateLayout>
            } />

            <Route path='/show-requests' element={
              <PrivateLayout >
                <ShowRequests />
              </PrivateLayout>
            } />

            <Route path='/show-stations' element={
              <PrivateLayout >
                <ShowStation />
              </PrivateLayout>
            } />

            <Route path='/station-portfolio-for-product' element={
              <PrivateLayout >
                <ShowPortfolio />
              </PrivateLayout>
            } />

            <Route path='/send-capture-request/:id' element={
              <PrivateLayout >
                <SendCaptureRequest />
              </PrivateLayout>
            } />

            <Route path='/home-for-station' element={
              <PrivateLayout >
                <HomeForStation />
              </PrivateLayout>
            } />

            <Route path='/update-price' element={
              <PrivateLayout >
                <UpdatePrice />
              </PrivateLayout>
            } />

            <Route path='/product-portfolio-for-station' element={
              <PrivateLayout >
                <ProductPortfolioForStation />
              </PrivateLayout>
            } />

            <Route path='/company_movements_history' element={
              <PrivateLayout >
                <CompanyHistory />
              </PrivateLayout>

            } />

            <Route path='/station_movements_history' element={
              <PrivateLayout >
                <StationHistory />
              </PrivateLayout>

            } />


            <Route path='/portfolio' element={
              <PrivateLayout >
                <Portfolio />
              </PrivateLayout>

            } />

            <Route path='/password-recovery' element={
              <PrivateLayout >
                <PasswordRecovery />
              </PrivateLayout>
            } />

            <Route path="/password-recovery/:token" element={
              <PrivateLayout >
                <PasswordRecovery />
              </PrivateLayout>
            } />

            <Route path='/security' element={
              <PrivateLayout >
                <Security />
              </PrivateLayout>
            } />

          </Route>
        </Routes>
        <Footer />
      </AuthContext>
    </BrowserRouter >
  );
}

export default App;

// function Nav() {
//   return (
//     <>
//       <nav className='d-flex' >
//         <ul className='' style={{ listStyle: "none" }}>
//           <li className='mt-2'><Link to={'/'}>index</Link></li>
//           <li className='mt-2'><Link to={'/about'}>About</Link></li>
//           <li className='mt-2'><Link to={'/contact'}>Contact</Link></li>
//           <li className='mt-2'><Link to={'/achievements'}>Achievements</Link></li>
//           <li className='mt-2'><Link to={'/loader'}>Loader</Link></li>
//           <li className='mt-2'><Link to={'/confirmation'}>Confirmation</Link></li>
//           <li className='mt-2'><Link to={'/recycle-right'}>RecycleRight</Link></li>
//           <li className='mt-2'><Link to={'/view-post'}>ViewPost</Link></li>
//         </ul>

//         <ul style={{ listStyle: "none" }}>
//           <p>for product</p>
//           <li className='mt-2'><Link to={'/home-for-product'}>HomeForProduct</Link></li>
//           <li className='mt-2'><Link to={'/add-request'}>AddRequest</Link></li>
//           <li className='mt-2'><Link to={'/send-capture-request'}>SendCaptureRequest</Link></li>
//           <li className='mt-2'><Link to={'/show-requests'}>ShowRequests</Link></li>
//           <li className='mt-2'><Link to={'/station-portfolio-for-product'}>StationPortfolioForProduct</Link></li>
//         </ul>

//         <ul style={{ listStyle: "none" }}>
//           <p>for station</p>
//           <li className='mt-2'><Link to={'/home-for-station'}>HomeForStation</Link></li>
//           <li className='mt-2'><Link to={'/product-portfolio-for-station'}>ProductPortfolioForStation</Link></li>
//         </ul>
//         <ul style={{ listStyle: "none" }}>
//           <p>Users</p>
//           <li className='mt-2'><Link to={'/portfolio'}>Portfolio</Link></li>
//           <li className='mt-2'><Link to={'/security'}>Security</Link></li>
//           <li className='mt-2'><Link to={'/password-recovery'}>PasswordRecovery</Link></li>
//           <li className='mt-2'><Link to={'/signIn'}>SignIn</Link></li>
//           <li className='mt-2'><Link to={'/signUp'}>SignUp</Link></li>
//         </ul>
//       </nav>
//       <Suspense fallback={<Loader />}>
//         <Outlet />
//       </Suspense>
//     </>
//   )
// }
