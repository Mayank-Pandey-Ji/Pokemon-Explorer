import { useState, useEffect } from 'react';

export default function App() {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Fetch all Pokémon types first
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        setTypes(data.results.map(type => type.name));
      })
      .catch(error => console.error('Error fetching types:', error));
    
    // Fetch the first 150 Pokémon
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );
        
        setPokemon(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchPokemon();
  }, []);

  useEffect(() => {
    if (pokemon.length > 0) {
      const filtered = pokemon.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === '' || 
          p.types.some(typeInfo => typeInfo.type.name === typeFilter);
        return matchesSearch && matchesType;
      });
      setFilteredPokemon(filtered);
    }
  }, [searchTerm, typeFilter, pokemon]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Pokémon Explorer</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-gray-700 font-medium mb-2">Search Pokémon</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Enter Pokémon name..."
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="type-filter" className="block text-gray-700 font-medium mb-2">Filter by Type</label>
              <select
                id="type-filter"
                value={typeFilter}
                onChange={handleTypeFilterChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-opacity-75"></div>
          </div>
        ) : filteredPokemon.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded text-center">
            No Pokémon found matching your criteria. Try adjusting your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemon.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function PokemonCard({ pokemon }) {
  const getTypeColor = (type) => {
    const typeColors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-600',
      rock: 'bg-yellow-600',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    
    return typeColors[type] || 'bg-gray-400';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 bg-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
        <span className="text-gray-500 font-semibold">#{pokemon.id}</span>
      </div>
      
      <div className="p-4 flex justify-center">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="h-32 w-32 object-contain"
        />
      </div>
      
      <div className="px-4 pb-4">
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map(typeInfo => (
            <span 
              key={typeInfo.type.name}
              className={`${getTypeColor(typeInfo.type.name)} text-white px-3 py-1 rounded-full text-sm capitalize`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}