import * as Redux from "redux";

const throttled = {};

// https://redux.js.org/advanced/middleware
export function throttle(props: Redux.MiddlewareAPI) {
	return function (next: Redux.Dispatch) {
		return function (action: Redux.AnyAction) {
			const time = action.meta && action.meta.throttle;

			if (!time) {
				return next(action);
			}
			if (throttled[action.type]) {
				return;
			}

			throttled[action.type] = true;

			setTimeout(() => {
				throttled[action.type] = false;
			}, time);

			return next(action);
		};
	};
}
