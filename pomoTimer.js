const timerStates = {
    WORK : "WORK",
    SHBREAK : "SHBREAK",
    LGBREAK : "LGBREAK"
}

var currentState;

//inputs
const timerHour = document.getElementById("timer-h");
const timerMin = document.getElementById("timer-m");
////break times
const sBreakHour = document.getElementById("shbreak-h");
const sBreakMin = document.getElementById("shbreak-m");
const lBreakHour = document.getElementById("lgbreak-h");
const lBreakMin = document.getElementById("lgbreak-m")

//outputs
const timerOutH = document.getElementById("timer-out-h");
const timerOutM = document.getElementById("timer-out-m");
const timerOutS = document.getElementById("timer-out-s");

var tHour = 0;
var tMin = 0;
var tSec = 0;
var totalTimer = 0; //this is in seconds
var timer = null;
var timerGoing = false;
var tickHour = 0;
var tickMin = 0;
var tickSec = 0;
var telapsed = 0;
var timerEndTime = 0;

var breakCounter = 0;
var longBreakReq = 3;

timerHour.addEventListener("change", () => {
    tHour = 0;
    tHour = parseInt(timerHour.value);
    updateUI();
        
    
})

timerMin.addEventListener("change", () => {
    tMin = 0;
    tMin = parseInt(timerMin.value);

    if(timerMin.value > 60){

        tHour = Math.floor(tHour + tMin /60);
        tMin = tMin % 60;
    };

    updateUI();
})

function initTime(){
    tHour = 0;
    timerHour.value = 0;
    tHour = parseInt(timerHour.value);
   

    tMin = 0;
    timerMin.value = 30;
    tMin = parseInt(timerMin.value);

    if(timerMin.value > 60){

        tHour = Math.floor(tHour + tMin /60);
        tMin = tMin % 60;
    };

    updateUI();
}

function updateUI(){
    timerOutH.textContent = tHour;
    timerOutM.textContent = tMin;
    timerOutS.textContent = tSec;
};

function switchState(){

    switch (currentState){
    case "WORK":
        tHour = parseInt(timerHour.value);
        tMin = parseInt(timerMin.value);
        tSec = 0;
        totalTimer = tHour * 60 * 60 + tMin * 60 + tSec;
        timerEndTime = Date.now() + totalTimer * 1000;
        break;
    case "SHBREAK":
        tHour = parseInt(sBreakHour.value);
        tMin = parseInt(sBreakMin.value);
        tSec = 0;
        totalTimer = tHour * 60 * 60 + tMin * 60 + tSec;
        timerEndTime = Date.now() + totalTimer * 1000;
        break;
    case "LGBREAK":
        tHour = parseInt(lBreakHour.value);
        tMin = parseInt(lBreakMin.value);
        tSec = 0;
        totalTimer = tHour * 60 * 60 + tMin * 60 + tSec;
        timerEndTime = Date.now() + totalTimer * 1000;
        break;

    }
}


function stopTimer(){
    totalTimer = 0;
    timerGoing = false;
    if(timer !== null){
        clearInterval(timer);
    }
    currentState = timerStates.WORK;
    switchState();
    updateUI();

};

function startTimer(){

    if(timerGoing == false){
        tickerFlag = true;
        currentState = timerStates.WORK;
        switchState();
        startTicking()
        timerGoing = true;
    }
    
};

function startTicking(){
    //TO-DO:
    //Sound effects for when the timer is over 
    ///Different sounds for long vs short timer?
    timer = setInterval(() => {
        telapsed = Math.floor((timerEndTime - Date.now())/1000)
        totalTimer = telapsed; 
        if (totalTimer <= 0){
            switch (currentState){
                case "WORK":
                    if(breakCounter <= longBreakReq){
                        breakCounter++
                        clearInterval(timer);
                        currentState = timerStates.SHBREAK;
                        switchState();
                        startTicking();
                    }else{
                        breakCounter = 0;
                        clearInterval(timer);
                        currentState = timerStates.LGBREAK;
                        switchState();
                        startTicking();
                    }
                    break;

                case "SHBREAK": 
                    clearInterval(timer);
                    currentState = timerStates.WORK;
                    switchState();
                    startTicking();
                    break;

                case "LGBREAK":
                    clearInterval(timer);
                    currentState = timerStates.WORK;
                    switchState();
                    startTicking();
                    break;

                default: 
                    clearInterval(timer);
                    console.log("Something went wrong! State not reached or code not executed! (Maybe check spelling?)");
                    console.log("current state is: " + currentState);
                    break;


            }
        }
        tickTime();
    }, 1000); //ticks every 1000ms, 10ms for testing
};

function tickTime(){
    
        tickHour = 0;
        tickMin = 0;
        tickSec = 0;
        tickSec = totalTimer % 60;
        tickMin = Math.floor(totalTimer / 60);
        tickHour = Math.floor(tickMin / 60);
        tickMin = tickMin % 60;
        
        timerOutH.textContent = tickHour;
        timerOutM.textContent = tickMin;
        timerOutS.textContent = tickSec;
    }
    
