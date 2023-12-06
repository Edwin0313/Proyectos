import { POKEMON } from "../Types/types";

export const PokeReducer = (state, action) => {
  switch (action.type) {
    case POKEMON.POKEMONS:
      return {
        ...state,
        pokemons: action.payload.pokemons,
        loading: action.payload.loading,
        nextRequest: action.payload.nextRequest,
      };
    case POKEMON.POKEMON:
      return {
        ...state,
        pokemon: action.payload.pokemon,
        loading: action.payload.loading,
      };
    case POKEMON.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
