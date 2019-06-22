import React, {Component} from 'react';
import PokemonAPI from './PokemonAPI'
import Pagination from './Pagination'
import Filter from './Filter'
import './App.css';

const pokemonAPI = new PokemonAPI();
const limit = 5; //Change Limit Dislayed Pokemons

function DisplayPokemon(props) {
    const list = props.item;
    return (
            <div>
                {list.map ( (item) => {
                    return (
                        <div>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`} alt=""/>
                            <div>{item.name}</div>
                        </div>
                    );
                }) }

            </div>
            );
}

class App extends  React.Component {

    state = {
        allPokemons: [],
        currentPokemons: [],
        currentPage: 1,
        totalPage: null,
        loaded: false,
        filter: []

    }

  async componentDidMount() {
      await pokemonAPI.getPokemons()
          .then( (res) => {
              this.setState({
                  allPokemons: res,
                  loaded: true
              });
          })


  }

  pagePokemons = (item) => {
        return [...item].splice((this.state.currentPage - 1) * limit,   limit);
  }

    onChange = (value) =>  {
        const inputValue = value.toLowerCase();
        const newArr = [];
        this.state.allPokemons.map( (pokemon) =>
            pokemon.name.indexOf(inputValue) !== -1 ? newArr.push(pokemon) : false
        );
        this.setState({
            filter: newArr
        });
    }

    onPageChanged = (page) => {
        const newPage = page;

        this.setState({
            currentPage: newPage
        });
    }

  render () {

        const {allPokemons, currentPage, filter} = this.state;
        const totalPokemons = allPokemons.length;
        const totalFiltredPokemons = filter.length;

      if(!this.state.loaded){
          return <div>
              is Loading....
          </div>
      }
        const pokemons = this.state.allPokemons;

        const currentPokemon = this.pagePokemons(pokemons);
        const filtredPokemons = this.pagePokemons(filter);

      return (
          <div className="App">
              <Filter
                filter={ this.onChange}
              />
                <DisplayPokemon
                    item={filter.length === 0 ? currentPokemon : filtredPokemons}
                />
                <Pagination
                    totalRecords={filter.length === 0 ? totalPokemons : totalFiltredPokemons }
                    pageLimit={limit}
                    currentPage={currentPage}
                    onPageChanged={this.onPageChanged}
                />
          </div>
      );
  }

}

export default App;
