const cardTypography = document.getElementById('typography');
const labelTypo = document.getElementById('label-typo');
const inputsTypo = document.querySelectorAll('.card-typography input');


cardTypography.addEventListener('click', () => {
    getLabel();
    getTypo();
})

function getLabel(){
    inputsTypo.forEach((el) => {
        el.addEventListener('click', () => {
            cardTypo.classList.toggle('active-card-typography');
        })
        
        if(el.checked){
            labelTypo.textContent = el.value
        }
        
    }) 
}

function getTypo(){
    if(labelTypo.textContent === 'Sans-Serif'){
        document.body.style.fontFamily = "'Inter', sans-serif";
    }
    else if(labelTypo.textContent === 'Serif'){
        document.body.style.fontFamily = "'Lora', serif";
    }
    else if(labelTypo.textContent === 'Mono'){
        document.body.style.fontFamily = "'Inconsolata', monospace";
    }
}

const selectTypo = document.getElementById('select-typo')
const cardTypo = document.querySelector('.card-typography')

selectTypo.addEventListener('click', () => {
    cardTypo.classList.toggle('active-card-typography')
})
