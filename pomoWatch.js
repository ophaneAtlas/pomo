//TO-DO
//Different Ratios
//Preset calculation mode and manual mode

const watchStates = {
    WORK: "WORK",
    IDLE: "IDLE",
    MINI: "MINI",
    SHORT: "SHORT",
    LONG: "LONG",
    PRESET: "PRESET",

}
var timeMode;

var watchOutH = document.getElementById("watch-h");
var watchOutM = document.getElementById("watch-m");
var watchOutS = document.getElementById("watch-s");

var shortBreakMarkH = document.getElementById("shmark-h");
var shortBreakMarkM = document.getElementById("shmark-m");
var shortBreakTimeH = document.getElementById("w-shbreak-h");
var shortBreakTimeM = document.getElementById("w-shbreak-m");

var longBreakMarkH = document.getElementById("lgmark-h");
var longBreakMarkM = document.getElementById("lgmark-m");
var longBreakTimeH = document.getElementById("w-lgbreak-h");
var longBreakTimeM = document.getElementById("w-lgbreak-m");

var totalWatch = 0;
var flagTime = 0;//this will be in seconds, this is the amount of seconds that has elapsed before startBreak is called
var wstartTime = 0;
var welapsed = 0;

var wtickHour = 0;
var wtickMin = 0;
var wtickSec = 0;

var breakTime = 0;//this will be in seconds
var breakEndTime = 0;
var maxBreak = 18000;
var ratio;

var currentWatchState;

var watch = null;

var autoManuSwitch = true //true = auto false = manual

function setAuto(){
    autoManuSwitch = true;
    console.log("auto watch set!")
    timeMode = "medium"
    var autoOptionEl = document.getElementById("watch-auto");
    var autoSetEl = document.getElementById("auto-set");
    var manuOptionEl = document.getElementById("watch-manu");
    var manuSetEl = document.getElementById("manual-set");

    autoOptionEl.classList.add("highlight-flag");
    manuOptionEl.classList.remove("highlight-flag");

    autoSetEl.classList.add("show");
    autoSetEl.classList.remove("hide");
    manuSetEl.classList.add("hide");
    manuSetEl.classList.remove("show");
}

function setManual(){
    autoManuSwitch = false;
    console.log("manual watch set!")

    var autoOptionEl = document.getElementById("watch-auto");
    var autoSetEl = document.getElementById("auto-set");
    var manuOptionEl = document.getElementById("watch-manu");
    var manuSetEl = document.getElementById("manual-set");

    autoOptionEl.classList.remove("highlight-flag");
    manuOptionEl.classList.add("highlight-flag");

    autoSetEl.classList.remove("show");
    autoSetEl.classList.add("hide");
    manuSetEl.classList.remove("hide");
    manuSetEl.classList.add("show");
}

function shortTimeMode(){
    timeMode = "short";

    var shortOption = document.getElementById("auto-short");
    var medOption = document.getElementById("auto-med");
    var longOption = document.getElementById("auto-long");

    shortOption.classList.add("highlight-flag");
    medOption.classList.remove("highlight-flag");
    longOption.classList.remove("highlight-flag");
}

function medTimeMode(){
    timeMode = "medium";

    var shortOption = document.getElementById("auto-short");
    var medOption = document.getElementById("auto-med");
    var longOption = document.getElementById("auto-long");

    shortOption.classList.remove("highlight-flag");
    medOption.classList.add("highlight-flag");
    longOption.classList.remove("highlight-flag");
}

function longTimeMode(){
    timeMode = "long";

    var shortOption = document.getElementById("auto-short");
    var medOption = document.getElementById("auto-med");
    var longOption = document.getElementById("auto-long");

    shortOption.classList.remove("highlight-flag");
    medOption.classList.remove("highlight-flag");
    longOption.classList.add("highlight-flag");
}

