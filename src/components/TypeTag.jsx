function TypeTag({ type }) {
    return (
        <>
            {type == 0 ?
                <p className="buy">BUY</p> :
                <p className="rent">RENT</p>
            }
        </>
    )
}

export default TypeTag;