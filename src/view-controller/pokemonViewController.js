import pokemonViewModel from "../view-models/pokemonViewModel";

const pokemonViewController = () => {
  const {
    pokemons,
    loading,
    setloading,
    getPokemons,
    getPokemonById,
    getMorePokemons,
  } = pokemonViewModel();
  return {
    pokemons,
    loading,
    setloading,
    getPokemons,
    getPokemonById,
    getMorePokemons,
  };
};

export default pokemonViewController;
