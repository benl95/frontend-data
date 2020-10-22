// Store data in variable
const surveyAnswers = data()

// Store search action in variable and create array
let columnName = 'lievelingsWeekdag'
let questionAnswers = []

// Loop through answers and convert day value to actual day
for (day of surveyAnswers) {
    switch(day[columnName]) {
        case '1':
            day[columnName] = 'Monday'
            break;
        case '2':
            day[columnName] = 'Tuesday'
            break;
        case '3':
            day[columnName] = 'Wednesday'
            break;
        case '4':
            day[columnName] = 'Thursday'
            break;
        case '5':
            day[columnName] = 'Friday'
            break;
        case '6': 
            day[columnName] = 'Saturday'
            break;
        case '7':
            day[columnName] = 'Sunday'
            break;
        default: 
            day[columnName] ='No input'
    }
    questionAnswers.push(day[columnName])
}

// Log array
console.log(questionAnswers)




