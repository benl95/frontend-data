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

// Endpoint which returns amount of registered vehicles on postal code including fuel usage
// Source: Live coding college Laurens
/* const endpoint = 'https://opendata.rdw.nl/resource/8wbe-pu7d.json'
const selectedColumns = ['postcode', 'brandstof', 'aantal']

getData(endpoint)
    .then(data => {
        console.log('all data: ', data)
        const postalCodeArray = filterData(data, selectedColumns[0])
        const fuelUsageArray = filterData(data, selectedColumns[1])
        const registeredAmountArray = filterData(data, selectedColumns[2])
        console.log(registeredAmountArray)
    })

async function getData (endpoint) {
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
}

function filterData (dataArray, column) {
    return dataArray.map(result => result[column])
}  */

