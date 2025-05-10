import Card from "./Card";
import { useState, useEffect } from "react";

function Cards() {
      const [listings, setListings] = useState([]);
        useEffect(() => {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => setListings(data))
            .catch(error => console.error('Error fetching addresses:', error));
        }, []);
    return (
        <div className="cards">
            { listings.map((listing) => (
                <Card listing={listing} />
            ))}
        </div>
    )
}

export default Cards;