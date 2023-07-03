const inputTypography = document.getElementById('typography');
const body = document.querySelector('body')

inputTypography.addEventListener('input', (e) => {
    console.log(inputTypography.value);
    if(inputTypography.value === 'sans-serif'){
        body.style.fontFamily = "'Inter', sans-serif";
    }
    else if(inputTypography.value === 'serif'){
        body.style.fontFamily = "'Lora', serif";
    }
    else if(inputTypography.value === 'mono'){
        body.style.fontFamily = "'Inconsolata', monospace";
    }
})