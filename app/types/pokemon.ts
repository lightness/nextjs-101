export type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: { type: { name: string } }[];
};