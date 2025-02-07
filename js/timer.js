window.onload = function () {
    /* Display Time Variables */
    var first_interval;
    var milliseconds = 0, seconds = 0, minutes = 0, hours = 0;
    var appendMilliseconds = document.getElementById("milliseconds");
    var appendSeconds = document.getElementById("seconds");
    var appendMinutes = document.getElementById("minutes");
    var appendHours = document.getElementById("hours");

    /* Buttons Variables*/
    var buttonStart = document.getElementById("button-start");
    var buttonPause = document.getElementById("button-pause");
    var buttonReset = document.getElementById("button-reset");

    var plusButtons = document.querySelectorAll('.plus');
    var minusButtons = document.querySelectorAll('.minus');

    /* Start */
    buttonStart.onclick = function(){
        start();
    }

    function start(){
        minutes = parseInt(appendMinutes.innerHTML) || 0;
        seconds = parseInt(appendSeconds.innerHTML) || 0;
        milliseconds = parseInt(appendMilliseconds.innerHTML) || 0;

        clearInterval(first_interval);
        first_interval = setInterval(startFirstTimer, 10);

        appendMilliseconds.setAttribute("contenteditable", "false");
        appendMinutes.setAttribute("contenteditable", "false");
        appendSeconds.setAttribute("contenteditable", "false");

        buttonPause.removeAttribute('hidden');
        buttonStart.setAttribute('hidden', true);
        buttonReset.setAttribute('hidden', true);

        plusButtons.forEach(function(button) {
            button.style.opacity = '0';
            button.setAttribute('disabled', true);
        });

        minusButtons.forEach(function(button) {
            button.style.opacity = '0';
            button.setAttribute('disabled', true);
        });
    }

    /* Pause */
    buttonPause.onclick = function(){
        pause();
    }

    function pause(){
        clearInterval(first_interval);

        appendMilliseconds.setAttribute("contenteditable", "true");
        appendMinutes.setAttribute("contenteditable", "true");
        appendSeconds.setAttribute("contenteditable", "true");

        buttonStart.removeAttribute('hidden');
        buttonReset.removeAttribute('hidden');
        buttonPause.removeAttribute('hidden', true);

        plusButtons.forEach(function(button) {
            button.style.opacity = '1';
            button.removeAttribute('disabled');
        });

        minusButtons.forEach(function(button) {
            button.style.opacity = '1';
            button.removeAttribute('disabled');
        });
    }

    /* Reset */
    buttonReset.onclick = function (){
        reset();
    }

    function reset(){
        clearInterval(first_interval);
        milliseconds = seconds = minutes = hours = 0;

        appendMilliseconds.innerHTML = "00";
        appendSeconds.innerHTML = "00";
        appendMinutes.innerHTML = "00";

        appendMilliseconds.setAttribute("contenteditable", "true");
        appendMinutes.setAttribute("contenteditable", "true");
        appendSeconds.setAttribute("contenteditable", "true");

        buttonStart.removeAttribute('hidden');
        buttonPause.setAttribute('hidden', true);
        buttonReset.removeAttribute('hidden');

        plusButtons.forEach(function(button) {
            button.style.opacity = '1';
            button.removeAttribute('disabled');
        });

        minusButtons.forEach(function(button) {
            button.style.opacity = '1';
            button.removeAttribute('disabled');
        });
    }

    /* Countdown Logic */
    function startFirstTimer () {
        if (milliseconds === 0 && seconds === 0 && minutes === 0 && hours === 0) {
            clearInterval(first_interval);
            reset();
            return;
        }

        if (milliseconds === 0) {
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                        milliseconds = 99;
                    }
                } else {
                    minutes--;
                    seconds = 59;
                    milliseconds = 99;
                }
            } else {
                seconds--;
                milliseconds = 99;
            }
        } else {
            milliseconds--;
        }

        updateDisplay();
    }

    function updateDisplay() {
        appendMilliseconds.innerHTML = milliseconds < 10 ? "0" + milliseconds : milliseconds;
        appendSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
        appendMinutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
    }

    /* Input Validation */
    [appendMilliseconds, appendMinutes, appendSeconds].forEach(function (element) {
        element.addEventListener('input', function () {
            validateInput(this);
        });
    });

    function validateInput(input) {
        input.textContent = input.textContent.replace(/\D/g, '');
        if (input.textContent.length > 2) {
            input.textContent = input.textContent.slice(0, 2);
        }

        if(parseInt(input.textContent) > 60) {
            input.textContent = 60;
        }

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(input);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    plusButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var container = button.parentElement;

            var input = container.querySelector('span');

            var currentValue = parseInt(input.textContent) || 0;

            var newValue = currentValue + 1;

            if(newValue > 60) {
                newValue = 60;
            }

            input.textContent = newValue < 10 ? "0" + newValue : newValue;
        })
    });

    minusButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var container = button.parentElement;

            var input = container.querySelector('span');

            var currentValue = parseInt(input.textContent) || 0;

            var newValue = currentValue - 1;

            if (newValue < 0) {
                newValue = 0;
            }

            input.textContent = newValue < 10 ? "0" + newValue : newValue;
        })
    });

}
