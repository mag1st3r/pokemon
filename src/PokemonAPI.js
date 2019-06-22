export default  class PokemonAPI {
    _apiBase = `https://pokeapi.co/api/v2/pokemon/`;

    async getResourse() {
        const res = await fetch(`${this._apiBase}?offset=0&limit=50`);

        if (!res.ok) {
            throw new Error(`Could not fetch ` +
                `, received ${res.status}`)
        }
        return await res.json();
    }

     extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }


    _transformPokemon = (pokemon) => {

        return {
            id: this.extractId(pokemon),
            name: pokemon.name
        }

    }

    fnSort (a, b)  {

        if(a.name > b.name) { return 1 }
        else { return - 1 }

    }

    async getPokemons() {
        const res = await this.getResourse();
        const results = res.results.map(this._transformPokemon);
        return results.sort(this.fnSort);
    }

}

