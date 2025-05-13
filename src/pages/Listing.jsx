import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

function Listing() {
    const { id } = useParams();
    const [listing, setListing] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings/${id}`)
        .then(res => res.json())
        .then(data => setListing(data));
    }, [id])

    if (!listing) return <></>/* <h1 className="page-error">Loading listing...</h1> */

    const address = listing.address.street + ", " + listing.address.city + ", " + listing.address.state_code + " " + listing.address.zip_code;

    return (
        <>
            <Link className="return-link" to="/">&larr; go back</Link>
            <Carousel>
                {listing.pictures.map((image) => (
                    <div className="carousel-img-container">
                        <img src={image.get_url}></img>
                    </div>
                ))}
            </Carousel>
            <div className="listing-info">
            <div className="listing-top">
                <h3>${parseInt(listing.price).toLocaleString()}</h3>
                <div className="listing-top-right">
                    <div>
                        <h3 className="listing-top-right-heading">4</h3>
                        <p>beds</p>
                    </div>
                         <div>
                        <h3>2</h3>
                        <p>baths</p>
                    </div>
                        <div>
                        <h3>1250</h3>
                        <p>sqft</p>
                    </div>
                </div>
            </div>
                <p className="address">{address}</p>
                <h2>Description</h2>
                <p>sfjksdhfldsjkfb</p>
                <h2>Contact</h2>
                <div className="lister-info">
                    {/* <p>Lister: SDjfksd Lhdkalf</p> */}
                    <p>Email: email@email.email</p>
                    {/* <p>Phone: 111-222-3333</p> */}
                </div>
            </div>
        </>
    )
}

export default Listing;