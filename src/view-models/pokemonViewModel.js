import { useContext } from "react";
import { PokeContext } from "../store/PokeContext";

const pokemonViewModel = () => {
  const {
    pokemons,
    loading,
    setloading,
    getPokemons,
    getPokemonById,
    getMorePokemons,
  } = useContext(PokeContext);
  return {
    pokemons,
    loading,
    setloading,
    getPokemons,
    getPokemonById,
    getMorePokemons,
  };
};

export default pokemonViewModel;
