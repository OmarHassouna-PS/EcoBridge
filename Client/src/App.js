import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import './CSS/App.css'

// General
import Loader from './Components/Website/General/Loader';
import Header from './Components/Website/General/Header';
import Footer from './Components/Website/General/Footer';
import NoPage from './Components/Website/General/NoPage';
import AuthContext from './Context/AuthContext';


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
const StationPortfolioForProduct = lazy(() => import('./Components/Website/ForProduct/StationPortfolio'))
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
        <Nav />
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Index />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/loader" element={<Loader />} />
            <Route path='/about' element={<About />} />
            <Route path='/achievements' element={<Achievements />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/recycle-right' element={<RecycleRight />} />
            <Route path='/view-request/:id' element={<ViewRequest />} />
            <Route path='/view-station/:id' element={<ViewStation />} />

            <Route path='/home-for-product' element={<HomeForProduct />} />
            <Route path='/add-request' element={<AddRequest />} />
            <Route path='/edit-request/:id' element={<AddRequest />} />
            <Route path='/show-requests' element={<ShowRequests />} />
            <Route path='/show-stations' element={<ShowStation />} />
            <Route path='/station-portfolio-for-product' element={<StationPortfolioForProduct />} />
            <Route path='/send-capture-request/:id' element={<SendCaptureRequest />} />

            <Route path='/home-for-station' element={<HomeForStation />} />
            <Route path='/update-price' element={<UpdatePrice />} />
            <Route path='/product-portfolio-for-station' element={<ProductPortfolioForStation />} />

            <Route path='/company_movements_history' element={<CompanyHistory />} />
            <Route path='/station_movements_history' element={<StationHistory />} />


            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/password-recovery' element={<PasswordRecovery />} />
            <Route path="/password-recovery/:token" element={<PasswordRecovery />} />
            <Route path='/security' element={<Security />} />
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
          </Route>
        </Routes>
        <Footer />
      </AuthContext>
    </BrowserRouter >
  );
}

export default App;

function Nav() {
  return (
    <>
      <nav className='d-flex' >
        <ul className='' style={{ listStyle: "none" }}>
          <li className='mt-2'><Link to={'/'}>index</Link></li>
          <li className='mt-2'><Link to={'/about'}>About</Link></li>
          <li className='mt-2'><Link to={'/contact'}>Contact</Link></li>
          <li className='mt-2'><Link to={'/achievements'}>Achievements</Link></li>
          <li className='mt-2'><Link to={'/loader'}>Loader</Link></li>
          <li className='mt-2'><Link to={'/confirmation'}>Confirmation</Link></li>
          <li className='mt-2'><Link to={'/recycle-right'}>RecycleRight</Link></li>
          <li className='mt-2'><Link to={'/view-post'}>ViewPost</Link></li>
        </ul>

        <ul style={{ listStyle: "none" }}>
          <p>for product</p>
          <li className='mt-2'><Link to={'/home-for-product'}>HomeForProduct</Link></li>
          <li className='mt-2'><Link to={'/add-request'}>AddRequest</Link></li>
          <li className='mt-2'><Link to={'/send-capture-request'}>SendCaptureRequest</Link></li>
          <li className='mt-2'><Link to={'/show-requests'}>ShowRequests</Link></li>
          <li className='mt-2'><Link to={'/station-portfolio-for-product'}>StationPortfolioForProduct</Link></li>
        </ul>

        <ul style={{ listStyle: "none" }}>
          <p>for station</p>
          <li className='mt-2'><Link to={'/home-for-station'}>HomeForStation</Link></li>
          <li className='mt-2'><Link to={'/product-portfolio-for-station'}>ProductPortfolioForStation</Link></li>
        </ul>
        <ul style={{ listStyle: "none" }}>
          <p>Users</p>
          <li className='mt-2'><Link to={'/portfolio'}>Portfolio</Link></li>
          <li className='mt-2'><Link to={'/security'}>Security</Link></li>
          <li className='mt-2'><Link to={'/password-recovery'}>PasswordRecovery</Link></li>
          <li className='mt-2'><Link to={'/signIn'}>SignIn</Link></li>
          <li className='mt-2'><Link to={'/signUp'}>SignUp</Link></li>
        </ul>
      </nav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  )
}

// function handleSliderImage(e) {
//   const files = Array.from(e.target.files);
//   setArrayimages((prevArray) => [...files]);
// }

// function deleteImage(index) {
//   setArrayimages((prevArray) => {
//     const newArray = [...prevArray];
//     newArray.splice(index, 1);
//     return newArray;
//   });
// }

// function createElements() {
//   return arrayimages.map((image, index) => (
//     <div className="swiper-slide" key={index}>
//       <div className="image">
//         <img src={URL.createObjectURL(image)} alt="image" />
//         <span onClick={() => deleteImage(index)}>&times;</span>
//       </div>
//     </div>
//   ));
// }