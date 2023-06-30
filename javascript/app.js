// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const formSearch = document.querySelector('.input-search');
const input = document.getElementById('search');
const errorEmpty = document.querySelector('.search-empty');
const resultDisplay = document.querySelector('.result-display');
const notDefinition = document.querySelector('.not-definition');

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    if(input.value === ""){
        errorEmpty.textContent = "Whoops, can't be empty...";
        return;
    }else{
        errorEmpty.textContent = "";
        resultDisplay.textContent = "";
        notDefinition.classList.remove('active');
        dictApiCall(input.value);
    }
})

async function dictApiCall(searchInput) {

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);

        const data = await response.json();

        // console.log(data)

        if(data.title) {
            errorEmpty.textContent = data.title;
            return;
        }
        
        createDictionnary(data);
    }

    catch(error) {
        errorEmpty.textContent = `${error}`;
    }
}

function createDictionnary(data) {

    const divPhonetic = document.createElement('div');
    divPhonetic.className = "container-phonetic";

    const phoneticAudio = [];
    data[0].phonetics.forEach(el => {
        if(el.audio){
            phoneticAudio.push(el.audio)
        }
    })

    divPhonetic.innerHTML = `
        <h1>${data[0].word}</h3>
        <p>${data[0].phonetic}</p>
        <div class="player-phonetic">
            <img id="play-phonetic" src="assets/images/icon-play.svg" alt="logo play audio">
            <audio id="sound-phonetic" src="${phoneticAudio[0]}" controls></audio>
        </div>`;

    resultDisplay.appendChild(divPhonetic)
    


    console.log(phoneticAudio[0]);



}