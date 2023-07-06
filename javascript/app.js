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
        input.style.outline = 'solid 1px #FF5252';
        resultDisplay.textContent = "";
        notDefinition.classList.remove('active');
        return;
    }else{
        errorEmpty.textContent = "";
        input.style.outline = 'none';
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
            notDefinition.classList.add('active');
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
            <audio id="sound-phonetic" src="${phoneticAudio[0]}"></audio>
        </div>`;

    resultDisplay.appendChild(divPhonetic)

    let iconPhonetic = document.getElementById('play-phonetic');
    let audioPhonetic = document.getElementById('sound-phonetic');

    iconPhonetic.addEventListener('click', () => {
        console.log("clic music");
        audioPhonetic.volume = 1;
        audioPhonetic.play();
    });
    


    const blocMeanings = document.createElement('div');
    blocMeanings.className = "container-meanings";

    // console.log(data[0].meanings);

    data[0].meanings.forEach((e) => {
        const cardPartOfSpeech = document.createElement('div');
        cardPartOfSpeech.className = "card-partOfSpeech";

        cardPartOfSpeech.innerHTML = `
        <h2>${e.partOfSpeech}</h2>
        <hr>
        <h3 class="meaning">Meaning</h3>
        `;

        e.definitions.forEach((el) => {
            cardPartOfSpeech.innerHTML += `<li>${el.definition}</li>`;
        })

        if(e.synonyms){
            cardPartOfSpeech.innerHTML += `<p><span class="meaning">Synonyms </span>
            <span class="synonyms">${e.synonyms}</span></p>`

        }
        

        resultDisplay.appendChild(cardPartOfSpeech);
    })



    resultDisplay.innerHTML += `<p><span class"source">Source </span> <a href="${data[0].sourceUrls[0]}" target="_blank">${data[0].sourceUrls[0]} <span><img src="assets/images/icon-new-window.svg"></span></a>`

}

