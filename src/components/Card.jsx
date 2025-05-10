import placeholder from "../img/placeholder.svg"
function Card({ listing }) {
    return (
        <div className="card">
            <img src={listing.pictures[0].get_url}></img>
            <div className="content">
                <p className="cost">$123,456</p>
                <div className="info">
                    <p>bd: 4</p>
                    <p>ba: 2.5</p>
                    <p>sqft: 1500</p>
                </div>
                <p className="address">{listing.address.street + ", " + listing.address.city + ", " + listing.address.state_code + " " + listing.address.zip_code}</p>
            </div>
        </div>
    )
}

export default Card; 