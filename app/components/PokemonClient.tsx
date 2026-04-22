"use client";

import { useState } from "react";
import { Pokemon } from "../types/pokemon";
import PokemonInfo from "./PokemonInfo";
import RefreshButton from "./RefreshButton";

type Props = {
  initialPokemon: Pokemon;
};

export default function PokemonClient({ initialPokemon }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon>(initialPokemon);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <PokemonInfo pokemon={pokemon} />
      <RefreshButton onLoad={setPokemon} />
    </div>
  );
}
