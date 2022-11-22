
/* Switch Color Mode */
var html = document.querySelector('html');
var switch_colorMode = document.getElementById('switch');
/*
window.onload = function () {
    var page = document.querySelector('html');
    page.classList.add(localStorage.getItem("theme"));
}
*/
switch_colorMode.addEventListener('change', function(){
    html.classList.toggle('dark-mode');
    //localStorage.setItem('theme', html.classList);
})