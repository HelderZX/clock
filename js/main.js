
/* Switch Color Mode */
const html = document.querySelector('html');
const switchColorMode = document.getElementById('switch');

if(localStorage.getItem("theme") == 'dark-mode'){
    switchColorMode.checked = true;
}

html.classList.add(localStorage.getItem("theme"));

switchColorMode.addEventListener('change', function(){
    if(switchColorMode.checked == false){
        html.classList.remove('dark-mode');
        localStorage.removeItem('theme');
    }else{
        html.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
})