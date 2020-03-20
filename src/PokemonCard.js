import React, { Component } from 'react';
import axios from 'axios';
import './PokemonCard.css';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      types: [],
      abilities: [],
      stats: {
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        specialAttack: '',
        specialDefense: ''
      },
      height: '',
      weight: '',
      description: '',
      loaded: false,
      showStats: false,
      imgLoaded: false
    };
  }
  async componentDidMount() {
    let pokemon = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${this.props.pokemonId}`
    );
    let pokemonDescriptions = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${this.props.pokemonId}`
    );
    pokemon = pokemon.data;
    pokemonDescriptions = pokemonDescriptions.data;
    let name = pokemon.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    // const imageUrl = pokemon.sprites.front_default;
    const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${this.props.pokemonId}.png`;
    const types = pokemon.types.map(type => type.type.name);
    const abilities = pokemon.abilities.map(ability => ability.ability.name);
    let stats = {};
    pokemon.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          stats['hp'] = stat['base_stat'];
          break;
        case 'attack':
          stats['attack'] = stat['base_stat'];
          break;
        case 'defense':
          stats['defense'] = stat['base_stat'];
          break;
        case 'speed':
          stats['speed'] = stat['base_stat'];
          break;
        case 'special-attack':
          stats['specialAttack'] = stat['base_stat'];
          break;
        case 'special-defense':
          stats['specialDefense'] = stat['base_stat'];
          break;
        default:
          break;
      }
      return stat;
    });
    const height = pokemon.height;
    const weight = pokemon.weight;
    let description = pokemonDescriptions['flavor_text_entries'].find(
      entry => entry.language.name === 'en'
    )['flavor_text'];
    this.setState({
      name,
      imageUrl,
      types,
      abilities,
      stats,
      height,
      weight,
      description
    });
    setTimeout(() => this.setState({ loaded: true }), 500);
  }
  render() {
    const {
      name,
      imageUrl,
      types,
      abilities,
      stats,
      height,
      weight,
      description
    } = this.state;
    const display = this.state.loaded ? 'flex' : 'none';
    const displayImg = this.state.imgLoaded ? '1' : '0';
    const color = TYPE_COLORS[types[0]];
    return (
      <div className='root2'>
        {!this.state.loaded && <h1>Loading...</h1>}
        <div className='pokemon-card-detail' style={{ display }}>
          {!this.state.showStats && (
            <div className='image-container-detail'>
              <img
                src={imageUrl}
                style={{ opacity: displayImg }}
                onLoad={() =>
                  setTimeout(() => this.setState({ imgLoaded: true }), 500)
                }
                alt={name}
              ></img>
              <div
                className='img-circle'
                style={{ border: `5px solid #${color}` }}
              ></div>
            </div>
          )}
          {this.state.showStats && (
            <div className='stats'>
              <div className='row align-items-center'>
                <div className='col-12 col-md-3'>hp:</div>
                <div className='col-12 col-md-9'>
                  <div className='progress mr-4'>
                    <div
                      className='progress-bar'
                      role='progressbar'
                      style={{
                        width: `${Math.floor(100 * (stats.hp / 255))}%`,
                        backgroundColor: `#${color}`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='255'
                    >
                      {stats.hp}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center'>
                <div className='col-12 col-md-3'>attack:</div>
                <div className='col-12 col-md-9'>
                  <div className='progress mr-4'>
                    <div
                      className='progress-bar'
                      role='progressbar'
                      style={{
                        width: `${Math.floor(100 * (stats.attack / 255))}%`,
                        backgroundColor: `#${color}`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='255'
                    >
                      {stats.attack}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center'>
                <div className='col-12 col-md-3'>defense:</div>
                <div className='col-12 col-md-9'>
                  <div className='progress mr-4'>
                    <div
                      className='progress-bar'
                      role='progressbar'
                      style={{
                        width: `${Math.floor(100 * (stats.defense / 255))}%`,
                        backgroundColor: `#${color}`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='255'
                    >
                      {stats.defense}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center'>
                <div className='col-12 col-md-3'>speed:</div>
                <div className='col-12 col-md-9'>
                  <div className='progress mr-4'>
                    <div
                      className='progress-bar'
                      role='progressbar'
                      style={{
                        width: `${Math.floor(100 * (stats.speed / 255))}%`,
                        backgroundColor: `#${color}`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='255'
                    >
                      {stats.speed}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center'>
                <div className='col-12 col-md-3'>spattk:</div>
                <div className='col-12 col-md-9'>
                  <div className='progress mr-4'>
                    <div
                      className='progress-bar'
                      role='progressbar'
                      style={{
                        width: `${Math.floor(
                          100 * (stats.specialAttack / 255)
                        )}%`,
                        backgroundColor: `#${color}`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='255'
                    >
                      {stats.specialAttack}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center'>
                <div className='col-12 col-md-3'>spdef:</div>
                <div className='col-12 col-md-9'>
                  <div className='progress mr-4'>
                    <div
                      className='progress-bar'
                      role='progressbar'
                      style={{
                        width: `${Math.floor(
                          100 * (stats.specialDefense / 255)
                        )}%`,
                        backgroundColor: `#${color}`
                      }}
                      aria-valuenow='25'
                      aria-valuemin='0'
                      aria-valuemax='255'
                    >
                      {stats.specialDefense}
                    </div>
                  </div>
                </div>
              </div>
              <div className='row align-items-center mt-3'>
                {abilities.map(ability => (
                  <div
                    key={ability}
                    className='col-12 col-md-6 mt-3 d-flex justify-content-center'
                  >
                    <button className='btn btn-outline-info'>{ability}</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='pokemon-container-detail'>
            <div className='pokemon-title-detail'>
              <p>
                <span>No.</span> #{this.props.pokemonEntry}
              </p>
              <h4>{name}</h4>
            </div>
            <div className='pokemon-body-detail'>
              <div className='grid-item-h b'>
                <p>Types</p>
              </div>

              <div className='grid-item b'>
                {types.map(type => {
                  const color = TYPE_COLORS[type];
                  return (
                    <button key={type} style={{ backgroundColor: `#${color}` }}>
                      <p>{type}</p>
                    </button>
                  );
                })}
              </div>
              <div className='grid-item-h b'>
                <p>Height</p>
              </div>
              <div className='grid-item b'>
                <p>{height}</p>
              </div>
              <div className='grid-item-h'>
                <p>Weight</p>
              </div>
              <div className='grid-item'>
                <p>{weight}</p>
              </div>
            </div>
            <div className='pokemon-description-detail'>
              <p>{description}</p>
              <div className='footer'>
                <button
                  onClick={() =>
                    this.setState({ showStats: !this.state.showStats })
                  }
                >
                  <p>Stats</p>
                </button>
                <button className='go-back' onClick={this.props.goBack}>
                  <p>Go Back</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
