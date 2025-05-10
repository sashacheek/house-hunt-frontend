// import "./PreviewImage.css"

function PreviewImage({ src }) {
    return (
        <div className="preview-image">
            <img src={src} />
        </div>
    )
}

export default PreviewImage;