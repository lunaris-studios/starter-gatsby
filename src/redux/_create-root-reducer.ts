import * as Redux from "redux";

import * as Reducers from "~/redux/reducers";

export const createRootReducer = Redux.combineReducers({
	device: Reducers.Device.reducer,
	header: Reducers.Header.reducer,
	location: Reducers.Location.reducer,
	mouse: Reducers.Mouse.reducer,
	navigation: Reducers.Navigation.reducer,
	theme: Reducers.Theme.reducer,
	user: Reducers.User.reducer,
	windowSize: Reducers.WindowSize.reducer,
});
