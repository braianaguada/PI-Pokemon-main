import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BackGroundVideo from "../Video/prueba3.mp4";
import Psiduck from "../psiduck1.gif"
import "./styles/PokemonDetails.css";

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    axios.get("http://localhost:3001/api/pokemons/" + id).then((response) => {
      setPokemon(response.data);
    });
    return () => {
      setPokemon(null);
    };
  }, [id]);


  return (
    <div>

      <div className="bgVideoCont">
        <video autoPlay loop muted className="myVideo">
          <source src={BackGroundVideo} type="video/mp4"></source>
        </video>
      </div>

      <div className="contaainer">
        {pokemon ? (
          <>
            <div className="PokemonCarddd">
              <h3>{typeof pokemon.name === "string"?pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1):pokemon.name[0]?.name}</h3>
              <img src={pokemon.image ? pokemon.image : Psiduck} alt="imagen" />
              <h4>Vida: {pokemon.life}</h4>
              <h4>Ataque: {pokemon.attack}</h4>
              <h4>Defensa: {pokemon.defense}</h4>
              <h4>Velocidad: {pokemon.speed}</h4>
              <h4>Altura: {pokemon.height}</h4>
              <h4>Peso: {pokemon.weight}</h4>
              <h4>
                Tipo:{" "}
                {typeof pokemon.types[0] === "string"
                  ? pokemon.types[0].charAt(0).toUpperCase() +
                    pokemon.types[0].slice(1)
                  : pokemon.types[0]?.name}
                {typeof pokemon.types[1] === "string"
                  ? " - " +
                    pokemon.types[1].charAt(0).toUpperCase() +
                    pokemon.types[1].slice(1)
                  : pokemon.types[1]?.name}
              </h4>
            </div>

            <Link to="/home" class="buttton">
              Volver
            </Link>
          </>
        ) : (
          <div class="texxto">Cargando</div>
        )}
      </div>
    </div>
  );
}
