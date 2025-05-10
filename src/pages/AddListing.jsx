import Navigation from "../components/Navigation";
import { useState } from "react";
import imageCompression from "browser-image-compression"
import PreviewImages from "../components/PreviewImages"
import "./AddListing.css"


function AddListing() {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [type, setType] = useState("")
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [sqft, setSqft] = useState("");
    const [description, setDescription] = useState("");


    const [images, setImages] = useState([]);
    const [displayImages, setDisplayImages] = useState([]);
    const [coverImage, setCoverImage] = useState();
    const [displayCover, setDisplayCover] = useState();

    const handleImagesChange = (e) => {
        var newImages = images.concat(Array.from(e.target.files));
        setImages(newImages);
        var newDisplayImages = newImages.map((image) => URL.createObjectURL(image));
        setDisplayImages(newDisplayImages);
    }

    const handleCoverChange = (e) => {
        var newCoverImage = e.target.files[0];
        setCoverImage(newCoverImage);
        var newDisplayCover = URL.createObjectURL(newCoverImage);
        setDisplayCover(newDisplayCover);
    }

    const compressImages = async () => {
        var compressedImages = [];
        for (var image of images) {
            const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
            useWebWorker: true
            };
            try {
                const compressed = await imageCompression(image, options);
                compressedImages.push(compressed);
            } catch (err) {
                console.error("Compression error:", err);
                compressedImages.push(image);
            }
        }
        return compressedImages;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const compressed = await compressImages();
        setImages(compressed);

        const authToken = localStorage.getItem("auth_token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify({ 
                listing: {
                    type: parseInt(type),
                    bedrooms: parseInt(bedrooms),
                    bathrooms: parseInt(bathrooms),
                    square_ft: parseFloat(sqft),
                    description: description
                },
                address: {
                    street: street,
                    city: city,
                    state: state
                },
                images: {
                    main: coverImage,
                    all: images
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
                            <h3>Buy or Rent</h3>
                            <input type="radio" name="type" id="buy" value="0" onChange={(e) => setType(e.target.value)}></input>
                            <label for="buy">Buy</label>
                            <input type="radio" name="type" id="rent" value="1" onChange={(e) => setType(e.target.value)}></input>
                            <label for="rent">Rent</label>
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
                            <input type="radio" name="baths" id="ba-1" value="1" onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-1">1</label>
                            <input type="radio" name="baths" id="ba-2" value="2" onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-2">2</label>
                            <input type="radio" name="baths" id="ba-3" value="3" onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-3">3</label>
                            <input type="radio" name="baths" id="ba-4" value="4" onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-4">4</label>
                            <input type="radio" name="baths" id="ba-5" value="5" onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-5">5+</label>
                        </div>
                        <div className="sqft">
                            <h3>Square ft.</h3>
                            <input className="form-input" onChange={(e) => setSqft(e.target.value)}></input>
                        </div>
                    </section>
                    <section className="pictures">
                        <h2>Pictures</h2>
                        <h3>Cover image</h3>
                        <div className="preview-images">
                            <div className="preview-image add-image-button">
                                <input type="file" multiple onChange={handleCoverChange}></input>
                                <p className="plus">+</p>
                                <p className="add-text">ADD NEW</p>
                            </div>
                            <div className="preview-image">
                                { displayCover ? <img src={displayCover}/> : <></>}
                            </div>
                        </div>
                        <h3>Images</h3>
                        <PreviewImages images={displayImages} addImage={handleImagesChange} />
                    </section>
                    <section className="description">
                        <h2>Description</h2>
                        <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                    </section>
                    <div className="buttons">
                        <button className="warning-button large-button">DELETE</button>
                        <button className="large-button">CANCEL</button>
                        <button type="submit" className="focus-button large-button">SUBMIT</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddListing;