import {
	START_WEATRER_PENDING,
	START_WEATRER_SUCCESS,
	START_WEATRER_ERROR,
	UPDATE_WEATRER_PENDING,
	UPDATE_WEATRER_SUCCESS,
	UPDATE_WEATRER_ERROR,
} from '../actions/weather';

const initialState = {
	items: null,
	isLoad: false,
	loading: false,
	newitems: null,
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

		case UPDATE_WEATRER_PENDING:
			return {
				...state,
				loading: true
			};

		case UPDATE_WEATRER_SUCCESS:
			var new_arr = state.items.list;
			action.payload.data.list.map((item) => {
				item.cnt_call = action.payload.cnt_calls;
				new_arr.push(item);
			});
			return {
				...state,
				items: {
					...state.items,
					list: new_arr
				}
			};

		case UPDATE_WEATRER_ERROR:
			return {
				...state,
				loading: 'ERRORRRRRr!!!',
				weatherErrors: action
			};
		default:
			return state;
	}
}
