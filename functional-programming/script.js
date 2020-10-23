// Store data in variable
const surveyAnswers = data()

// Search array of data with map method and use a switch statement to convert the given answers to actual days.
const getQuestionForAnswers = surveyAnswers.map((column) => {
    switch(column.lievelingsWeekdag) {
        case '1':
            column.lievelingsWeekdag = 'Monday'
            break
        case '2':
            column.lievelingsWeekdag = 'Tuesday'
            break
        case '3':
            column.lievelingsWeekdag = 'Wednesday'
            break
        case '4':
            column.lievelingsWeekdag = 'Thursday'
            break
        case '5':
            column.lievelingsWeekdag = 'Friday'
            break
        case '6':
            column.lievelingsWeekdag = 'Saturday'
            break
        case '7':
            column.lievelingsWeekdag = 'Sunday'
            break
        case '':
            column.lievelingsWeekdag = 'No input'
            break
    }
    return column.lievelingsWeekdag
})

console.log(getQuestionForAnswers)



