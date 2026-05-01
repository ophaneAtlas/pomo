bgEl = document.querySelector("body");
buttonsArr = document.getElementsByClassName("button");

var backgroundFilePath;
var bgData;

const fileTree = "../assets/backgrounds/"

const bgStates = {
    gardenNight: "gardenNight",
    nightCity: "nightCity"
}

var currentBg;


function switchBg(){
    switch (currentBg){
        case "gardenNight": 
            backgroundFilePath = fileTree + "garden-rain.jpg";
            bgEl.style.color = "#e0f8d6";
            
            for(let i = 0; i<buttonsArr.length; i++){
                buttonsArr[i].style.backgroundColor = "#e0f8d6";
                buttonsArr[i].style.color = "#001109";
            }

            gardenOptionEl = document.getElementById("garden-option");
            gardenOptionEl.classList.add("highlight-flag");
            nCityOptionEl = document.getElementById("n-city-option");
            nCityOptionEl.classList.remove("highlight-flag");
            setBG();
            break;
        case "nightCity":
            backgroundFilePath = fileTree + "night-city.jpg";
            bgEl.style.color = "#D4E0ED";

            for(let i = 0; i<buttonsArr.length; i++){
                buttonsArr[i].style.backgroundColor = "#D4E0ED";
                buttonsArr[i].style.color = "#002752";
            }

            gardenOptionEl = document.getElementById("garden-option");
            gardenOptionEl.classList.remove("highlight-flag");
            nCityOptionEl = document.getElementById("n-city-option");
            nCityOptionEl.classList.add("highlight-flag");
            setBG();
            break;
    }
}

function setBG(){
    bgEl.style.backgroundImage = `url(${backgroundFilePath})`}

function gardenRain(){
    currentBg = bgStates.gardenNight;
    switchBg();
}

function nightCity(){
    currentBg = bgStates.nightCity;
    switchBg();
}