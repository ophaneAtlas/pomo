function watchSelect(){

    timerSel = document.getElementById("timer-select");
    watchSel = document.getElementById("watch-select");

    timerSel.classList.remove("highlight-flag");
    timerSel.classList.add("highlight-deflag");

    watchSel.classList.remove("highlight-deflag");
    watchSel.classList.add("highlight-flag");

    elArrTimer = document.getElementsByClassName("timer");

    for(let i = 0; i < elArrTimer.length; i++){
        elArrTimer[i].classList.add("hide");
        elArrTimer[i].classList.remove("show");
    }

    elArrWatch = document.getElementsByClassName("stopwatch");

    for(let i = 0; i < elArrWatch.length; i++){
        elArrWatch[i].classList.remove("hide");
        elArrWatch[i].classList.add("show");
    }

    pomoTitle = document.getElementById("pomo-title");
    pomoTitle.textContent = "Stopwatch"
}

function timerSelect(){
    timerSel = document.getElementById("timer-select");
    watchSel = document.getElementById("watch-select");

    timerSel.classList.remove("highlight-deflag");
    timerSel.classList.add("highlight-flag");

    watchSel.classList.remove("highlight-flag");
    watchSel.classList.add("highlight-deflag");

    elArrTimer = document.getElementsByClassName("timer");

    for(i = 0; i < elArrTimer.length; i++){
        elArrTimer[i].classList.remove("hide");
        elArrTimer[i].classList.add("show");
    }

    elArrWatch = document.getElementsByClassName("stopwatch");

    for(i = 0; i < elArrWatch.length; i++){
        elArrWatch[i].classList.add("hide");
        elArrWatch[i].classList.remove("show");
    }

    pomoTitle = document.getElementById("pomo-title");
    pomoTitle.textContent = "Timer"
}

timerSelect();