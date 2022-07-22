import axios from "axios";
export const FETCH_POKEMONS = "FETCH_POKEMONS";
export const SEARCH_POKEMONS = "SEARCH_POKEMONS";
export const GET_TYPE = "GET_TYPE";
export const FILTER_BY_ALPHABETICAL = "FILTER_BY_ALPHABETICAL";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const FILTER_CREATED = "FILTER_CREATED";

export function fetchPokemons() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/pokemons/")
      .then((pokemons) => {
        dispatch({
          type: FETCH_POKEMONS,
          payload: pokemons.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getType() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/types")
      .then((types) => {
        dispatch({
          type: GET_TYPE,
          payload: types.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
//!------------------PROMESA----------------------
export function searchPokemons(search) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/pokemons?name=" + search)
      .then((pokemons) => {
        dispatch({
          type: SEARCH_POKEMONS,
          payload: pokemons.data,
        });
      })
      .catch((error) => {
        return alert("No se pudo encontrar Pokemon");
      });
  };
}
//!----------------ASYNC AWAIT----------------
// export function searchPokemons(search) {
//   return async function (dispatch) {
//     try {
//       const pokemons = await axios.get("http://localhost:3001/api/pokemons?name=" + search)
//       return dispatch ({
//         type: SEARCH_POKEMONS,
//         payload: pokemons.data,
//       })
//     } catch {
//       return alert("No se encontró el pokemon");
//     }
//   }
// }
//!-----------------------------------------

export function addPokemon(payload) {
  return async function () {
    const response = await axios.post(
      "http://localhost:3001/api/pokemons",
      payload
    );
    return response;
  };
}

export function filterPokemonsByAlphabetical(payload) {
  return {
    type: FILTER_BY_ALPHABETICAL,
    payload,
  };
}

export function filterPokemonsByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

export function filterPokemonsByCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function filterPokemonsByAttack(payload) {
  return {
    type: FILTER_BY_ATTACK,
    payload,
  };
}
