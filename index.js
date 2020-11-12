// Import d3 modules
import { select, scaleLinear, max, scaleBand } from 'd3';

// Import parcel module
import 'regenerator-runtime/runtime';

// D3 variables
const d3 = require('d3');

// URL endpoint
const endpoints = ['https://opendata.rdw.nl/resource/m9d7-ebf2.json?$limit=100000', 'https://opendata.rdw.nl/resource/8ys7-d773.json?$limit=100000'];

// Specific columns
const columnNames = ['kenteken', 'brandstof_omschrijving', 'co2_uitstoot_gecombineerd', 'emissiecode_omschrijving', 'voertuigsoort', 'merk', 'handelsbenaming'];

// Retrieve data from datasets
getData(endpoints)
	.then((data) => convertToJSON(data))
	.then((data) => {
		// All data from both datasets
		// console.log('all data: ', data);

		// Filter desired columns from dataset using filterData function
		// First dataset
		const licensePlateNumberFirst = filterData(data[0], columnNames[0]);
		const vehicleType = filterData(data[0], columnNames[4]);
		const brand = filterData(data[0], columnNames[5]);
		const tradeName = filterData(data[0], columnNames[6]);
		// Second dataset
		const licensePlateNumberSecond = filterData(data[1], columnNames[0]);
		const fuelUsage = filterData(data[1], columnNames[1]);
		const co2Emission = filterData(data[1], columnNames[2]);
		const emissionCode = filterData(data[1], columnNames[3]);

		// Convert strings to integers and remove NaN values from array
		const parsedCo2Emission = convertToInteger(co2Emission);
		const parsedEmissionCode = convertToInteger(emissionCode);
		const convertedCo2Emission = removeNaN(parsedCo2Emission);
		const convertedEmissionCode = removeNaN(parsedEmissionCode);

		// Merge arrays into one array
		let carInfo = mergeFirstArray(licensePlateNumberFirst, vehicleType, brand, tradeName);
		// console.log(carInfo);
		let fuelInfo = mergeSecondArray(licensePlateNumberSecond, fuelUsage, convertedCo2Emission, convertedEmissionCode);
		// console.log(fuelInfo);

		// Find matches between datasets based on id's and nest carInfo array into fuelInfo array
		const matchedData = mergeDatasets(fuelInfo, carInfo);
		console.log(matchedData);
	});

// Functional patterns

// Function to fetch data from url and parse to json
// Thanks to Vincent and Jonah for helping me with refactoring the code to fetch multiple datasets
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

// Function to find matches based on id and nest into array when match is found
function mergeDatasets(a, b) {
	const carArray = a;
	const licensedVehicles = b;

	const result = carArray.map((carArray, i) => {
		const carInfo = licensedVehicles.find((carInfo) => carArray.id === carInfo.id);
		carArray.carInfo = carInfo;
		console.log(i);
		return carArray;
	});
	const matchedData = result.filter((x) => x.carInfo);
	return matchedData;
}

// Function to merge arrays into one array using map function
// With help from Jonah and Vincent, thank you!
function mergeFirstArray(mainArray, array1, array2, array3) {
	return mainArray.map((val, idx) => ({
		id: val,
		vehicleType: array1[idx],
		brand: array2[idx],
		tradeName: array3[idx],
	}));
}

function mergeSecondArray(mainArray, array1, array2, array3) {
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
