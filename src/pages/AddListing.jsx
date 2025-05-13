import Navigation from "../components/Navigation";
import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression"
import PreviewImages from "../components/PreviewImages"
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AddListing.css"


function AddListing() {
    const { id } = useParams();
    const [listing, setListing] = useState();

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [type, setType] = useState("")
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [sqft, setSqft] = useState("");
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("");


    const [images, setImages] = useState([]);
    const [displayImages, setDisplayImages] = useState([]);
    const [coverImage, setCoverImage] = useState();
    const [displayCover, setDisplayCover] = useState();

    const navigate = useNavigate();

    // Edit Listing

    useEffect(() => {
        if (id) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings/${id}`)
        .then(res => res.json())
        .then(data => setListing(data));
        }
    }, [id])

    useEffect(() => {
        if (listing) {
            setData();
        }
    }, [listing])
    

    const setData = () => {
        setStreet(listing.address.street);
        setCity(listing.address.city);
        setState(listing.address.state_code);
        setZipCode(listing.address.zip_code);
        setPrice(listing.price);
        setType(listing.type_id);
        setBathrooms(listing.bathrooms);
        setBedrooms(listing.bedrooms);
        setSqft(listing.square_ft);

        var newImages = [];
        listing.pictures.map((picture) => {
            if (picture.main_img) {
                setDisplayCover(picture.get_url);
            }
            else {
                newImages.push(picture.get_url);
            }
        })
        setDisplayImages(newImages);
            


        }

    // Add Listing

    const handleImagesChange = (e) => {
        let newImages = images.concat(Array.from(e.target.files));
        setImages(newImages);
        let newDisplayImages = newImages.map((image) => URL.createObjectURL(image));
        setDisplayImages(newDisplayImages);
    }

    const handleCoverChange = (e) => {
        let newCoverImage = e.target.files[0];
        setCoverImage(newCoverImage);
        let newDisplayCover = URL.createObjectURL(newCoverImage);
        setDisplayCover(newDisplayCover);
    }

    const compressImages = async (imgs) => {
        var compressedImages = [];
        for (var image of imgs) {
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

    const getFormData = async () => {
        const compressed = await compressImages(images);
        const coverList = await compressImages([coverImage]);
        const compressedCover = coverList[0];
        const formData = new FormData();

        formData.append("listing[type]", parseInt(type));
        formData.append("listing[bedrooms]", parseInt(bedrooms));
        formData.append("listing[bathrooms]", parseInt(bathrooms));
        formData.append("listing[square_ft]", parseFloat(sqft));
        formData.append("listing[price]", parseInt(price));
        formData.append("listing[description]", description);

        formData.append("address[street]", street);
        formData.append("address[city]", city);
        formData.append("address[state]", state);
        formData.append("address[zip_code]", parseInt(zipCode));

        formData.append("images[main]", compressedCover);
        compressed.forEach((img, idx) => {
            formData.append(`images[all][]`, img);
        });
        return formData
    }

    const handleEditSubmit = async () => {
        const formData = await getFormData();
        formData.append("address[id]", parseInt(listing.address.id))

        const authToken = localStorage.getItem("auth_token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        if (response.ok) {
            alert("listing edited successfully");
            navigate("/yourlistings");
        } else {
            alert("edit failed");
        }
    };

    const handleAddSubmit = async () => {
        // e.preventDefault();
        const formData = await getFormData();

        const authToken = localStorage.getItem("auth_token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        if (response.ok) {
            alert("listing added successfully");
            navigate("/yourlistings");
        } else {
            alert("addition failed");
        }
    };

    const handleDelete = async () => {
        const authToken = localStorage.getItem("auth_token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/listings/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        if (response.ok) {
            alert("listing deleted successfully");
            navigate("/yourlistings");
        } else {
            alert("deletion failed");
        }
    };

    return (
        <>
                <div id="add-listing">
                <h1>{id ? "Edit Listing" : "New Listing"}</h1>
                <form>
                    <section className="address">
                        <h2 className="form-header">Address</h2>
                        <div>
                            <input placeholder="Street" id="street" className="form-input" value={street} onChange={(e) => setStreet(e.target.value)}></input>
                            <input placeholder="City" id="city" className="form-input" value={city} onChange={(e) => setCity(e.target.value)}></input>
                            <input placeholder="ST" id="st" className="form-input" value={state} onChange={(e) => setState(e.target.value)}></input>
                            <input placeholder="Zip Code" id="zip-code" className="form-input" value={zipCode} onChange={(e) => setZipCode(e.target.value)}></input>
                        </div>
                    </section>
                    <section className="details">
                        <h2 className="form-header">Details</h2>
                        <div className="small-input">
                            <h3>Price</h3>
                            <input className="form-input" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                        </div>
                        <div>
                            <h3>Buy or Rent</h3>
                            <input type="radio" name="type" id="buy" value="0" checked={type == "0" ? true : false} onChange={(e) => setType(e.target.value)}></input>
                            <label for="buy">Buy</label>
                            <input type="radio" name="type" id="rent" value="1" checked={type == "1" ? true : false} onChange={(e) => setType(e.target.value)}></input>
                            <label for="rent">Rent</label>
                            <h3>Bedrooms</h3>
                            <input type="radio" name="beds" id="bd-1" value="1" checked={bedrooms == "1" ? true : false} onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-1">1</label>
                            <input type="radio" name="beds" id="bd-2" value="2" checked={bedrooms == "2" ? true : false} onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-2">2</label>
                            <input type="radio" name="beds" id="bd-3" value="3" checked={bedrooms == "3" ? true : false} onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-3">3</label>
                            <input type="radio" name="beds" id="bd-4" value="4" checked={bedrooms == "4" ? true : false} onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-4">4</label>
                            <input type="radio" name="beds" id="bd-5" value="5" checked={bedrooms == "5" ? true : false} onChange={(e) => setBedrooms(e.target.value)}></input>
                            <label for="bd-5">5+</label>
                        </div>
                        <div>
                            <h3>Bathrooms</h3>
                            <input type="radio" name="baths" id="ba-1" value="1" checked={bathrooms == "1" ? true : false} onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-1">1</label>
                            <input type="radio" name="baths" id="ba-2" value="2" checked={bathrooms == "2" ? true : false} onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-2">2</label>
                            <input type="radio" name="baths" id="ba-3" value="3" checked={bathrooms == "3" ? true : false} onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-3">3</label>
                            <input type="radio" name="baths" id="ba-4" value="4" checked={bathrooms == "4" ? true : false} onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-4">4</label>
                            <input type="radio" name="baths" id="ba-5" value="5" checked={bathrooms == "5" ? true : false} onChange={(e) => setBathrooms(e.target.value)}></input>
                            <label for="ba-5">5+</label>
                        </div>
                        <div className="small-input">
                            <h3>Square ft.</h3>
                            <input className="form-input" value={sqft} onChange={(e) => setSqft(e.target.value)}></input>
                        </div>
                    </section>
                    <section className="pictures">
                        <h2 className="form-header">Pictures</h2>
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
                        <h2 className="form-header">Description</h2>
                        <textarea onChange={(e) => setDescription(e.target.value)}></textarea>
                    </section>
                    <div className="buttons">
                        {id ? <button type="button" className="warning-button large-button" onClick={handleDelete}>DELETE</button> : <></>}
                        <Link className="large-button" to="/yourlistings">CANCEL</Link>
                        {id ? <button type="button" className="focus-button large-button" onClick={handleEditSubmit}>SUBMIT</button>
                        : <button type="button" className="focus-button large-button" onClick={handleAddSubmit}>SUBMIT</button>}
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddListing;