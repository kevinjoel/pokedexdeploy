import { useState } from 'react'
import FindPokemons from '../services/FindPokemons';
import FindPokemon from '../services/FindPokemonInfo';

export default function usePokeapi() {
    const [state, setState] = useState({ isLoading: false, error: false });

    /**
     * OBTIENE UNA LISTA DE POKEMONES
     * @param {*} data 
     * @returns 
     */
    const findPokemonsService = async (data) => {
        try {
            setState({ ...state, isLoading: true });
            const pokemons = await FindPokemons(data);
            setState({ ...state, isLoading: false });
            return pokemons;
        } catch (error) {
            setState({ ...state, isLoading: false, error: true });
            return null
        }
    }

    /**
     * OBTIENE LA INFORMACION DE UN POKEMON
     * @param {*} data 
     * @returns 
     */
     const findPokemonService = async (data) => {
        try {
            setState({ ...state, isLoading: true });
            const pokemon = await FindPokemon(data);
            setState({ ...state, isLoading: false });
            return pokemon;
        } catch (error) {
            setState({ ...state, isLoading: false, error: true });
            return null
        }
    }

    return {
        isLoading: state.isLoading,
        isError: state.error,
        findPokemonsService,
        findPokemonService
    }
}