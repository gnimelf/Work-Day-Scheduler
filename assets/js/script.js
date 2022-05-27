// SETUP
// Day object template that will be used as a daily schedule template
var day = {
    'day': '',
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

// store all days that get populated/changed
var daily_schedules = [];

// 1. Grab current date and time
var date = new Date();
var month = date.getMonth(); // Get month
var day = date.getDate(); // Get day
var time = date.hours(); // Get hour
var year = date.getFullYear()

// 2. DISPLAY current day and highlight current time on screen
function displayDay(){
    
}

// Grab values from screen an store them in array on change
function save(){

// Need to create a name that indicate month/day/year for saving

    currentDay = day;
    currentDay['date'] = `${}`
    currentDay['1600'] = "Event changed"
    daily_schedules.push[]
}

