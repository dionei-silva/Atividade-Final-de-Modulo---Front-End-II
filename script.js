const characterDiv = document.querySelector('.section-main')
const characterDivEach = document.querySelector('.div-card')

const episodeHTML = document.getElementById('episode')
const locationHTML = document.getElementById('location')
const characterHTML = document.getElementById('character')

const pagination = document.getElementById('pagination')
const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')

const pageNumberHTML = document.getElementById('pageNumbers')

let currentPage = 1

let info

async function fetchCharacter(page){
    try {
        console.log();
        const params = {
            page,
          }

        const response = await api.get(`/character`, {params})
        const characters = response.data.results

        pageNumberHTML.innerHTML = currentPage
        count = response.data.info.count;
        info = response.data.info
        
          showCharacters(characters)

    } catch (error) {
        console.log(error);
    }
}


async function fetchEpisodes(){
    try {
        const response = await api.get('/episode')
        episodeHTML.innerHTML = `Episodios: ${response.data.info.count}` 
    } catch (error) {
        console.log(error);
    }
}
fetchEpisodes()


async function fetchLocation(){
    try {
        const response = await api.get(`/location`)
        locationHTML.innerHTML = `Localizações: ${response.data.info.count}`
    } catch (error) {
        console.log(error);
    }
}
fetchLocation()


async function showCharacters(characters){
    try {
            characterDiv.innerHTML = ''
    
        characters.map(async character => {
            const lastEpisodeName = await lastEpisode(character.episode[character.episode.length-1])
            
            if (character.status === 'Alive') {
                statusCharacter = '<span>🟢</span>'
            }
            
            if (character.status === "unknown") {
                statusCharacter = '<span>⚫</span>'
            }
            
            if (character.status === "Dead") {
                statusCharacter = '<span>🔴</span>'
            }

            characterDiv.innerHTML += `
            <div class='div-card'>
            <img src="${character.image}" alt="">
            <div class="div-info">
            <h2 class="titulo-card">${character.name}</h2>
            <p class="info-character"> ${statusCharacter}${character.status} - ${character.species}</p>
            <p class="last-loc">Ultima localização conhecida</p>
            <h4 class="planet">${character.location.name}</h4>
            <p class="last-see">Visto a ultima vez em </p>
            <h4 class="chapter-name"> ${lastEpisodeName}</h4>
            </div>
            </div>
            `
            characterHTML.innerHTML = `Episodios: ${count}`
        
    })
    } catch (error) {
        console.log(error);
    }
}

async function lastEpisode(episode){
    const lastEP = await axios.get(episode)
    return lastEP.data.name
} 


prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--
      fetchCharacter(currentPage)
    }
})

nextPage.addEventListener('click', () => {
    if (info.next !== null) {
      currentPage++;
      fetchCharacter(currentPage)
    }
})  


fetchCharacter(currentPage)          


