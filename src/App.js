import React from 'react';
import PokedexList from './PokedexList';
import './App.css';
import PokemonCard from './PokemonCard';

import { Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
    <div>
      <Route exact path='/' component={PokedexList}></Route>
      <Route
        exact
        path='/pokemon/:pokemonName/:pokemonId'
        render={routeProps => (
          <PokemonCard
            pokemonId={routeProps.match.params.pokemonId}
          ></PokemonCard>
        )}
      ></Route>
    </div>
  );
}

export default App;
