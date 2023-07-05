const cardTypography = document.getElementById('typography');
const labelTypo = document.getElementById('label-typo');
const inputsTypo = document.querySelectorAll('.card-typography input');

const body = document.querySelector('body');

cardTypography.addEventListener('click', () => {
    getLabel();
    getTypo();
})

function getLabel(){
    inputsTypo.forEach((el) => {
        if(el.checked){
            labelTypo.textContent = el.value
        }
    }) 
}

function getTypo(){
    console.log(labelTypo.textContent);
    if(labelTypo.textContent === 'Sans-Serif'){
        body.style.fontFamily = "'Inter', sans-serif";
    }
    else if(labelTypo.textContent === 'Serif'){
        body.style.fontFamily = "'Lora', serif";
    }
    else if(labelTypo.textContent === 'Mono'){
        body.style.fontFamily = "'Inconsolata', monospace";
    }
}
