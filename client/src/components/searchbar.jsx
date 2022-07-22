import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemons } from "../store/actions";
import "./styles/SearchBar.css";


export default function SearchBar() {
  let dispatch = useDispatch();
  const [search, setSearch] = useState("");


  function onSubmit(e) {
    e.preventDefault();
      dispatch(searchPokemons(search));
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value.toLowerCase());
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="containe">
        <input className="searchh" type="text" onChange={onInputChange} placeholder="Buscar pokemon..." />
        <input className="buttton" type="submit" value="Buscar" />
        </div>
      </form>
    </div>
  );
}
