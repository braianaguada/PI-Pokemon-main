import React from "react";
import "./styles/Pokemon.css";

export default function Pokemon({ id, name, image, types }) {
  return (
    <div className="PokemonCard">
<div className="carddd">

      <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img src={image} alt="imagen" className="img" width="150px" height="150px"/>
      <div className="id">{id}</div>

        {types.map((e) => (

          <div className="conteinerr">

            <div className="normal">
              {e === "normal" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="fighting">
              {e === "fighting" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="flying">
              {e === "flying" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="poison">
              {e === "poison" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="rock">
              {e === "rock" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="bug">
              {e === "bug" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="ghost">
              {e === "ghost" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="steel">
              {e === "steel" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="fire">
              {e === "fire" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="water">
              {e === "water" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="grass">
              {e === "grass" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="electric">
              {e === "electric" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="psychic">
              {e === "psychic" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>{" "}
            <div className="ice">
              {e === "ice" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>{" "}
            <div className="dragon">
              {e === "dragon" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>{" "}
            <div className="dark">
              {e === "dark" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>{" "}
            <div className="fairy">
              {e === "fairy" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>{" "}
            <div className="unknown">
              {e === "unknown" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>{" "}
            <div className="shadow">
              {e === "shadow" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
            </div>
            <div className="ground">
              {e === "ground" ? e.charAt(0).toUpperCase() + e.slice(1) : " "}
              </div>

          </div>
        ))}

      </div>
    </div>
  );
}
