import { notFound } from "next/navigation";
import { Pokemon } from "../types/pokemon";
import PokemonClient from "../components/PokemonClient";

async function getRandomPokemon(): Promise<Pokemon | null> {
  const id = Math.round(Math.random() * 1000);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PokemonPage() {
  const pokemon = await getRandomPokemon();

  if (!pokemon) notFound();

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <PokemonClient initialPokemon={pokemon} />
    </div>
  );
}
