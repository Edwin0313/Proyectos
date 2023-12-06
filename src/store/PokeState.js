import React, { useCallback, useReducer } from "react";
import { PokeContext } from "./PokeContext";
import { PokeReducer } from "./PokeReducer";
import { urlServer } from "../constans/routes";
import { numPokemons } from "../constans/values";
import { POKEMON } from "../Types/types";

const PokeState = (props) => {
  const initialState = {
    pokemons: [],
    listPokemons: [],
    pokemon: {},
    nextRequest: "",
    loading: false,
    findErrors: false,
    errorMessage: "",
  };
  const [state, dispatch] = useReducer(PokeReducer, initialState);

  //
  //#region set functions
  const setloading = useCallback((value) => {
    dispatch({
      type: POKEMON.LOADING,
      payload: value,
    });
  }, []);
  //#endregion set functions
  //#region get functions
  const getPokemons = async (offset = 0) => {
    try {
      let baseUrl = `${urlServer}api/v2/pokemon?limit=${numPokemons}&offset=${offset}`;

      let response = await fetch(baseUrl);
      const data = await response.json();
      const promises = data.results.map(async (pokemon) => {
        const resp = await fetch(pokemon.url);
        const data1 = await resp.json();
        return data1;
      });
      const res = await Promise.all(promises);
      dispatch({
        type: POKEMON.POKEMONS,
        payload: {
          pokemons: [...state.pokemons, ...res],
          loading: false,
          nextRequest: data.next,
        },
      });
    } catch (error) {
      dispatch({
        type: POKEMON.ERRORS,
        payload: {
          findErrors: true,
          errorMessage: error,
        },
      });
    } finally {
      dispatch({
        type: POKEMON.LOADING,
        payload: false,
      });
    }
  };
  const getMorePokemons = async () => {
    try {
      console.log(state.nextRequest);
      if (state.nextRequest !== "") {
        let baseUrl = state.nextRequest;
        let response = await fetch(baseUrl);
        const data = await response.json();
        const promises = data.results.map(async (pokemon) => {
          const resp = await fetch(pokemon.url);
          const data1 = await resp.json();
          return data1;
        });
        const res = await Promise.all(promises);
        dispatch({
          type: POKEMON.POKEMONS,
          payload: {
            pokemons: [...state.pokemons, ...res],
            loading: false,
            nextRequest: data.next,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: POKEMON.ERRORS,
        payload: {
          findErrors: true,
          errorMessage: error,
        },
      });
    } finally {
      dispatch({
        type: POKEMON.LOADING,
        payload: false,
      });
    }
  };
  const getPokemonById = async (id) => {
    try {
      let baseUrl = `${urlServer}api/v2/pokemon/${id}`;
      console.log(baseUrl);
      let response = await fetch(baseUrl);
      if (response.status === 200) {
        const data = await response.json();
        dispatch({
          type: POKEMON.POKEMON,
          payload: {
            pokemon: data,
            loading: false,
          },
        });
      } else {
        dispatch({
          type: POKEMON.ERRORS,
          payload: {
            findErrors: true,
            errorMessage: "La consulta no ha devuelto resultados.",
          },
        });
      }
    } catch (error) {
      dispatch({
        type: POKEMON.ERRORS,
        payload: {
          findErrors: true,
          errorMessage: error,
        },
      });
    } finally {
      dispatch({
        type: POKEMON.LOADING,
        payload: false,
      });
    }
  };
  //#endregion get functions
  //post functions
  //delete functions

  return (
    <PokeContext.Provider
      value={{
        //fields
        pokemons: state.pokemons,
        pokemon: state.pokemon,
        loading: state.loading,
        nextRequest: state.nextRequest,
        //set functions
        setloading,
        //get functions
        getPokemons,
        getMorePokemons,
        getPokemonById,
        //post functions
        //delete functions
      }}
    >
      {props.children}
    </PokeContext.Provider>
  );
};

export default PokeState;
