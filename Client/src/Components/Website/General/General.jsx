import { Link } from 'react-router-dom'

function GetStarted() {
    return (
        <main>
        <section className="index-hero">
            <div className="index-hero-text">
                <span className="text-second-color">
                    <h1>
                        <span className="text-second-color">" </span>
                        <span className="text-first-color">Recycling</span> is essential for a
                        cleaner and more sustainable future. Let's make it a daily habit and
                        work together to build a
                        <span className="text-first-color">greener world</span>
                        <span className="text-second-color">"</span>
                    </h1>
                </span>
            </div>
            <div className="lg-button">
                <Link to={'/about'} className="text-center">
                    About us
                </Link>
            </div>
            <div className="get-started-card">
                <div className="index-hero-card">
                    <div className="index-hero-card-text">
                        <h3>Ready to get started?</h3>
                        <h4 className="black-text">Sign up or contact us</h4>
                    </div>
                    <div className="md-button row">
                        <Link to={'/SignUp'} className="button text-center first-btn col-12 col-sm-6">
                            Register now
                        </Link>
                        <Link
                            to={'/contact'}
                            className="button text-center col-12 col-sm-6 second-btn"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        <section className="index-achievements">
            <div className="index-achievements-card text-center px-4">
                <div className="index-achievements-field">
                    <h3 className="text-first-color fw-bold">40,000+</h3>
                    <h4 className="black-text">
                        kilograms of waste were collected through our site
                    </h4>
                </div>
                <div className="index-achievements-field">
                    <h3 className="text-first-color fw-bold">100,000+</h3>
                    <h4 className="black-text">
                        people we have helped and made them aware of the importance of waste
                        recycling
                    </h4>
                </div>
                <div className="index-achievements-field">
                    <h3 className="text-first-color fw-bold">10,000+</h3>
                    <h4 className="black-text">
                        transactions and orders completed on our website
                    </h4>
                </div>
            </div>
        </section>
        <section className="our-vision">
            <h1 className="text-first-color fw-bold">
                Our <span className="text-second-color">vision</span>
            </h1>
            <div className="our-vision-card text-center px-4">
                <div className="our-vision-field">
                    <div>
                        <img
                            className="our-vision-image"
                            src="Images/Our-vision1.jpg"
                            alt=""
                        />
                    </div>
                    <h4 className="black-text m-0">
                        Our vision is a world where waste is a valuable resource that can be
                        reused, recycled, or reused and a circular culture that reduces the
                        environmental impact of waste.
                    </h4>
                    <hr className="line" />
                </div>
                <div className="our-vision-field">
                    <div>
                        <img
                            className="our-vision-image"
                            src="Images/Our-vision2.jpg"
                            alt=""
                        />
                    </div>
                    <h4 className="black-text m-0">
                        We envision a future where waste producers and recycling stations work
                        hand in hand to create a closed-loop system where waste is transformed
                        into new products or raw materials
                    </h4>
                    <hr className="line" />
                </div>
                <div className="our-vision-field">
                    <div>
                        <img
                            className="our-vision-image"
                            src="Images/Our-vision3.jpg"
                            alt=""
                        />
                    </div>
                    <h4 className="black-text m-0">
                        Our goal is to create a network of waste producers and recycling
                        plants that cooperate to reduce waste, conserve resources and protect
                        the environment, and foster a sense of shared responsibility for a
                        sustainable future.
                    </h4>
                    <hr className="line" />
                </div>
            </div>
        </section>
        <section className="recycle-right">
            <div className="recycle-right-card">
                <div className="recycle-right-image">
                    <img className="" src="Images/Recycle-right.jpg" alt="" />
                </div>
                <div className="recycle-right-field">
                    <h1 className="text-first-color fw-bold mb-4">
                        Recycle <span className="text-second-color">right</span>
                    </h1>
                    <h4 className="black-text fw-bold">We are your recycling partner</h4>
                    <p className="black-text">
                        Every time you choose to recycle, you're giving that item a second
                        life to serve a new purpose and save natural resources. Now more than
                        ever, it’s important that only the right items, free from
                        contamination, make their way into your recycling bin.
                    </p>
                    <div className="md-button">
                        <Link
                            to={'/recycle-right'}
                            className="button text-center first-btn"
                        >
                            Learn more
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    </main>
    )
}

export default GetStarted