const btnDarkMode = document.querySelector('#switch');

const allElement = document.querySelectorAll('.light-mode');

btnDarkMode.addEventListener('click', ()=> {
    console.log(btnDarkMode.checked);
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
})
