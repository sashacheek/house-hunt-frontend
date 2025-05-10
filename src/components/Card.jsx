import { Link } from "react-router-dom";
function Card({ listing }) {
    return (
        <Link className="card" to={`/listing/${listing.id}`}>
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
        </Link>
    )
}

export default Card; 