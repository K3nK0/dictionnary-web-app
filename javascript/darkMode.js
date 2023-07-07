const btnDarkMode = document.querySelector('#switch');



btnDarkMode.addEventListener('click', ()=> {
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
})
