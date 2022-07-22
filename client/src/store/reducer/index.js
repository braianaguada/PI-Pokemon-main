import {
  FETCH_POKEMONS,
  SEARCH_POKEMONS,
  GET_TYPE,
  FILTER_BY_ALPHABETICAL,
  FILTER_BY_TYPE,
  FILTER_BY_ATTACK,
  FILTER_CREATED,
} from "../actions";

const initialState = {
  pokemons: [],
  types: [],
  filteredPokemons: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload,
      };
    case SEARCH_POKEMONS:
      return {
        ...state,
        filteredPokemons: action.payload,
      };
    case GET_TYPE:
      return {
        ...state,
        types: action.payload,
      };

    //!---------------------FILTRO-----------------------
    case FILTER_BY_ALPHABETICAL:
      let filterAlphabetical = [...state.pokemons];
      filterAlphabetical = filterAlphabetical.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return action.payload === "ASCENDENTE" ? -1 : 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return action.payload === "ASCENDENTE" ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredPokemons:
          action.payload === "Filtro" ? state.pokemons : filterAlphabetical,
      };
    //!---------------------------------------------------------
    //!---------------------FILTRO-----------------------
    case FILTER_BY_ATTACK:
      let filterAttack = [...state.pokemons];
      filterAttack = filterAttack.sort((a, b) => {
        if (a.attack < b.attack) {
          return action.payload === "Mayor fuerza" ? 1 : -1;
        }
        if (a.attack > b.attack) {
          return action.payload === "Mayor fuerza" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        filteredPokemons:
          action.payload === "Fuerza" ? state.pokemons : filterAttack,
      };
    //!---------------------------------------------------------
    //!---------------------FILTRO-----------------------
    case FILTER_BY_TYPE:
      let filterTypes = [...state.pokemons];
      filterTypes =
        action.filterTypes === "Type" ? filterTypes : filterTypes.filter((e) => e.types.includes(action.payload));
      return {
        ...state,
        filteredPokemons:
          action.payload === "Type" ? state.pokemons : filterTypes,
      };
    //!---------------------------------------------------------
    //!---------------------FILTRO-----------------------
    case FILTER_CREATED:
      let filterCreated = [...state.pokemons];
      filterCreated =
        action.payload === "Creados"
          ? filterCreated.filter((e) => e.id.length > 5)
          : filterCreated.filter((e) => e.id <= 40);
      return {
        ...state,
        filteredPokemons:
        action.payload === "Todos" ? state.pokemons : filterCreated,
      };
    //!---------------------------------------------------------

    default:
      return state;
  }
}
