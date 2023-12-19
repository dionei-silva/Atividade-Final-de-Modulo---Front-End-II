
const characterDiv = document.querySelector('.section-main')
const characterDivEach = document.querySelector('.div-card')

const episodeHTML = document.getElementById('episode')
const locationHTML = document.getElementById('location')
const characterHTML = document.getElementById('character')

const prevPage = document.getElementById('prevPage')
const nextPage = document.getElementById('nextPage')

let currentPage = 1
let totalPages = 1 

async function fetchPersonagem(){
        const response = await api.get(`/character?page=${currentPage}`)
        const characters = response.data.results
        numberPages = response.data.info.pages
        count = response.data.info.count


        characters.forEach(character => {
/*             console.log(characterDivEach === 2);
            if(character < 2){
                characterDiv.innerHTML += `<hr class="hr">`
            } */

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
            <div class="div-card">
                <img src="${character.image}" alt="">
                <div class="div-info">
                    <h2 class="titulo-card">${character.name}</h2>
                    <p class="info-character"> ${statusCharacter}${character.status} - ${character.species}</p>
                    <p class="last-loc">Ultima localização conhecida</p>
                    <h4 class="planet">${character.location.name}</h4>
                    <p class="last-see">Visto a ultima vez em </p>
                    <h4 class="chapter-name"> ${character.episode.length}</h4>
                </div>
            </div>
            `
        })
        
        characterHTML.innerHTML = `Episodios: ${count}`
}
fetchPersonagem()

async function fetchEpisodes(){
    try {
        const response = await api.get(`/episode`)
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


/* prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--
      fetchPersonagem(currentPage)
    }
})

nextPage.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchPersonagem(currentPage)
    }
}) */

