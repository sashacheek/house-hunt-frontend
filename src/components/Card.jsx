import placeholder from "../img/placeholder.svg"
function Card() {
    return (
        <div className="card">
            <img src={placeholder}></img>
            <div className="content">
                <p className="cost">$123,456</p>
                <div className="info">
                    <p>bd: 4</p>
                    <p>ba: 2.5</p>
                    <p>sqft: 1500</p>
                </div>
                <p className="address">456 Bell St, Townsville, WY</p>
            </div>
        </div>
    )
}

export default Card; 