import React, { useEffect, useState } from 'react'
import '../../../CSS/About-Achievements.css'
import api from '../../../AxiosConfig/contacts';

export default function Achievements() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const [data, setData] = useState([]);

      async function getGeneralStats() {
      
          try {
            const res = await api.get(`general_stats`);
  
            setData(res.data);
  
          } catch (error) {
            console.error("Error fetching data:", error);
  
          }
        }
  
        useEffect(() => {
          getGeneralStats()
        }, []);
    return (
        <>
            <main>
                <section className="achievements">
                    <h1 className="text-first-color fw-bold">
                        Our <span className="text-second-color">achievements</span>
                    </h1>
                    <div className="image-achievements">
                        <img className="" src="../Images/Our-goals.jpg" alt="Our-goals" />
                    </div>
                    <div className="achievements-card">
                        <div className="achievements-field">
                            <h3 className="text-first-color ">
                               {data?.countAmountWaste?.totalquantity}<span className="text-second-color">+</span>
                            </h3>
                            <h4 className="black-text">
                                kilograms of waste were collected through our site
                            </h4>
                        </div>
                        <hr className="line" />
                        <div className="achievements-field">
                            <h3 className="text-first-color ">
                                {data?.countAmountWaste?.totalrequests}<span className="text-second-color">+</span>
                            </h3>
                            <h4 className="black-text">
                                Existing requests on our site
                            </h4>
                        </div>
                        <hr className="line" />
                        <div className="achievements-field">
                            <h3 className="text-first-color">
                                {data?.countCaptureRequest?.totalcapturerequest}<span className="text-second-color">+</span>
                            </h3>
                            <h4 className="black-text">
                                transactions and orders completed on our website
                            </h4>
                        </div>
                        <hr className="line" />
                    </div>
                </section>
            </main>
        </>
    )
}
