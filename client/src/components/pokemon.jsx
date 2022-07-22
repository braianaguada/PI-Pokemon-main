import React from "react";
import "./styles/Pokemon.css";

export default function Pokemon({ id, name, image, types}) {

  return (
    <div className="PokemonCard">

      <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img
        src={image}
        alt="imagen"
        className="img"
        width="150px"
        height="150px"
      />
      <div className="id">{id}</div>

      <ul className="typeStyle">
        <h3>
        {typeof types[0] === "string"? types[0].charAt(0).toUpperCase() + types[0].slice(1): types[0]?.name}
        {typeof types[1] === "string"? " - " + types[1].charAt(0).toUpperCase() + types[1].slice(1): types[1]?.name}
        </h3>
      </ul>

    </div>
  );
}
