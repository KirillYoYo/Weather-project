import api from '../api'

export const START_WEATRER_PENDING = 'START_WEATRER_PENDING';
export const START_WEATRER_SUCCESS = 'START_WEATRER_SUCCESS';
export const START_WEATRER_ERROR = 'START_WEATRER_ERROR';

export const UPDATE_WEATRER_PENDING = 'UPDATE_WEATRER_PENDING';
export const UPDATE_WEATRER_SUCCESS = 'UPDATE_WEATRER_SUCCESS';
export const UPDATE_WEATRER_ERROR = 'UPDATE_WEATRER_ERROR';


export function startWeather() {
	return function (dispatch, getState) {
		// const url = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f530d3890b53a7f55a460c4423cc7e02`;
		const url = `http://api.openweathermap.org/data/2.5/forecast?q=London,us&units=metric&APPID=f530d3890b53a7f55a460c4423cc7e02`;

		dispatch({
			type: 'START_WEATRER_PENDING',
			payload: {
				userId: 'payloadXXX'
			}
		});

		fetch(url)
			.then(
				response => response.json(),
			)
			.then((json) => dispatch({
				type: 'START_WEATRER_SUCCESS',
				payload: {
					userId: 'payloadSuc',
					data12: 'response ',
					data: json,
				}
			}))
			.catch(error => dispatch({
					type: 'START_WEATRER_ERROR',
					error: true,
					payload: {
						userId: 'payloadERR',
						error
					}
				})
			);
	}
}

export function updateWeather(cnt) {
	return function (dispatch, getState) {
		// const url = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=f530d3890b53a7f55a460c4423cc7e02`;
		const url = `http://api.openweathermap.org/data/2.5/forecast?q=Moscow,us&units=metric&APPID=f530d3890b53a7f55a460c4423cc7e02`;

		dispatch({
			type: 'UPDATE_WEATRER_PENDING',
			payload: {
				userId: 'payloadXXX'
			}
		});

		fetch(url)
			.then(
				response => response.json(),
			)
			.then((json) => dispatch({
				type: 'UPDATE_WEATRER_SUCCESS',
				payload: {
					userId: 'payloadSucUPDATE',
					data12: 'response UPDATE',
					data: json,
					cnt_calls: cnt
				}
			}))
			.catch(error => dispatch({
					type: 'UPDATE_WEATRER_ERROR',
					error: true,
					payload: {
						userId: 'payloadERR',
						error
					}
				})
			);
	}
}
