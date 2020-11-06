// Store json into variable
const endpoint = 'data.json';

// Create array to select column when retrieving data
const selectedColumn = ['lievelingsWeekdag'];

getData(endpoint).then((data) => {
	//Display all data
	console.log('all data: ', data);
	// Sort data based on column subject
	const filteredData = filterData(data, selectedColumn[0]);
	console.log(filteredData);
	// Convert input filtered data to days
	const convertedData = filteredData.map(convertValues);
	console.log(convertedData);
});

// Fetch data from JSON file
async function getData(endpoint) {
	const response = await fetch(endpoint);
	const data = await response.json();
	return data;
}

// Function to sort data based on column subject
function filterData(dataArray, column) {
	return dataArray.map((result) => result[column]);
}

// Function to convert input values to days
function convertValues(data) {
	switch (data) {
		case '1':
			return 'Monday';
		case '2':
			return 'Tuesday';
		case '3':
			return 'Wednesday';
		case '4':
			return 'Thursday';
		case '5':
			return 'Friday';
		case '6':
			return 'Saturday';
		case '7':
			return 'Sunday';
		case '':
			return 'No input';
	}
}
