import Image from "next/image";
import { Pokemon } from "../types/pokemon";
import { PokemonTypeMap } from "../types/pokemon-type-map";

export default function PokemonInfo({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        gap: "1rem",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      {pokemon.sprites.front_default && (
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={120}
          height={120}
          style={{ borderRadius: "50%", backgroundColor: "#f0f0f0" }}
        />
      )}

      <h1 style={{ margin: 0, textTransform: "capitalize" }}>{pokemon.name}</h1>
      <p style={{ margin: 0, color: "#555" }}>#{pokemon.id}</p>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            style={{
              padding: "0.25rem 0.75rem",
              borderRadius: 999,
              border: "1px solid #ccc",
              textTransform: "capitalize",
              fontSize: "0.9rem",
            }}
          >
            {PokemonTypeMap[t.type.name]} {t.type.name}
          </span>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td style={{ padding: "0.4rem 0", color: "#555" }}>Height</td>
            <td style={{ padding: "0.4rem 0", textAlign: "right" }}>
              {pokemon.height / 10} m
            </td>
          </tr>
          <tr>
            <td style={{ padding: "0.4rem 0", color: "#555" }}>Weight</td>
            <td style={{ padding: "0.4rem 0", textAlign: "right" }}>
              {pokemon.weight / 10} kg
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
