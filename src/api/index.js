var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var normalAxios = axios.create();
var mockAxios = axios.create();

// mock 数据
var mock = new MockAdapter(mockAxios);

mock.onPut('/login').reply(config => {
	let postData = JSON.parse(config.data).data;
	if (postData.user === 'admin' && postData.password === '123456') {
		return [200, require('./mock/user')];
	} else {
		return [200, require('./mock/user')];
		//return [500, {message: "Incorrect user or password"} ];
	}
});
mock.onGet('/logout').reply(200, {});
mock.onGet('/my').reply(200, require('./mock/user'));
mock.onGet('/menu').reply(200, require('./mock/menu'));
mock.onGet('/randomuser').reply((config) => {
	return new Promise(function (resolve, reject) {
		normalAxios.get('https://randomuser.me/api', {
			params: {
				results: 10,
				...config.params,
			},
			responseType: 'json'
		}).then((res) => {
			resolve([200, res.data]);
		}).catch((err) => {
			resolve([500, err]);
		});
	});
});

//mock.onGet('/startWeather').reply(200, '33333');


// function makeRequest (method, url) {
// 	return new Promise(function (resolve, reject) {
// 		var xhr = new XMLHttpRequest();
// 		xhr.open(method, url);
// 		xhr.onload = function () {
// 			if (this.status >= 200 && this.status < 300) {
// 				resolve(xhr.response);
// 			} else {
// 				reject({
// 					status: this.status,
// 					statusText: xhr.statusText
// 				});
// 			}
// 		};
// 		xhr.onerror = function () {
// 			reject({
// 				status: this.status,
// 				statusText: xhr.statusText
// 			});
// 		};
// 		xhr.send();
// 	});
// }

mock.onGet('/startWeather').reply((config) => {

	// return new Promise(function(resolve) {
	// 	setTimeout(resolve, 200);
	// });

	// makeRequest('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f530d3890b53a7f55a460c4423cc7e02')
	// 	.then(function (datums) {
	// 		console.log(datums);
	// 		return [200, datums];
	// 	})
	// 	.catch(function (err) {
	// 		console.error('Augh, there was an error!', err.statusText);
	// 	});


	// return new Promise(function (resolve, reject) {
	// 	var xhr = new XMLHttpRequest();
	// 	xhr.open('GET', "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f530d3890b53a7f55a460c4423cc7e02", false);
	// 	xhr.send().then((resolve) => {
	// 		console.log('resolve');
	// 		console.log(resolve);
	// 		resolve([200, resolve.data]);
	// 	}).catch((err) => {
	// 		console.log('err ');
	// 		console.log(err);
	// 		resolve([500, err]);
	// 	});
	// });
});

mock.onGet('/updateWeather').reply((config) => {

});

module.exports = mockAxios;
