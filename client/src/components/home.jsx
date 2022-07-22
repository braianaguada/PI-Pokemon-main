import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPokemons,
  filterPokemonsByType,
  filterPokemonsByCreated,
  filterPokemonsByAlphabetical,
  filterPokemonsByAttack,
  getType,
} from "../store/actions";

import NavBar from "./navbar";
import Pokemon from "./pokemon.jsx";
import Paginado from "./pagination.jsx";

import Psiduck from "../psiduck1.gif"
import BackGroundVideo from "../Video/prueba3.mp4";
import "./styles/Home.css";

export default function Pokemons() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.filteredPokemons);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const pokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(getType());
  }, [dispatch]);

  function handleFilterType(e) {
    dispatch(filterPokemonsByType(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterPokemonsByCreated(e.target.value));
  }

  function handleFilterAttack(e) {
    dispatch(filterPokemonsByAttack(e.target.value));
  }

  function onSelectsChange(e) {
    dispatch(filterPokemonsByAlphabetical(e.target.value));
  }

  return (

    <div className="mainContainer">
      
      <div className="bgVideoCont">
        <video autoPlay loop muted className="myVideo">
          <source src={BackGroundVideo} type="video/mp4"></source>
        </video>
      </div>

      <NavBar />

      <div>
        <select onChange={onSelectsChange}>
          <option value="Filtro"> ORDENAR</option>
          <option value="ASCENDENTE">A-Z</option>
          <option value="DESCENDENTE">Z-A</option>
        </select>
        <select onChange={handleFilterAttack}>
          <option value="Fuerza"> ATAQUE </option>
          <option value="Mayor fuerza">Mayor ataque</option>
          <option value="Menor fuerza">Menor ataque</option>
        </select>
        <select onChange={handleFilterCreated}>
          <option value="Todos"> POKEMONS </option>
          <option value="Creados"> Creados </option>
          <option value="Existentes"> Existentes </option>
        </select>
        <select onChange={handleFilterType}>
          <option value="Type"> TIPO </option>
          <option value="normal"> Normal </option>
          <option value="flying"> Volador </option>
          <option value="poison"> Veneno </option>
          <option value="ground"> Tierra </option>
          <option value="bug"> Insecto </option>
          <option value="fire"> Fuego </option>
          <option value="water"> Agua </option>
          <option value="grass"> Planta </option>
          <option value="electric"> Electrico </option>
          <option value="fighting"> Lucha </option>
          <option value="rock"> Roca </option>
          <option value="ghost"> Fantasma </option>
          <option value="steel"> Acero </option>
          <option value="psychic"> Psiquico </option>
          <option value="ice"> Hielo </option>
          <option value="dragon"> Dragon </option>
          <option value="dark"> Oscuro </option>
          <option value="unkown"> Desconocido </option>
          <option value="fairy"> Hada </option>
          <option value="shadow"> Oscuro </option>
        </select>
      </div>

      <Paginado
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
      />

      <div className="pokemonsContainer">
        {pokemons?.map((pokemon) => {
          return (
            <Link className="linkStyle" to={"/home/" + pokemon.id}>
              <Pokemon
                name={pokemon.name}
                image={pokemon.image ? pokemon.image : Psiduck}
                id={pokemon.id}
                types={pokemon.types}
              />
            </Link>
          );
        }
        )}
      </div>

    </div>
  );
}
