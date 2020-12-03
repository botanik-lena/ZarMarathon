class Game {
    async getPokemons() {
        const responce = await fetch("https://reactmarathon-api.netlify.app/api/pokemons");
        const body = await responce.json();
        return body;
    }

    async start() {
        const pokemons = await this.getPokemons();
        return pokemons;
    }
}

export default Game;