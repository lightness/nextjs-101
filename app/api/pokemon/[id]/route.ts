export async function GET(_req: Request, { params }: RouteContext<"/api/pokemon/[id]">) {
  const { id } = await params;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!res.ok) {
    return Response.json({ error: "Pokemon not found" }, { status: res.status });
  }

  const data = await res.json();
  return Response.json(data);
}
