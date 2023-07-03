import React from 'react'
import '../../../CSS/About-Achievements.css'

export default function About() {
    return (
        <>
            <main>
                <section className="about-us">
                    <h1 className="text-first-color fw-bold">
                        About <span className="text-second-color">Us</span>
                    </h1>
                    <div className="image-about-us">
                        <img className="" src="../Images/About-us.jpg" alt="" />
                    </div>
                    <div className="about-us-field">
                        <p className="black-text">
                            We strive to bridge the gap between waste products and recycling plants.
                            Our mission is to provide a crucial link in the recycling process by
                            collecting, sorting, and preparing waste materials for processing into
                            valuable new products. At our site, we are committed to sustainability
                            and reducing the environmental impact of waste by diverting materials
                            from landfills and promoting the circular economy. We work with local
                            businesses and communities to encourage responsible waste management
                            practices and educate individuals on the importance of recycling. We are
                            proud to be part of the solution to the global waste crisis and look
                            forward to continuing to make a positive impact on our planet. Thank you
                            for joining us in our mission to create a more sustainable future for
                            generations to come..
                        </p>
                    </div>
                </section>
            </main>
        </>
    )
}
