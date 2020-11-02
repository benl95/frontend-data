// Endpoint which returns amount of registered vehicles on postal code including fuel usage
// Source: Live coding college Laurens
const endpoint = 'https://opendata.rdw.nl/resource/8wbe-pu7d.json'
const selectedColumns = ['postcode', 'brandstof', 'aantal']

getData(endpoint)
    .then(data => {
        console.log('all data: ', data)
        const postalCodeArray = filterData(data, selectedColumns[0])
        const fuelUsageArray = filterData(data, selectedColumns[1])
        const registeredAmountArray = filterData(data, selectedColumns[2])
        console.log(registeredAmountArray)
        console.log(postalCodeArray)
        console.log(fuelUsageArray)
    })

async function getData (endpoint) {
    const response = await fetch(endpoint)
    const data = await response.json()
    return data
}

function filterData (dataArray, column) {
    return dataArray.map(result => result[column])
}  
