import { Link } from "react-router-dom";

export default function GetStationCards() {
    const stationInfo = [
        {
            id: 1,
            image: "../Images/user.png",
            stationName: 'Green Park',
            acceptableMaterials: ['paper', 'cardboard', 'plastic'],
            condition: 'available',
            location: '123 Main St.',
            capacity: 100,
            additionalInfo: 'Open Monday-Saturday, 9am-5pm',
            images: ["./../../../../public/Images/Cardboard.jpg", "./../../../../public/Images/Oils.jpg"]
        },
        {
            id: 2,
            image: "../Images/user.png",
            stationName: 'Eco-Friendly Depot',
            acceptableMaterials: ['glass', 'aluminum', 'steel'],
            condition: 'unavailable',
            location: '456 Elm St.',
            capacity: 75,
            additionalInfo: 'Closed for renovations until further notice',
            images: ["./../../../../public/Images/Plastic.jpg", "./../../../../public/Images/Glass.jpg"]
        },
        {
            id: 3,
            image: "../Images/user.png",
            stationName: 'Clean Earth Center',
            acceptableMaterials: ['electronics', 'batteries', 'light bulbs'],
            condition: 'full',
            location: '789 Oak St.',
            capacity: 50,
            additionalInfo: 'Please check back later for availability',
            images: ["../Images/Plastic.jpg", "../Images/Oils.jpg"]
        }
    ];

    let arr =  stationInfo.map((station) => {
        return (
            <div key={station.id} class="swiper-slide requests-card">
                <div class="ribbon ribbon-top-left"><span>ID</span></div>
                <div class="user-image">
                    <img src={station.image} alt={station.stationName} />
                </div>
                <div class="content">
                    <h3 class="text-first-color fw-bold">{station.stationName}</h3>
                    <hr class="line" />
                    <h5 class="text-first-color">Acceptable materials type :</h5>
                    <p class="text-bold-color">{station.acceptableMaterials}</p>
                    <hr class="line" />
                    <h5 class="text-first-color">Condition :</h5>
                    <p class="text-bold-color">{station.condition}</p>
                    <hr class="line" />
                    <h5 class="text-first-color">Location :</h5>
                    <p class="text-bold-color">{station.location}</p>
                    <hr class="line" />
                    <h5 class="text-first-color">Capacity per day:</h5>
                    <p class="text-bold-color">{station.capacity} KG</p>
                </div>
                <div class="footerCard">
                    <div class="hr">
                        <hr class="line" />
                    </div>
                    <div class="md-button">
                        <Link to={`/send-capture-request?id=${station.id}`} class="button">Show</Link>
                    </div>
                </div>
            </div>
        )
    })
    return arr;
}
