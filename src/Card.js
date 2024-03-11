import React from "react";

const Card = ({ name, imageUrl, id }) => {
    return (
        <img src={imageUrl} alt="card"/>
    )
}

export default Card;