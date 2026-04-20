import PokemonSearch from './components/PokemonSearch'

export default function Home() {
  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <PokemonSearch />
    </div>
  );
}