function switchWatchStates() {
    switch (currentWatchState) {
        case "WORK":
            wtickHour = 0;
            wtickMin = 0;
            wtickSec = 0;
            totalWatch = 0;
            countUp();
            break;

        case "PRESET":

            switch (timeMode) {
                case "short":
                    ratio = 0.15;
                    breakTime = Math.floor((ratio * flagTime) + ((ratio / 2) ** flagTime));
                    breakEndTime = Date.now() + breakTime * 1000;
                    totalWatch = breakTime;
                    wtickHour = 0;
                    wtickMin = 0;
                    wtickSec = 0;
                    countDown()
                    break;
                case "medium":
                    ratio = 0.25;
                    breakTime = Math.floor((ratio * flagTime) + ((ratio / 2) ** flagTime));
                    breakEndTime = Date.now() + breakTime * 1000;
                    totalWatch = breakTime;
                    wtickHour = 0;
                    wtickMin = 0;
                    wtickSec = 0;
                    countDown()
                    break;
                case "long":
                    ratio = 0.50
                    breakTime = Math.floor((ratio * flagTime) + ((ratio / 2) ** flagTime));
                    breakEndTime = Date.now() + breakTime * 1000;
                    console.log("break time is" + breakTime);
                    totalWatch = breakTime;
                    wtickHour = 0;
                    wtickMin = 0;
                    wtickSec = 0;
                    countDown()
                    break;
            }
            break;
        
        case "SHORT":
            var breakTimeH = parseInt(shortBreakTimeH.value);
            var breakTimeM = parseInt(shortBreakTimeM.value);
            var breakTimeS = 0;
            breakTime = breakTimeH * 60 * 60 + breakTimeM * 60 + breakTimeS;
            breakEndTime = Date.now() + breakTime * 1000;
            totalWatch = breakTime;
            wtickHour = 0;
            wtickMin = 0;
            wtickSec = 0;
            countDown()
            break;

        case "LONG":
            var breakTimeH = parseInt(longBreakTimeH.value);
            var breakTimeM = parseInt(longBreakTimeM.value);
            var breakTimeS = 0;
            breakTime = breakTimeH * 60 * 60 + breakTimeM * 60 + breakTimeS;
            breakEndTime = Date.now() + breakTime * 1000;
            totalWatch = breakTime;
            wtickHour = 0;
            wtickMin = 0;
            wtickSec = 0;
            countDown()
            break;


        case "IDLE":
            wtickHour = 0;
            wtickMin = 0;
            wtickSec = 0;
    }
}

function startWatch() {
    clearInterval(watch);
    flagTime = 0;
    welapsed = 0;
    totalWatch = 0;
    wstartTime = Date.now();
    currentWatchState = watchStates.WORK;
    switchWatchStates()

}

function startBreak() {
    clearInterval(watch);
    flagTime = totalWatch;
    console.log(flagTime);

    switch (autoManuSwitch){
        case true:
            //this is auto
             currentWatchState = watchStates.PRESET
             break;
        case false:
            //this is manual
            var shMarkH = parseInt(shortBreakMarkH.value);
            var shMarkM = parseInt(shortBreakMarkM.value);
            var lgMarkH = parseInt(longBreakMarkH.value);
            var lgMarkM = parseInt(longBreakMarkM.value);

            var totalshMark = shMarkH * 60 * 60 + shMarkM * 60 + 0;
            var totallgMark = lgMarkH * 60 * 60 + lgMarkM * 60 + 0;

            if(flagTime <= totalshMark){
                currentWatchState = watchStates.SHORT;
            }else{

                if(flagTime>=totallgMark){
                    currentWatchState = watchStates.LONG;
                }
            }

    }

    
    switchWatchStates();

}

function resetWatch() {
    clearInterval(watch);
    currentWatchState = watchStates.IDLE;
    switchWatchStates();
    watchOutH.textContent = wtickHour;
    watchOutM.textContent = wtickMin;
    watchOutS.textContent = wtickSec;

}

function countUp() {
    console.log("counting up")
    watch = setInterval(() => {
        welapsed = Math.floor((Date.now() - wstartTime) / 1000);
        totalWatch = welapsed;
        wtickTime();
    }, 1000)

}

function countDown() {
    console.log("counting down");
    welapsed = 0;
    totalWatch = 0;
    watch = setInterval(() => {
        welapsed = Math.floor((breakEndTime - Date.now()) / 1000);
        totalWatch = welapsed;
        if (totalWatch <= 0) {
            clearInterval(watch);
            wstartTime = Date.now();
            currentWatchState = watchStates.WORK;
            switchWatchStates();
        }
        wtickTime();
    }, 1000)
}

function wtickTime() {

    wtickSec = totalWatch % 60;
    wtickMin = Math.floor(totalWatch / 60);
    wtickHour = Math.floor(wtickMin / 60);
    wtickMin = wtickMin % 60;

    watchOutH.textContent = wtickHour;
    watchOutM.textContent = wtickMin;
    watchOutS.textContent = wtickSec;


}