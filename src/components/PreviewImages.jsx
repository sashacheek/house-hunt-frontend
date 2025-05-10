import PreviewImage from "./PreviewImage";

function PreviewImages({ images, addImage }) {
    return (
        <div className="preview-images">
                <div className="preview-image add-image-button">
                    <input type="file" multiple onChange={addImage}></input>
                    <p className="plus">+</p>
                    <p className="add-text">ADD NEW</p>
                </div>
            {images.map((src, index) => (
                <PreviewImage src={src} key={index} />
            ))}
        </div>
    )
}

export default PreviewImages;