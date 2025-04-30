import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

function YourListings() {
    return (
        <div id="your-listings">
            <Navigation />
            <h1>Your Listings</h1>
            <div className="listings">
                <Link to="/">
                    <div>
                        <p>+</p>
                        <p>ADD NEW</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default YourListings;