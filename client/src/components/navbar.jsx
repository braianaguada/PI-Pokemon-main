import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import "./styles/NavBar.css";

export default function NavBar() {
  return (
    <div class="navbarr">
      <Link to="/" class="texto">
        <img src="https://i.imgur.com/avg4dfp.png" alt="img" />
      </Link>
      <SearchBar />
      <Link to="/create" class="texxto">
        CREAR
      </Link>
    </div>
  );
}
