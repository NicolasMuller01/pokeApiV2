const input = document.querySelector('.form-input');
const form = document.getElementById('form');
const div = document.querySelector('.div-pokemons');
const twentyList = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
const btnPrevious = document.querySelector('.btn-previous');
const btnNext = document.querySelector('.btn-next');
let globalNext = '';
let globalPrevious = '';

const llamarPokemones = async(url)=>{
    const pokemonWaiting = await fetch(url);
    const pokemonWaitingJson = await pokemonWaiting.json()
    const {id,name,base_experience,abilities,sprites} = pokemonWaitingJson;
    return div.innerHTML += 
    `<div class="renderConteiner ${id}">
      <img class="pokemon-img" src="${sprites.front_default}"></img>
      <p>id: ${id}</p>
      <p>Name: ${name}</p>
      <p>Base experience: ${base_experience}</p>
      <p>Abilities: ${abilities[0].ability.name}</p>
  </div>`
}

window.addEventListener('DOMContentLoaded', async()=>{
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const pokemonJson = await pokemon.json()
    const {next} = pokemonJson;
    globalNext = next;
    const arr = pokemonJson.results.map(item => ({
        url:item.url
    }))
    await Promise.all(
        arr.forEach(async(element) => {
            await llamarPokemones(element.url);
          })
    )
})

form.addEventListener('submit',async(e)=>{
    e.preventDefault()
try{
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value}`);
    const pokemonJson = await pokemon.json()
    const {id,name,base_experience,abilities,sprites} = pokemonJson;
    return div.innerHTML = 
    `<div class="renderConteiner ${id}">
        <img class="pokemon-img" src="${sprites.front_default}"></img>
        <p>Name: ${name}</p>
        <p>Base experience: ${base_experience}</p>
        <p>Abilities: ${abilities[0].ability.name},${abilities[1].ability.name}</p>
    </div>`
}
catch(err){
    return div.innerHTML =   
    `<div class="renderConteiner">
        <p>Enter a valid name</p>
    </div>`
}
});

btnNext.addEventListener('click', async()=>{
 try {
    div.innerHTML = "";
    const pokemon = await fetch(globalNext);
    const pokemonJson = await pokemon.json()
    const {next,previous} = pokemonJson;
    globalNext = next;
    globalPrevious=previous;
    const arr = pokemonJson.results.map(item => ({
        url:item.url
    }))
    arr.forEach(async(element) => {
      await llamarPokemones(element.url);
    });
 } catch (error) {
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const pokemonJson = await pokemon.json()
    const {next} = pokemonJson;
    globalNext = next;
    const arr = pokemonJson.results.map(item => ({
        url:item.url
    }))
    await Promise.all(
        arr.forEach(async(element) => {
            await llamarPokemones(element.url);
          })
    )
 }
})

btnPrevious.addEventListener('click', async()=>{
  try {
    div.innerHTML = "";
    const pokemon = await fetch(globalPrevious);
    const pokemonJson = await pokemon.json()
    const {next,previous} = pokemonJson;
    globalNext = next;
    globalPrevious=previous;
    const arr = pokemonJson.results.map(item => ({
        url:item.url
    }))
    await Promise.all(
        arr.forEach(async(element) => {
            await llamarPokemones(element.url);
          })
    )
  } 
  catch (error) {
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
    const pokemonJson = await pokemon.json()
    const {next} = pokemonJson;
    globalNext = next;
    const arr = pokemonJson.results.map(item => ({
        url:item.url
    }))
    await Promise.all(
        arr.forEach(async(element) => {
            await llamarPokemones(element.url);
          })
    )
  }
})