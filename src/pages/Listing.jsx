import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Listing() {
    const { id } = useParams();
    const [listing, setListing] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings/${id}`)
        .then(res => res.json())
        .then(data => setListing(data));
    }, [id])

    if (!listing) return <h1>Loading listing...</h1>

    return (
        <>
            <Navigation />
            <h1>{listing.address.street}</h1>
        </>
    )
}

export default Listing;