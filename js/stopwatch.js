
window.onload = function () {
    /* Display Time Variables */
    var id = 0;

    var first_interval;
    var second_interval;
    var milliseconds = 00;
    var seconds = 00;
    var minutes = 00
    var hours = 00;
    var appendMilliseconds = document.getElementById("milliseconds");
    var appendSeconds = document.getElementById("seconds");
    var appendMinutes = document.getElementById("minutes");
    var appendHours = document.getElementById("hours");

    var subMilliseconds = 00;
    var subSeconds = 00;
    var subMinutes = 00
    var subHours = 00;
    var subAppendMilliseconds = document.getElementById("subMilliseconds");
    var subAppendSeconds = document.getElementById("subSeconds");
    var subAppendMinutes = document.getElementById("subMinutes");
    var subAppendHours = document.getElementById("subHours");

    /* Buttons Variables*/
    var buttonStart = document.getElementById("button-start");
    var buttonPause = document.getElementById("button-pause");
    var buttonStop = document.getElementById("button-stop");
    var buttonReset = document.getElementById("button-reset");
    var buttonSplit = document.getElementById("button-split");

    /* Table */
    var table = document.getElementsByClassName("table-laps")[0];

    /* Start */
    buttonStart.onclick = function(){
        //start both timers
        clearInterval(first_interval);
        clearInterval(second_interval);
        first_interval = setInterval(startFirstTimer, 10);
        second_interval = setInterval(startSecondTimer, 10);

        //change buttons
        buttonPause.removeAttribute('hidden');
        buttonSplit.removeAttribute('hidden');
        buttonSplit.removeAttribute('disabled');

        buttonStart.setAttribute('hidden', true);
        buttonReset.setAttribute('hidden', true);
        buttonStop.setAttribute('hidden', true);
    }

    //Pause
    buttonPause.onclick = function(){
        clearInterval(first_interval);
        clearInterval(second_interval);
        
        //change buttons
        buttonStart.removeAttribute('hidden');
        buttonReset.removeAttribute('hidden');
        
        buttonPause.setAttribute('hidden', true);
        buttonSplit.setAttribute('hidden', true);
        buttonStop.setAttribute('hidden', true);
    }
    
    /* Split */
    buttonSplit.onclick = function(){
        if(appendMinutes.innerHTML != "00" || appendSeconds.innerHTML != "00" || appendMilliseconds.innerHTML != "00") saveTime();
        resetSecondTimer(second_interval);
        second_interval = setInterval(startSecondTimer, 10);
    }

    /* Stop */
    buttonStop.onclick = function(){
        if(appendMinutes.innerHTML != "00" || appendSeconds.innerHTML != "00" || appendMilliseconds.innerHTML != "00") saveTime();
        
        clearInterval(first_interval);
        resetSecondTimer(second_interval);
        
        //change buttons
        buttonStart.removeAttribute('hidden');
        buttonReset.removeAttribute('hidden');
        
        buttonPause.setAttribute('hidden', true);
        buttonSplit.setAttribute('hidden', true);
        buttonStop.setAttribute('hidden', true);
    }

    /* Reset */
    buttonReset.onclick = function (){
        //stop timer
        resetFirstTimer(first_interval);
        resetSecondTimer(second_interval);

        //clear historic
        id = 0;
        table.querySelector('tbody').innerHTML = '';

        //change buttons
        buttonStart.removeAttribute('hidden');
        buttonSplit.removeAttribute('hidden');
        buttonSplit.setAttribute('disabled', true);
        
        buttonPause.setAttribute('hidden', true);
        buttonReset.setAttribute('hidden', true);
        buttonStop.setAttribute('hidden', true);
    }

    function resetFirstTimer (interval){
        clearInterval(interval);
        milliseconds = 00;
        seconds = 00;
        minutes = 00
        hours = 00;
        appendMilliseconds.innerHTML = "00";
        appendSeconds.innerHTML = "00";
        appendMinutes.innerHTML = "00";
    } 

    function resetSecondTimer (interval){
        clearInterval(interval);
        subMilliseconds = 00;
        subSeconds = 00;
        subMinutes = 00
        subHours = 00;
        subAppendMilliseconds.innerHTML = "00";
        subAppendSeconds.innerHTML = "00";
        subAppendMinutes.innerHTML = "00";
    }

    /* Display Time */
    function startFirstTimer () {
        
        milliseconds++;
        
        if(milliseconds <= 9){
            appendMilliseconds.innerHTML = "0" + milliseconds;
        }
        
        if (milliseconds > 9){
            appendMilliseconds.innerHTML = milliseconds;
        }
        
        if (milliseconds > 99) {
          seconds++;
          appendSeconds.innerHTML = "0" + seconds;
          milliseconds = 0;
          appendMilliseconds.innerHTML = "0" + 0;
        }
        
        if (seconds > 9){
          appendSeconds.innerHTML = seconds;
        }

        buttonStop.removeAttribute('disabled');
    }

    function startSecondTimer () {
        
        subMilliseconds++;
        
        if(subMilliseconds <= 9){
            subAppendMilliseconds.innerHTML = "0" + subMilliseconds;
        }
        
        if (subMilliseconds > 9){
            subAppendMilliseconds.innerHTML = subMilliseconds;
        }
        
        if (subMilliseconds > 99) {
          subSeconds++;
          subAppendSeconds.innerHTML = "0" + subSeconds;
          subMilliseconds = 0;
          subAppendMilliseconds.innerHTML = "0" + 0;
        }
        
        if (subSeconds > 9){
          subAppendSeconds.innerHTML = subSeconds;
        }

        buttonStop.removeAttribute('disabled');
    }

    function saveTime() {
        var line = document.createElement('tr');
        id++;

        var collumn1 = document.createElement('td');
        collumn1.innerHTML = "#" + id;

        var collumn2 = document.createElement('td');
        collumn2.innerHTML = subAppendMinutes.innerHTML +':'+ subAppendSeconds.innerHTML +':'+ subAppendMilliseconds.innerHTML;;

        var collumn3 = document.createElement('td');
        collumn3.innerHTML = appendMinutes.innerHTML +':'+ appendSeconds.innerHTML +':'+ appendMilliseconds.innerHTML;;

        line.appendChild(collumn1);
        line.appendChild(collumn2);
        line.appendChild(collumn3);
        
        table.querySelector('tbody').appendChild(line);
    }
}