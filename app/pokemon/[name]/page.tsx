import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pokemon } from "../../types/pokemon";

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

async function getPokemon(name: string): Promise<Pokemon | null> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PokemonPage({
  params,
}: PageProps<"/pokemon/[name]">) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  if (!pokemon) notFound();

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
      <Link href="/" style={{ alignSelf: "flex-start", color: "#0070f3" }}>
        ← Back
      </Link>

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
            {TYPE_MAP[t.type.name]} {t.type.name}
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
