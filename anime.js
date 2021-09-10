const baseUrl='https://api.jikan.moe/v3';

function searchAnime(event){
 event.preventDefault();
 const form= new FormData(this)
 const query= form.get("search")
 console.log(query)
 fetch(`${baseUrl}/search/anime?q=${query}&page=1`)
 .then(res=> res.json())
 .then(updateDom)
 .catch(err=>console.warn(err.message))
 
}



function updateDom(data){
    console.log(data)
    const searchResults= document.getElementById('search-results')
    
    const animeByCategories= data.results.reduce((acc,anime)=>{
        const {type} = anime;  /* destructured the object type*/
        if(acc[type]===undefined) acc[type]=[];  /* checks if the type exists, if not then it creates a key value pair where the key is type and has a value array */
        acc[type].push(anime); /*the object of the type is pushed inside the array created*/
        return acc;   /* returns the acc that has an object key and an array */

    },{})  /*sorting the anime based on categories, whether it's TV or movie or OVA*/

console.log(animeByCategories,animeByCategories['TV'])

searchResults.innerHTML=Object.keys(animeByCategories).map(key=>{
    const animesHTML=animeByCategories[key].sort((a,b)=>a.episodes-b.episodes).map(anime=>{
        return `
        <div class="card">
          <div class="card-image">
            <img src="${anime.image_url}">
          </div>
          <div class="card-content">
          <span class="card-title">${anime.title}</span>
            <p>${anime.synopsis}</p>
          </div>
          <div class="card-action">
            <a href="${anime.url}" target="_blank" >Find out more</a>
          </div>
        </div> `
    }).join("");
    return `
    <h3>${key.toUpperCase()}</h3>
     <div id="search-results" class="container-row">${animesHTML}</div>`
}).join("")

    /* .sort((a,b)=>a.episodes-b.episodes).map(anime=>{
        return `
        <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img src="${anime.image_url}">
          </div>
          <div class="card-content">
          <span class="card-title">${anime.title}</span>
            <p>${anime.synopsis}</p>
          </div>
          <div class="card-action">
            <a href="${anime.url}">Find out more</a>
          </div>
        </div>
      </div> `
    }).join(""); */

}

/* fetch(baseUrl)
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.warn(err.message)) */

function pageLoaded(){
    const form= document.getElementById('search_form')
    form.addEventListener("submit",searchAnime)
} 

window.addEventListener("load",pageLoaded)