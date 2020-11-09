// URL endpoint
const licensedVehicles = ['https://opendata.rdw.nl/resource/m9d7-ebf2.json'];
const licensedVehiclesFuel = ['https://opendata.rdw.nl/resource/8ys7-d773.json'];

// Specific columns
const columnNames = ['kenteken', 'brandstof_omschrijving', 'co2_uitstoot_gecombineerd', 'emissiecode_omschrijving'];

// Retrieve data from url
getData(licensedVehiclesFuel).then((data) => {
	console.log('all data: ', data);
	// Filter desired columns from dataset using filterData function
	const licensePlateNumber = filterData(data, columnNames[0]);
	const fuelUsage = filterData(data, columnNames[1]);
	const co2Emission = filterData(data, columnNames[2]);
	const emissionCode = filterData(data, columnNames[3]);

	// Convert strings to integers and remove NaN values from array
	const parsedCo2Emission = convertToInteger(co2Emission);
	const parsedEmissionCode = convertToInteger(emissionCode);
	const convertedCo2Emission = removeNaN(parsedCo2Emission);
	const convertedEmissionCode = removeNaN(parsedEmissionCode);

	// Merge arrays into one array
	let carArray = mergeArrays(licensePlateNumber, fuelUsage, convertedCo2Emission, convertedEmissionCode);
	console.log(carArray);
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

// Function to convert strings to integers
function convertToInteger(arr) {
	return arr.map((val) => parseInt(val));
}

// Function to remove NaN values from array
function removeNaN(arr) {
	return arr.map((val) => {
		if (isNaN(val)) {
			return null;
		}
		return val;
	});
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
