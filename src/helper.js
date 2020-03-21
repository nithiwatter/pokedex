function getPokemonEntries(pokemonEntries) {
  let result = [];
  const pokemonArr = pokemonEntries['pokemon_entries'];
  for (let pokemon of pokemonArr) {
    let urlArr = pokemon['pokemon_species'].url.split('/');
    let id = parseInt(urlArr[urlArr.length - 2]);
    let name = pokemon['pokemon_species'].name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    result.push({
      pokemonId: id,
      pokemonEntryNumber: pokemon['entry_number'],
      pokemonName: name
    });
  }
  return result;
}

function searchPokemon(search, totalPokemons) {
  let result = totalPokemons.filter(pokemon => {
    let name = pokemon.pokemonName.toLowerCase();
    return name.startsWith(search);
  });
  console.log(result);
  return result;
}

export { getPokemonEntries, searchPokemon };
