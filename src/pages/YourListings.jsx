import "./YourListings.css";
import ListingBox from "../components/ListingBox";
import ListingBoxSmall from "../components/ListingBoxSmall";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function YourListings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const authToken = localStorage.getItem("auth_token");
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listers`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => setListings(data))
            .catch(error => console.error('Error fetching listings:', error));
        }, []);

    return (
        <>
            <div id="your-listings">
                <h1>Your Listings</h1>
                <div className="listings">
                    <Link to="/newlisting" className="listing add-listing-button">
                        <div>
                            <p className="plus">+</p>
                            <p className="add-text">ADD NEW</p>
                        </div>
                    </Link>
                    {listings.map((listing) =>
                        <>
                            <ListingBox listing={listing} />
                            <ListingBoxSmall listing={listing} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default YourListings;