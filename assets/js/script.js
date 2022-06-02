var currentDayEl = $("#currentDay");
var btnEl = $(".saveBtn");
var textAreaEl = $("textarea");
var scheduleStorage = localStorage.getItem("dailySchedules");
var timeInterval = '';
// Day object template that will be used as a daily schedule template
var DayTemp = {
    'date': '',
    '600': '',
    '700': '',
    '800': '',
    '900': '',
    '1000': '',
    '1100': '',
    '1200': '',
    '1300': '',
    '1400': '',
    '1500': '',
    '1600': '',
    '1700': '',
    '1800': ''
}
var textAreaActive = '';
var currentDay = '';
// store all days that get populated/changed
var dailySchedules = [];

// Eventlisteners
btnEl.on("click", save);
textAreaEl.on("keyup", (event) => {
    textAreaActive = event;
    console.log(textAreaActive);
});

// Date info
var date = moment(); // current day
var year = date.format("YYYY");
var month = date.format("MM");
var day = date.format("D");
var hour = date.format("H");
var dailySchedulesPosition = 0;

// 2. DISPLAY current day and highlight current time on screen
function displayDay() {

    // load localstorage
    getLocalStorage();

    // apply coloring to schedule
    colorFormat(hour);

    // if dayObj is already saved in daily schedule
    if (dailySchedules.length === 0) {
        // create new object 
        createNewDayObject();
    }
    else {
        // check if array contains day object with its day value === to today
        for (let i = 0; i < dailySchedules.length; i++) {
            if (dailySchedules[i]['date'] === `${date.format("MM-DD-YYYY")}`) {
                currentDayEl.text(date.format("MMMM Do, YYYY"));
                currentDay = dailySchedules[i];
                dailySchedulesPosition = i;
                showCurrentSchedule();
            } else {
                // create new day object
                createNewDayObject();
            }
        }
    }
}

function createNewDayObject() {
    currentDay = new Object (DayTemp);
    currentDay.date = date.format("MM-DD-YYYY");
    currentDayEl.text(date.format("MMMM Do, YYYY"));
    dailySchedules.push(currentDay);
    dailySchedulesPosition = 0;
    scheduleStorage = JSON.stringify(dailySchedules);
    localStorage.setItem("dailySchedules", scheduleStorage);
}

// Grab values from screen an store them in array ON CHANGE
function save(event) {
    
    if (event.type === "keyup") {
        // save textArea on change event
        
        var textAreaId = textAreaActive.target.id;
        currentDay[textAreaId] = textAreaActive.target.value;
        scheduleStorage = JSON.stringify(dailySchedules);
        localStorage.setItem("dailySchedules", scheduleStorage);
        
    } else if (event.type === "click") {
        // save textArea on click event

        var buttonPressedID = event.target.id;
        var buttonNumber = buttonPressedID.toString().split("n")[1]; // Grab only button id number value
        
        for (i = 0; i < textAreaEl.length; i++) {
            
            if (textAreaEl[i].id === buttonNumber) {
                currentDay[buttonNumber] = textAreaEl[i].value;
                scheduleStorage = JSON.stringify(dailySchedules);
                localStorage.setItem("dailySchedules", scheduleStorage);
            }
        }
    }
    textAreaActive = '';
}

function getLocalStorage() {
    if (localStorage.getItem("dailySchedules")){
        dailySchedules = JSON.parse(localStorage.getItem("dailySchedules"));
    }

}

// Populate the schedule with data from localstorage
function showCurrentSchedule() {
    for (i = 0; i < textAreaEl.length; i++) {
        textAreaEl[i].value = currentDay[500 + Number(`${i+1}00`)]
    }
}

// Color schedule by time of day
function colorFormat(){
    for (var i = 0; i < textAreaEl.length; i++){
        var currentRowTime =  Number(textAreaEl[i].name.slice(0,2));

        //clear class list for the ith element
        textAreaEl[i].classList = [];

        if ( currentRowTime < Number(hour)){
            textAreaEl[i].classList.add("past");
        } else if (currentRowTime == Number(hour)){
            textAreaEl[i].classList.add("present");
        } else if (currentRowTime > Number(hour)) {
            textAreaEl[i].classList.add("future");
        }
    }
}

displayDay();

// Refresh page every min
timeInterval = setInterval(()=>{

    hour = moment().format("H");
    console.log("updated, hour is" + hour)
    
    if (textAreaActive != ''){
        save(textAreaActive);
        displayDay();
    } 
    
    colorFormat(); 

},15000);
