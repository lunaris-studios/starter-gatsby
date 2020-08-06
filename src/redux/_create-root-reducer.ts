import * as Redux from "redux";

import * as Reducers from "~/redux/reducers";

export const createRootReducer = Redux.combineReducers({
	client: Reducers.Client.reducer,
	header: Reducers.Header.reducer,
	navigation: Reducers.Navigation.reducer,
	theme: Reducers.Theme.reducer,
});
