// Paste this at end of url to increase limit: ?$limit=2000
const url = 'https://opendata.rdw.nl/resource/8ys7-d773.json?$limit=100000'

// Retrieve data from url
getData(url)
    .then(data => {
        console.log('all data: ', data)
        // Get fuel usage of all registered cars
        const fuelUsage = filterData(data, 'brandstof_omschrijving')
        console.log(fuelUsage)
        const fuelOccurences = countOccurences(fuelUsage)
        console.log(fuelOccurences)
    })

// Function to fetch data from url
async function getData (url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// Function to filter data
function filterData (dataArray, column) {
    return dataArray.map(result => result[column])  
}  

// Reduce function to count unique input values
// Source: https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements
// Source: https://codeburst.io/learn-understand-javascripts-reduce-function-b2b0406efbdc 
// arr = the array to reduce the function on, acc = accumalates all of the callbacks returned values, val = the current value being processed 
// If value is returned accumalator count increases
function countOccurences(arr) {
    return arr.reduce(function(acc, val) {
        if (acc[val]) {
            acc[val] += 1
        } else {
            acc[val] = 1
        }
        return acc
    }, [])
}