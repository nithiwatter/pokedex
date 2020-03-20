import React, { Component } from 'react';
import './PokedexCard.css';
const URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

class PokedexCard extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, showMore: false };
    this.handleLoad = this.handleLoad.bind(this);
  }
  handleLoad() {
    setTimeout(() => this.setState({ loaded: true }), 1000);
  }
  render() {
    const { pokemonId, pokemonEntryNumber, pokemonName } = this.props;
    const image = URL + `${pokemonId}.png`;
    return (
      <div className='pokemon-card card-shadow'>
        <div className='image-container'>
          <img
            src={image}
            onLoad={this.handleLoad}
            style={this.state.loaded ? { opacity: '1' } : { opacity: '0' }}
            alt=''
          />
        </div>
        <div className='pokemon-card-title'>
          <p>
            <span>{this.props.currentRegion}</span> #{pokemonEntryNumber}
          </p>
          <h4>{pokemonName}</h4>
        </div>
        <button
          className='btn btn-warning mt-1 mb-3'
          onClick={() => this.props.onClick(pokemonId, pokemonEntryNumber)}
        >
          {/* <Link to={`/pokemon/${pokemonName}/${pokemonId}`}>Explore More</Link> */}
          Learn More
        </button>
      </div>
    );
  }
}

export default PokedexCard;
