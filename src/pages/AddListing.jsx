import Navigation from "../components/Navigation";
import { useState } from "react";

function AddListing() {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [bedrooms, setBedrooms] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authToken = localStorage.getItem("auth_token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ 
                listing: {
                    bedrooms: parseInt(bedrooms)
                },
                address: {
                    street: street,
                    city: city,
                    state: state
                }
            })
        });

        if (response.ok) {
            alert("listing added");
        } else {
            alert("addition failed");
        }
    };
    return (
        <>
            <Navigation />
                <div id="add-listing">
                <form onSubmit={handleSubmit}>
                    <section className="address">
                        <h2>Address</h2>
                        <div>
                            <input placeholder="Street" id="street" className="form-input" value={street} onChange={(e) => setStreet(e.target.value)}></input>
                            <input placeholder="City" id="city" className="form-input" value={city} onChange={(e) => setCity(e.target.value)}></input>
                            <input placeholder="ST" id="st" className="form-input" value={state} onChange={(e) => setState(e.target.value)}></input>
                            <input placeholder="Zip Code" id="zip-code" className="form-input"></input>
                        </div>
                    </section>
                    <section className="details">
                        <h2>Details</h2>
                        <div>
                            <h3>Bedrooms</h3>
                            <input type="radio" name="beds" id="bd-1" value="1" onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-1">1</label>
                            <input type="radio" name="beds" id="bd-2" value="2" onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-2">2</label>
                            <input type="radio" name="beds" id="bd-3" value="3" onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-3">3</label>
                            <input type="radio" name="beds" id="bd-4" value="4" onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-4">4</label>
                            <input type="radio" name="beds" id="bd-5" value="5" onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-5">5+</label>
                        </div>
                        <div>
                            <h3>Bathrooms</h3>
                            <input type="radio" name="baths" id="ba-1"></input>
                            <label for="ba-1">1</label>
                            <input type="radio" name="baths" id="ba-2"></input>
                            <label for="ba-2">2</label>
                            <input type="radio" name="baths" id="ba-3"></input>
                            <label for="ba-3">3</label>
                            <input type="radio" name="baths" id="ba-4"></input>
                            <label for="ba-4">4</label>
                            <input type="radio" name="baths" id="ba-5"></input>
                            <label for="ba-5">5+</label>
                        </div>
                        <div className="sqft">
                            <h3>Square ft.</h3>
                            <input className="form-input"></input>
                        </div>
                    </section>
                    <section className="pictures">
                        <h2>Pictures</h2>
                        <h3>Cover image</h3>
                        <h3>Images</h3>
                    </section>
                    <section className="description">
                        <h2>Description</h2>
                        <textarea></textarea>
                    </section>
                    <div className="buttons">
                        <button className="warning-button">DELETE</button>
                        <button>CANCEL</button>
                        <button type="submit" className="focus-button">SUBMIT</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddListing;