var currentDayEl = $("#currentDay");
var btnEl = $(".saveBtn");
// SETUP
// Day object template that will be used as a daily schedule template
var DayTemp = {
    'date': '',
    '600': '',
    '700': '',
    '800': '',
    '900': '',
    '1000': '',
    '1100': 'Event that already happened',
    '1200': 'Current',
    '1300': '',
    '1400': '',
    '1500': '',
    '1600': 'Add Event',
    '1700': '',
    '1800': ''
}
var currentDay = '';
// store all days that get populated/changed
var dailySchedules = [];
btnEl.on("click", function(){console.log("button pressed")})


// Date info
var date = moment(); // current day
var year = moment().format("YYYY");
var month = moment().format("MM");
var day = moment().format("D");
var hour = moment().format("H");
var dailySchedulesPos = '';


// 2. DISPLAY current day and highlight current time on screen
function displayDay(){
    // if dayObj is already saved in daily schedule
    if (dailySchedules !== []){
        // create new object 
        currentDay = new Object(DayTemp);
        currentDay.date = moment(date).format("MM-DD-YYYY");
        dailySchedulesPos = 0;
        dailySchedules.push(currentDay);

        currentDayEl.text(moment(date).format("MMMM Do, YYYY"));
    } else {
        // check if array contains day object with its day value === to today
        for (let i = 0; i < dailySchedules.length; i++) {
            if (dailySchedules[i]['date'] === `${date}`){
                currentDay = dailySchedulesPos[i];
                dailySchedulesPos = i;
            } else {
                // create new day object
                currentDay = DayTemp;
            }
        }
    }
}

// Grab values from screen an store them in array ON CHANGE
function save(){

    // Need to create a name that indicate month/day/year for saving
    console.log("pressed");
    // currentDay['date'] = `${month}-${day}-${year}`
    // currentDay['1600'] = "Event changed"
    // dailySchedules.push(currentDay);
}

function getLocalStorage() {
    // if (localStorage.getItem("schedule") !== null) {
    //     daily_schedules = 
    // }
}

displayDay();

console.log(dailySchedules);







// 1. Grab current date and time without moment
// var date = new Date();
// var month = date.getMonth(); // Get month
// var day = date.getDate(); // Get day
// var time = date.hours(); // Get hour
// var year = date.getFullYear()