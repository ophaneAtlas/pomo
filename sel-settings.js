timeSet = document.getElementById("time-settings-flex");
bgSet = document.getElementById("bg-settings-flex");
soundSet = document.getElementById("sound-settings-flex");

function showTimeSet(){

    timeSet.classList.remove("hide");
    timeSet.classList.add("show");

    bgSet.classList.add("hide");
    bgSet.classList.remove("show");
    soundSet.classList.add("hide");
    soundSet.classList.remove("show");

}

function showBgSet(){

    bgSet.classList.remove("hide");
    bgSet.classList.add("show");

    timeSet.classList.add("hide");
    timeSet.classList.remove("show");
    soundSet.classList.add("hide");
    soundSet.classList.remove("show");

}

function showSoundSet(){

    soundSet.classList.remove("hide");
    soundSet.classList.add("show");

    timeSet.classList.add("hide");
    timeSet.classList.remove("show");
    bgSet.classList.add("hide");
    bgSet.classList.remove("show");
}

showTimeSet();