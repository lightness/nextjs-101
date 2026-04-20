"use client";

import { useFetch } from "../hooks/useFetch";
import { Pokemon } from "../types/pokemon";
import PokemonInfo from "./PokemonInfo";

export default function PokemonLoader({ pokemonId }: { pokemonId: number }) {
  console.log(`Loading data for Pokemon ID: ${pokemonId}`);

  const { data, isLoading, error } = useFetch<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
  );

  if (isLoading) {
    const placeholder: Pokemon = {
      name: "Loading...",
      id: pokemonId,
      height: 0,
      weight: 0,
      sprites: { front_default: null },
      types: [],
    };
    return <PokemonInfo pokemon={placeholder} />;
  }

  if (error) {
    const errorPlaceholder: Pokemon = {
      name: `Error: ${error}`,
      id: pokemonId,
      height: 0,
      weight: 0,
      sprites: { front_default: null },
      types: [],
    };
    return <PokemonInfo pokemon={errorPlaceholder} />;
  }

  if (data) {
    return <PokemonInfo pokemon={data as Pokemon} />;
  }
}
