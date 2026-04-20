// 'use client'

import { Pokemon } from "../types/pokemon";
import PokemonLoader from "./PolemonLoader";

async function loadPokemons(
  limit: number = 20,
  offset: number = 0,
): Promise<Pokemon[]> {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?${queryParams.toString()}`,
    );

    if (!res.ok) {
      throw new Error(`Something went wrong: ${res.statusText}`);
    }

    const data = await res.json();

    const loadedPokemons = data.results.reduce(
      (
        acc: { [key: string]: Pokemon },
        pokemon: { name: string; url: string },
      ) => {
        acc[pokemon.name] = {
          name: pokemon.name,
          id: parseInt(pokemon.url.split("/").slice(-2, -1)[0]),
          height: 0,
          weight: 0,
          sprites: { front_default: null },
          types: [],
        };
        return acc;
      },
      {},
    );

    return loadedPokemons;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Failed to load pokemons",
    );
  }
}

export default async function PokemonSearch() {
  const pokemons = await loadPokemons(10, 0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        maxWidth: 400,
      }}
    >
      {/* <form style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
        <input
          type="text"
          placeholder="Enter name or id (e.g. pikachu, 25)"
          value={""}
          // onChange={e => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem 0.75rem",
            fontSize: "1rem",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          // onClick={handleLoad}
          disabled={loading}
          style={{
            padding: "0.5rem 1.25rem",
            fontSize: "1rem",
            borderRadius: 6,
            border: "none",
            background: "#0070f3",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "..." : "Load"}
        </button>
      </form>

      {error && <p style={{ color: "red", margin: 0 }}>{error}</p>} */}

      {(Object.values(pokemons) || []).map((pokemon) => {
        console.log("Rendering PokemonLoader for:", pokemon.id);

        return <PokemonLoader key={pokemon.id} pokemonId={pokemon.id} />;
      })}
    </div>
  );
}
