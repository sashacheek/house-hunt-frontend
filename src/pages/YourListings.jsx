import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

function YourListings() {
    return (
        <>
            <Navigation />
            <div id="your-listings">
                <h1>Your Listings</h1>
                <div className="listings">
                    <Link to="/newlisting">
                        <div>
                            <p>+</p>
                            <p>ADD NEW</p>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default YourListings;