import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getType, addPokemon } from "../store/actions/index.js";
import BackGroundVideo from "../Video/prueba3.mp4";
import "./styles/AddPokemon.css";

export default function AddPokemon() {
  const dispatch = useDispatch();
  const history = useHistory();
  const type = useSelector((state) => state.types);

  const [pokemon, setPokemon] = useState({
    name: "",
    image: "",
    life: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    type: [],
  });

  useEffect(() => {
    dispatch(getType());
  }, [dispatch]);

  function handleSelect(e) {
    if (pokemon.type.length < 2) {
      setPokemon({
        ...pokemon,
        type: [...pokemon.type, e.target.value],
      });
    }
  }

  function onInputChange(e) {
    e.preventDefault();
    if (e.target.name !== "name" || e.target.name !== "image") {
      if (e.target.value < 1) {
        alert("Minimo: 1");
        e.target.value = "";
      }
      if (e.target.value > 200) {
        alert("Maximo: 200");
        e.target.value = "";
      }
    }

    const pattern = new RegExp("^[A-Z]+$", "i");
    if (e.target.name === "name") {
      if (!pattern.test(e.target.value)) {
        alert("Ingrese solo letras");
        e.target.value = "";
      }
    }

    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!pokemon.name) {
      alert("Ingrese un nombre");
      return;
    }
    if(pokemon.image){
      const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/)
      if(!regex.test(pokemon.image)){
        alert("Ingrese URL valida");
        pokemon.image = "";
        return
      }
    }
    if(!pokemon.type.length){
      alert("Ingrese al menos un tipo")
      return
    }
    dispatch(addPokemon(pokemon));
    setPokemon({
      name: "",
      type: [],
      image: "",
      life: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
    });
    alert("Pokemon creado con exito");
    history.push("/home");
  }

  return (
    <div>
      <div className="bgVideoCont">
        <video autoPlay loop muted className="myVideo">
          <source src={BackGroundVideo} type="video/mp4"></source>
        </video>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <h3 className="title"> ¡Crea tu pokemon!</h3>
        <div> Nombre</div>
        <input
          onChange={onInputChange}
          value={pokemon.name}
          name="name"
          type="text"
          className="input"
        />
        <div>Imagen</div>
        <input
          onChange={onInputChange}
          name="image"
          type="text"
          value={pokemon.image}
          className="input"
        />
        <div>Vida</div>
        <input
          onChange={onInputChange}
          name="life"
          type="number"
          value={pokemon.life}
          className="input"
        />
        <div>Fuerza</div>
        <input
          onChange={onInputChange}
          name="attack"
          type="number"
          value={pokemon.attack}
          className="input"
        />
        <div>Defensa</div>
        <input
          onChange={onInputChange}
          name="defense"
          type="number"
          value={pokemon.defense}
          className="input"
        />
        <div>Velocidad</div>
        <input
          onChange={onInputChange}
          name="speed"
          type="number"
          value={pokemon.speed}
          className="input"
        />
        <div>Altura</div>
        <input
          onChange={onInputChange}
          name="height"
          type="number"
          value={pokemon.height}
          className="input"
        />
        <div>Peso</div>
        <input
          onChange={onInputChange}
          name="weight"
          type="number"
          value={pokemon.weight}
          className="input"
        />
        <p className="types-s">
          <select onChange={handleSelect}>
            {type.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>

          <ul>
            <li>{pokemon.type.map((e) => e + " ")}</li>
          </ul>
        </p>

        <Link to="/home">
          <button type="submit" className="buttton">
            Atrás
          </button>
        </Link>

        <button type="submit" className="buttton">
          Crear
        </button>
      </form>
    </div>
  );
}
