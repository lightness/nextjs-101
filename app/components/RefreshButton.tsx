"use client";

import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Pokemon } from "../types/pokemon";

function randomId() {
  return Math.round(Math.random() * 1000);
}

type Props = {
  onLoad: (pokemon: Pokemon) => void;
};

export default function RefreshButton({ onLoad }: Props) {
  const [id, setId] = useState<number | null>(null);

  const { data, isLoading } = useFetch<Pokemon>(id ? `/api/pokemon/${id}` : "");

  useEffect(() => {
    if (data) onLoad(data);
  }, [data]);

  return (
    <button
      onClick={() => setId(randomId())}
      disabled={isLoading}
      style={{
        padding: "0.5rem 1.25rem",
        fontSize: "1rem",
        borderRadius: 6,
        border: "none",
        background: isLoading ? "#555555" : "#0070f3",
        color: "#fff",
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? "Loading..." : "Refresh"}
    </button>
  );
}
