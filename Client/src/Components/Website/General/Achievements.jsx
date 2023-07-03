import React from 'react'
import '../../../CSS/About-Achievements.css'

export default function Achievements() {
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
                                40,000<span className="text-second-color">+</span>
                            </h3>
                            <h4 className="black-text">
                                kilograms of waste were collected through our site
                            </h4>
                        </div>
                        <hr className="line" />
                        <div className="achievements-field">
                            <h3 className="text-first-color ">
                                100,000<span className="text-second-color">+</span>
                            </h3>
                            <h4 className="black-text">
                                people we have helped and made them aware of the importance of waste
                                recycling
                            </h4>
                        </div>
                        <hr className="line" />
                        <div className="achievements-field">
                            <h3 className="text-first-color">
                                10,000<span className="text-second-color">+</span>
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
