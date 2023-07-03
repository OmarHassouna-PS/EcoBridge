import React from 'react'
import '../../../CSS/Recycle-right.css'

export default function RecycleRight() {
    return (
        <>
            <main>
                <section className="container-recycle-right">
                    <section className="main-recycle-right">
                        <h1 className="text-first-color fw-bold">
                            Recycle <span className="text-second-color">right</span>
                        </h1>
                        <div className="main-text">
                            <h4 className="text-first-color fw-bold">
                                We are your recycling partner
                            </h4>
                            <p className="text-bold-color">
                                Every time you choose to recycle, you're giving that item a second
                                life to serve a new purpose and save natural resources. Now more than
                                ever, it’s important that only the right items, free from
                                contamination, make their way into your recycling bin.
                            </p>
                        </div>
                        <div className="main-image">
                            <img src="../Images/Recycle-right-page.jpg" alt="Recycle right" />
                        </div>
                    </section>
                    <section className="rules">
                        <h2 className="text-first-color fw-bold">
                            Three <span className="text-second-color">Basic Rules</span>
                        </h2>
                        <p className="text-bold-color">
                            Knowing these rules and putting them into practice will help you recycle
                            more efficiently. And it will help to ensure everything that makes it
                            into your bin finds a second life.
                        </p>
                        <div className="rules-cards">
                            <div className="rules-card">
                                <div className="rules-image">
                                    <img src="../Images/Rules-1.jpg" alt="" />
                                </div>
                                <h4 className="text-bold-color m-0">
                                    Recycle bottles, cans, paper and cardboard.
                                </h4>
                                <hr className="line" />
                            </div>
                            <div className="rules-card">
                                <div className="rules-image">
                                    <img src="../Images/Rules-2.jpg" alt="" />
                                </div>
                                <h4 className="text-bold-color m-0">
                                    Keep food and liquid out of your recycling.
                                </h4>
                                <hr className="line" />
                            </div>
                            <div className="rules-card">
                                <div className="rules-image">
                                    <img src="../Images/Rules-3.jpg" alt="" />
                                </div>
                                <h4 className="text-bold-color m-0">
                                    No loose plastic bags and no bagged recyclables.
                                </h4>
                                <hr className="line" />
                            </div>
                        </div>
                    </section>
                    <section className="step">
                        <h2 className="text-first-color fw-bold">
                            Become a <span className="text-second-color">Recycling Expert</span>
                        </h2>
                        <p className="text-bold-color">
                            Follow the instructions below to make recycling right and more
                            efficient.
                        </p>
                        <div className="step-cards">
                            <div className="step-card">
                                <p className="text-bold-color">STEP 1</p>
                                <h3 className="text-first-color fw-bold">
                                    Know what <span className="text-second-color">can be recycled</span>
                                </h3>
                                <p className="text-bold-color">
                                    Before disposing of waste, educate yourself on what items can and
                                    cannot be recycled in your area. Common items that can be recycled
                                    include paper, cardboard, plastic bottles, and aluminum cans.
                                </p>
                                <div className="hr">
                                    <hr className="line" />
                                </div>
                            </div>
                            <div className="step-card">
                                <p className="text-bold-color">STEP 2</p>
                                <h3 className="text-first-color fw-bold">
                                    Clean and{" "}
                                    <span className="text-second-color">prepare materials</span>
                                </h3>
                                <p className="text-bold-color">
                                    Before recycling, clean and prepare materials as necessary. This can
                                    involve removing food or liquid residue from containers, flattening
                                    cardboard boxes, or removing lids from plastic containers.
                                </p>
                                <div className="hr">
                                    <hr className="line" />
                                </div>
                            </div>
                            <div className="step-card">
                                <p className="text-bold-color">STEP 3</p>
                                <h3 className="text-first-color fw-bold">
                                    Use appropriate{" "}
                                    <span className="text-second-color">containers</span>
                                </h3>
                                <p className="text-bold-color">
                                    Use designated recycling bins or containers to dispose of recyclable
                                    materials. Make sure to separate materials by type, such as paper,
                                    plastic, and glass.
                                </p>
                                <div className="hr">
                                    <hr className="line" />
                                </div>
                            </div>
                            <div className="step-card">
                                <p className="text-bold-color">STEP 4</p>
                                <h3 className="text-first-color fw-bold">
                                    Do not{" "}
                                    <span className="text-second-color">contaminate materials</span>
                                </h3>
                                <p className="text-bold-color">
                                    Do not mix non-recyclable materials with recyclable materials, as
                                    this can contaminate the entire batch and render it non-recyclable.
                                    Common examples of non-recyclable materials include plastic bags,
                                    Styrofoam, and food waste.
                                </p>
                                <div className="hr">
                                    <hr className="line" />
                                </div>
                            </div>
                            <div className="step-card">
                                <p className="text-bold-color">STEP 5</p>
                                <h3 className="text-first-color fw-bold">
                                    Reduce and <span className="text-second-color">reuse</span>
                                </h3>
                                <p className="text-bold-color">
                                    Recycling is just one aspect of a sustainable lifestyle. Consider
                                    ways to reduce and reuse materials in your daily life, such as using
                                    reusable bags, water bottles, and food containers.
                                </p>
                                <div className="hr">
                                    <hr className="line" />
                                </div>
                            </div>
                            <div className="step-card">
                                <p className="text-bold-color">STEP 6</p>
                                <h3 className="text-first-color fw-bold">
                                    Spread the <span className="text-second-color">word</span>
                                </h3>
                                <p className="text-bold-color">
                                    Educate friends, family, and coworkers on the importance of
                                    recycling and how to do it properly. Encourage others to get
                                    involved and make recycling a collective effort.
                                </p>
                                <div className="hr">
                                    <hr className="line" />
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </main>
        </>
    )
}
