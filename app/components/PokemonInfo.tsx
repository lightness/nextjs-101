"use client";

import Image from "next/image";
import { Pokemon } from "../types/pokemon";

const TYPE_MAP: Record<string, string> = {
  normal: "⚪️",
  fire: "🔥",
  water: "💧",
  electric: "⚡️",
  grass: "🌿",
  ice: "❄️",
  fighting: "🥊",
  poison: "☠️",
  ground: "🌍",
  flying: "🪽",
  psychic: "☯️",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌚",
  steel: "⚙️",
  fairy: "🩷",
};

export default function PokemonInfo({ pokemon }: { pokemon: Pokemon }) {
  const size = [
    pokemon.height ? `Height: ${pokemon.height / 10} m` : null,
    pokemon.weight ? `Weight: ${pokemon.weight / 10} kg` : null,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #eee",
        padding: "0.5rem",
        borderRadius: 8,
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {pokemon.sprites.front_default && (
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{
              borderRadius: "50%",
              backgroundColor: "white",
              height: "fit-content",
            }}
            width={40}
            height={40}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <p style={{ margin: "0.25rem 0", textTransform: "capitalize" }}>
              {pokemon.name}
            </p>
            <p style={{ margin: "0.25rem 0", color: "#555" }}>#{pokemon.id}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "left" }}>
            {pokemon.types.map((t) => (
              <p key={t.type.name}>{TYPE_MAP[t.type.name]}</p>
            ))}
          </div>
        </div>
      </div>
      <p style={{ margin: "0.25rem 0" }}>{size}</p>
    </div>
  );
}
