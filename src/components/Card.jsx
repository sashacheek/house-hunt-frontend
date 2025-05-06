import placeholder from "../img/placeholder.svg"
function Card() {
    return (
        <div className="card">
            <img src={placeholder}></img>
            <h2>$123,456</h2>
            <h3>bd: 4 ba: 2.5 sqft: 1000</h3>
            <h4>456 Bell St, Townsville, WY</h4>
        </div>
    )
}

export default Card; 