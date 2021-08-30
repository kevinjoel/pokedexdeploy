export default async function FindPokemonInfo(data) {
    return await fetch(data)
        .then(resp => resp.json())
        .then(resp => resp)
        .catch(error => null)
}