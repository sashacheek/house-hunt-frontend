import { Link } from "react-router-dom";
import TypeTag from "../components/TypeTag";
function Card({ listing }) {
    return (
        <Link className="card" to={`/listing/${listing.id}`}>
            <img src={listing.pictures[0].get_url}></img>
            <div className="content">
                <p className="cost">${parseInt(listing.price).toLocaleString()}</p>
                <div className="info">
                    <p>Beds: {listing.bedrooms}</p>
                    <p>Baths: {listing.bathrooms}</p>
                    <p>Sqft: {listing.square_ft}</p>
                </div>
                <p className="address">{listing.address.street + ", " + listing.address.city + ", " + listing.address.state_code + " " + listing.address.zip_code}</p>
                <TypeTag type={listing.type_id} />
            </div>
        </Link>
    )
}

export default Card; 