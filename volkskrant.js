// URL endpoint
const licensedVehicles = ['https://opendata.rdw.nl/resource/m9d7-ebf2.json'];
const licensedVehiclesFuel = ['https://opendata.rdw.nl/resource/8ys7-d773.json'];

// Specific columns
const columnNames = ['kenteken', 'brandstof_omschrijving', 'co2_uitstoot_gecombineerd', 'emissiecode_omschrijving'];

// Retrieve data from url
getData(licensedVehiclesFuel).then((data) => {
	console.log('all data: ', data);
	// Get license plate numbers of all registered cars
	const licensePlateNumber = filterData(data, columnNames[0]);
	// Get fuel usage of all registered cars
	const fuelUsage = filterData(data, columnNames[1]);
	// Get CO2 emission from all registered cars
	const co2Emission = filterData(data, columnNames[2]);
	// Get emission code from all registered cars
	const emissionCode = filterData(data, columnNames[3]);
	// Merge arrays
	let item = mergeArrays(licensePlateNumber, fuelUsage, co2Emission, emissionCode);
	console.log(item);
});

// Function to fetch data from url and parse to json
async function getData(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

// Function to filter data
function filterData(dataArray, column) {
	return dataArray.map((result) => result[column]);
}

// Reduce function to count occurrences of elements in array
function countOccurrences(arr) {
	return arr.reduce((acc, val) => {
		if (acc[val]) {
			acc[val] += 1;
		} else {
			acc[val] = 1;
		}
		return acc;
	}, []);
}

// Function to merge arrays into one array using map function
// With help from Jonah and Vincent, thank you!
function mergeArrays(mainArray, array1, array2, array3) {
	return mainArray.map((val, idx) => ({
		id: val,
		fuel: array1[idx],
		co2Emission: array2[idx],
		emissionCode: array3[idx],
	}));
}

// Function to convert strings to integers (in progress)

// Function to remove undefined values from array (in progress)
