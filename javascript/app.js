// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

const formSearch = document.querySelector('.input-search');
const input = document.getElementById('search');
const errorEmpty = document.querySelector('.search-empty');
const resultDisplay = document.querySelector('.result-display');
const notDefinition = document.querySelector('.not-definition');

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
        errorEmpty.textContent = "Whoops, can't be empty...";
        input.style.outline = 'solid 1px #FF5252';
        resultDisplay.textContent = "";
        notDefinition.classList.remove('active');
        return;
    }else{
        errorEmpty.textContent = "";
        input.style.outline = 'solid 1px #A445ED';
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
            input.style.outline = 'none';
            return;
        }
        
        createDictionnary(data);
    }

    catch(error) {
        errorEmpty.textContent = `${error}`;
    }
}

function createDictionnary(data) {

    input.style.outline = 'none';

    const divPhonetic = document.createElement('div');
    divPhonetic.className = "container-phonetic";

    const phoneticAudio = [];
    data[0].phonetics.forEach(el => {
        if(el.audio){
            phoneticAudio.push(el.audio)
        }
    })

    divPhonetic.innerHTML = `
        <div class="text-phonetic">
            <h1 class="light-mode">${data[0].word}</h1>
            <p>${data[0].phonetic}</p>
        </div>
        <div class="player-phonetic">
            <svg id="play-phonetic" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>
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
    <div class="container-source">
    <p><span class="source">Source</span> <a class="light-mode" href="${data[0].sourceUrls[0]}" target="_blank">${data[0].sourceUrls[0]}</a>
    <img src="assets/images/icon-new-window.svg">
    </div>`;

    darkMode();

}


const btnDarkMode = document.querySelector('#switch');

const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
window.addEventListener('load', () => {
    console.log("Le site a chargé !")
    console.log(dark);
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



