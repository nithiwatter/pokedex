import React, { Component } from 'react';
import axios from 'axios';
import { getPokemonEntries, searchPokemon } from './helper';
import PokedexCard from './PokedexCard';
import './PokedexList.css';
import PokemonCard from './PokemonCard';

class PokedexList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: [],
      region: 2,
      showMore: false,
      currentId: 0,
      currentEntry: 0,
      currentRegion: 'Kanto',
      currentSearch: ''
    };
    this.changeRegion = this.changeRegion.bind(this);
    this.showMore = this.showMore.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async changeRegion(evt) {
    evt.preventDefault();
    let newRegion = evt.target.getAttribute('value');
    let newRegionId = evt.target.getAttribute('regionid');
    const pokedexResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokedex/${newRegionId}`
    );
    const pokemonEntries = pokedexResponse.data;
    this.setState({
      display: getPokemonEntries(pokemonEntries),
      currentRegion: newRegion
    });
  }
  async componentDidMount() {
    const pokedexResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokedex/${this.state.region}`
    );
    const pokemonEntries = pokedexResponse.data;
    this.setState({ display: getPokemonEntries(pokemonEntries) });
  }

  showMore(id, entryNumber) {
    this.setState({ showMore: true, currentId: id, currentEntry: entryNumber });
  }

  goBack() {
    this.setState({ showMore: false });
  }

  handleSearch(evt) {
    searchPokemon(evt.target.value, this.state.display);
    this.setState({ currentSearch: evt.target.value });
  }

  render() {
    const { display, currentSearch } = this.state;
    let entries;
    if (currentSearch === '') {
      entries = display.map(pokemon => (
        <PokedexCard
          key={pokemon.pokemonId}
          pokemonId={pokemon.pokemonId}
          pokemonEntryNumber={pokemon.pokemonEntryNumber}
          pokemonName={pokemon.pokemonName}
          currentRegion={this.state.currentRegion}
          onClick={this.showMore}
        />
      ));
    } else {
      entries = searchPokemon(currentSearch, display).map(pokemon => (
        <PokedexCard
          key={pokemon.pokemonId}
          pokemonId={pokemon.pokemonId}
          pokemonEntryNumber={pokemon.pokemonEntryNumber}
          pokemonName={pokemon.pokemonName}
          currentRegion={this.state.currentRegion}
          onClick={this.showMore}
        />
      ));
    }

    return (
      <div>
        <div className='nav'>
          <h1>React-Pokedex</h1>
          <div className='dropdown ml-2'>
            <button
              className='btn btn-secondary dropdown-toggle pk-drop'
              type='button'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              {this.state.currentRegion}
            </button>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              {this.props.regions.map(region => {
                let className = 'dropdown-item';
                if (this.state.currentRegion === region.name) {
                  className += ' disabled';
                }
                return (
                  <a
                    className={className}
                    href='#'
                    key={region.name}
                    value={region.name}
                    regionid={region.id}
                    onClick={this.changeRegion}
                  >
                    {region.name}
                  </a>
                );
              })}
            </div>
          </div>

          <div className='search-container'>
            <input
              type='text'
              className='form-control search'
              value={this.state.currentSearch}
              onChange={this.handleSearch}
              placeholder='Pokemon Name'
            />
          </div>

          <i
            className='fa fa-arrow-up'
            id='top'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          ></i>
        </div>
        <div className='root'>
          <div className='grid-container'>{entries}</div>
        </div>
        {this.state.showMore && <div className='overlay'></div>}

        {this.state.showMore && (
          <PokemonCard
            pokemonId={this.state.currentId}
            pokemonEntry={this.state.currentEntry}
            goBack={this.goBack}
          />
        )}
      </div>
    );
  }
}

PokedexList.defaultProps = {
  regions: [
    { name: 'Kanto', id: 2 },
    { name: 'Johnto', id: 3 },
    { name: 'Hoenn', id: 4 },
    { name: 'Sinnoh', id: 5 },
    { name: 'Unova', id: 8 },
    { name: 'Kalos', id: 12 }
  ]
};

export default PokedexList;
