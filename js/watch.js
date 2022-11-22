
var locations = document.querySelectorAll('div.otherSpindles-box');
var main = document.getElementById('clock');
var date = document.querySelector('.date p');
var DateTime = luxon.DateTime;
var mainTimeZone = 'Europe/Lisbon';
var mainZone = 'Lisboa';

const updateTime = function(){
    locations.forEach(local => {
        const time = DateTime.now().setZone(local.getAttribute('data-timezone')).toFormat("HH:mm");
        var clock = local.querySelector('p');
        clock.innerHTML = time;
        main.innerHTML = DateTime.now().setZone(mainTimeZone).toFormat("HH:mm:ss");
        date.innerHTML = DateTime.now().setZone(mainTimeZone).toLocaleString(DateTime.DATE_HUGE);
        document.getElementById('country').innerText = mainZone;
    });
}

const items = document.querySelectorAll('.otherSpindles-box');
items.forEach(element => {
    element.addEventListener('click', function() {
        mainTimeZone = element.getAttribute('data-timezone');
        mainZone = element.querySelector('.zone').innerText;
    });
});

setInterval( function () { updateTime() }, 1000);