// URL endpoint
const endpoints = ['https://opendata.rdw.nl/resource/m9d7-ebf2.json?$limit=100000', 'https://opendata.rdw.nl/resource/8ys7-d773.json?$limit=100000'];

// Specific columns
const columnNames = ['kenteken', 'brandstof_omschrijving', 'co2_uitstoot_gecombineerd', 'emissiecode_omschrijving', 'voertuigsoort', 'merk', 'handelsbenaming'];

// Retrieve data from url
// Thanks to Vincent and Jonah for helping me with refactoring the code to fetch multiple datasets
getData(endpoints)
	.then((data) => convertToJSON(data))
	.then((data) => {
		// All data from both datasets
		console.log('all data: ', data);

		const licensedVehicles = data[0];

		// Filter desired columns from dataset using filterData function
		const licensePlateNumber = filterData(data[1], columnNames[0]);
		const fuelUsage = filterData(data[1], columnNames[1]);
		const co2Emission = filterData(data[1], columnNames[2]);
		const emissionCode = filterData(data[1], columnNames[3]);

		// Convert strings to integers and remove NaN values from array
		const parsedCo2Emission = convertToInteger(co2Emission);
		const parsedEmissionCode = convertToInteger(emissionCode);
		const convertedCo2Emission = removeNaN(parsedCo2Emission);
		const convertedEmissionCode = removeNaN(parsedEmissionCode);

		// Merge arrays into one array
		let carArray = mergeArrays(licensePlateNumber, fuelUsage, convertedCo2Emission, convertedEmissionCode);
		console.log(carArray);

		let merged = merge(carArray, licensedVehicles);
	});

// Function to fetch data from url and parse to json
async function getData(url) {
	const response = url.map((url) => fetch(url));
	return Promise.all(response);
}

// Function to  convert data to JSON
function convertToJSON(response) {
	const url = response.map((url) => url.json());
	return Promise.all(url).then((result) => result);
}

// Function to filter data
function filterData(dataArray, column) {
	return dataArray.map((result) => result[column]);
}

function merge(a, b) {
	let carArray = a;
	let licensedVehicles = b;

	const result = carArray.map((carArray, i) => {
		const carInfo = licensedVehicles.find((carInfo) => carArray.id === carInfo.kenteken);
		carArray.carInfo = carInfo;
		console.log(i);
		return carArray;
	});
	console.log(result.filter((x) => x.carInfo));
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
