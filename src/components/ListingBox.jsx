import { Link } from "react-router-dom";

function ListingBox({ listing }) {
    return (
        <Link to={`/editlisting/${listing.id}`} className="listing listing-box">
            <div className="content">
                <h3 className="cost">${parseInt(listing.price).toLocaleString()}</h3>
                <div className="info">
                    <p>Beds: {listing.bedrooms}</p>
                    <p>Baths: {listing.bathrooms}</p>
                    <p>Sqft: {listing.square_ft}</p>
                </div>
                <p className="address">{listing.address.street + ", " + listing.address.city + ", " + listing.address.state_code + " " + listing.address.zip_code}</p>
            </div>
            <img src={listing.pictures[0].get_url}></img>
        </Link>
    )
}

export default ListingBox;