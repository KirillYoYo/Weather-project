import {
	START_WEATRER_PENDING,
	START_WEATRER_SUCCESS,
	START_WEATRER_ERROR,
} from '../actions/weather';

const initialState = {
	items: null,
	isLoad: false,
	loading: false,
};

export default function weather(state = initialState, action = {}) {
	switch (action.type) {
		case START_WEATRER_PENDING:
			return {
				...state,
				loading: true
			};
		case START_WEATRER_SUCCESS:
			return {
				...state,
				isLoad: true,
				loading: false,
				items: action.payload.data,
			};
		case START_WEATRER_ERROR:
			return {
				...state,
				loading: 'ERRORRRRRr!!!',
				weatherErrors: action
			};
		default:
			return state;
	}
}