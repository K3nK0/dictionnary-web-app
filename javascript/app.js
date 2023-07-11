// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const formSearch = document.querySelector('.input-search');
const input = document.getElementById('search');
const errorEmpty = document.querySelector('.search-empty');
const resultDisplay = document.querySelector('.result-display');
const notDefinition = document.querySelector('.not-definition');
const phoneticContainer = document.querySelector('.container-phonetic');

input.addEventListener('input', () => {
    darkMode();
    
})

input.addEventListener('input', (event)=> {
    input.style.outline = 'solid 1px #A445ED';
})

input.addEventListener('blur', (event)=> {
    input.style.outline = '';
})


formSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    if(input.value === ""){
        phoneticContainer.style.display = "none";
        errorEmpty.textContent = "Whoops, can't be empty...";
        input.style.outline = 'solid 1px #FF5252';
        resultDisplay.textContent = "";
        notDefinition.classList.remove('active');
        return;
    }else{
        errorEmpty.textContent = "";
        input.style.outline = 'solid 1px #A445ED';
        resultDisplay.textContent = "";
        phoneticContainer.style.display = "none";
        notDefinition.classList.remove('active');
        dictApiCall(input.value);
    }
})

async function dictApiCall(searchInput) {

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);

        const data = await response.json();

        if(data.title) {
            notDefinition.classList.add('active');
            input.style.outline = 'none';
            return;
        }
        
        createDictionnary(data);
    }

    catch(error) {
        errorEmpty.textContent = `${error}`;
    }
}


const phoneticTitle = document.querySelector('.text-phonetic h1');
const phoneticText = document.querySelector('.text-phonetic p');
const phoneticPlayer = document.querySelector('.player-phonetic audio')

function createDictionnary(data) {

    input.style.outline = 'none';

    phoneticTitle.textContent = data[0].word;
    phoneticText.textContent = data[0].phonetic;

    const linkAudio = [];
    data[0].phonetics.forEach((e) => {
        if(e.audio){
            linkAudio.push(e.audio)
        }
    })

    phoneticPlayer.src = linkAudio[0];

    phoneticContainer.style.display = "flex";

    const blocMeanings = document.createElement('div');
    blocMeanings.className = "container-meanings";

    data[0].meanings.forEach((e) => {
        const cardPartOfSpeech = document.createElement('div');
        cardPartOfSpeech.className = "card-partOfSpeech";

        cardPartOfSpeech.innerHTML = `
        <div class="partOfSpeech-title">
            <h2 class="light-mode">${e.partOfSpeech}</h2>
            <div class="row light-mode"></div>
        </div>
        <h3 class="meaning">Meaning</h3>
        `;

        const listDefinitions = document.createElement('ul');
        listDefinitions.className = "list-definition";

        e.definitions.forEach((el) => {
            listDefinitions.innerHTML += `<li class="light-mode">${el.definition}</li>`;
            if(el.example){
                listDefinitions.innerHTML += `<p class="example">"${el.example}"</p>`
            }
        })

        cardPartOfSpeech.appendChild(listDefinitions);

        if(e.synonyms.length > 0){
            cardPartOfSpeech.innerHTML += `<p><span class="meaning">Synonyms </span>
            <span class="synonyms">${e.synonyms}</span></p>`

        }

        resultDisplay.appendChild(cardPartOfSpeech);
    })


    resultDisplay.innerHTML += `
    <div class="container-source light-mode">
    <p class="source">Source</p> <a class="light-mode" href="${data[0].sourceUrls[0]}" target="_blank">${data[0].sourceUrls[0]}</a>
    <img src="assets/images/icon-new-window.svg">
    </div>`;

    darkMode();
}


const btnDarkMode = document.querySelector('#switch');

const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
window.addEventListener('load', () => {
    console.log("Le site a chargé !")
    if(dark){
        btnDarkMode.checked = true;
        darkMode();
    }
})


btnDarkMode.addEventListener('click', darkMode)

function darkMode(){
    const allElement = document.querySelectorAll('.light-mode');

    if(btnDarkMode.checked){
        allElement.forEach(el => {
            el.classList.add('darkMode')
        })
    }
    else{
        allElement.forEach(el => {
            el.classList.remove('darkMode')
        })
    }
}

const iconPhonetic = document.querySelector('.player-phonetic');
const audioPhonetic = document.getElementById('sound-phonetic');

iconPhonetic.addEventListener("click", () => {
    audioPhonetic.volume = 1;
    audioPhonetic.play();
});