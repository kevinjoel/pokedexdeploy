export default async function FindPokemons(data) {
    return await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${data.limit}&offset=${data.offset}`)
        .then(resp => resp.json())
        .then(resp => resp.results)
        .catch(error => {
            console.log(error)
            return null
        })
}