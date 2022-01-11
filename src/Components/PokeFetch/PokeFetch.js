import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
    }

    this.state = {
      timer: 10
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))

      this.interval = setInterval(
        () =>
          this.setState({
            timer: this.state.timer - 1,
          }),
        1000
      );

      if (this.state.timer === 0) {
        this.setState({
          timer: 10
        })
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.timer === 1) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        {this.state.pokeSprite && <h1 className={'timer'} >{this.state.timer}</h1>}
        <div className={'pokeWrap'}>
          {this.state.timer === 0 ? <img className={'pokeImg pokeImgShow'} src={this.state.pokeSprite} /> : <img className={'pokeImg pokeImgHidden'} src={this.state.pokeSprite} />}
          {this.state.timer === 0 && <h1 className={'pokeName'}>{this.state.pokeName}</h1>}
        </div>
      </div>
    )
  }
}

export default PokeFetch;