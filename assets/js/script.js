var currentDayEl = $("#currentDay");
var btnEl = $(".saveBtn");
var textAreaEl = $("textarea");
var scheduleStorage = localStorage.getItem("dailySchedules");

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

var currentDay = '';
// store all days that get populated/changed
var dailySchedules = [];
btnEl.on("click", save)

// Date info
var date = moment(); // current day
var year = moment().format("YYYY");
var month = moment().format("MM");
var day = moment().format("D");
var hour = moment().format("H");
var dailySchedulesPosition = 0;

// 2. DISPLAY current day and highlight current time on screen
function displayDay() {
    // if dayObj is already saved in daily schedule
    getLocalStorage();
    colorFormat();

    if (dailySchedules.length === 0) {
        // create new object 
        currentDay = new Object(DayTemp);
        currentDay.date = date.format("MM-DD-YYYY");
        currentDayEl.text(date.format("MMMM Do, YYYY"));
        dailySchedulesPosition = 0;
        dailySchedules.push(currentDay);
        scheduleStorage = JSON.stringify(dailySchedules);
        localStorage.setItem("dailySchedules", scheduleStorage);
    }
    else {
        // check if array contains day object with its day value === to today
        for (let i = 0; i < dailySchedules.length; i++) {
            if (dailySchedules[i]['date'] === `${date.format("MM-DD-YYYY")}`) {
                currentDay = dailySchedules[i];
                dailySchedulesPosition = i;
                showCurrentSchedule();
            } else {
                // create new day object
                currentDay = new Object (DayTemp);
                currentDay.date = date.format("MM-DD-YYYY");
                currentDayEl.text(date.format("MMMM Do, YYYY"));
                dailySchedules.push(currentDay);
                scheduleStorage = JSON.stringify(dailySchedules);
                localStorage.setItem("dailySchedules", scheduleStorage);
            }
        }
    }
}

// Grab values from screen an store them in array ON CHANGE
function save(event) {
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

function getLocalStorage() {
    if (localStorage.getItem("dailySchedules")){
        dailySchedules = JSON.parse(localStorage.getItem("dailySchedules"));
    }

}

function showCurrentSchedule() {
    for (i = 0; i < textAreaEl.length; i++) {
        textAreaEl[i].value = currentDay[500 + Number(`${i+1}00`)]
    }
}

function colorFormat(){
    for (var i = 0; i < textAreaEl.length; i++){
        if (Number(textAreaEl[i].id.slice(0,2)) < Number(hour)){
            console.log("less than")
            // textAreaEl.removeClass("present", "future");
            textAreaEl.addClass("past");

        } else if (Number(textAreaEl[i].id.slice(0,2)) === Number(hour)){
            // textAreaEl.removeClass("future", "past");
            textAreaEl.addClass("present");
        } else if (Number(textAreaEl[i].id.slice(0,2)) > Number(hour)) {
            // textAreaEl.removeClass("present", "past");
            textAreaEl.addClass("future");
        }
    }
}

// function removeZero(number){
//     if (number.slice(1) === 0){
//         return number.split("")[1];
//     } else {
//         return number;
//     }
// }

displayDay();


// console.log(dailySchedules);


// 1. Grab current date and time without moment
// var date = new Date();
// var month = date.getMonth(); // Get month
// var day = date.getDate(); // Get day
// var time = date.hours(); // Get hour
// var year = date.getFullYear()


// Need to create a name that indicate month/day/year for saving
// currentDay['date'] = `${month}-${day}-${year}`
// currentDay['1600'] = "Event changed"
// dailySchedules.push(currentDay);