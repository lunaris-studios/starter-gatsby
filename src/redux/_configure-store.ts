import * as Redux from "redux";
import { default as Thunk } from "redux-thunk";

import * as Middleware from "~/redux/middleware";
import * as TS from "~/redux/ts";

import { createRootReducer } from "./_create-root-reducer";

export function configureStore(defaultState: Partial<TS.RootState> = {}) {
	// Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
	// See https://github.com/reactjs/redux/releases/tag/v3.1.0
	const store = Redux.createStore(createRootReducer, defaultState, enhance);

	if (process.env.NODE_ENV === "development") {
		(module as any).hot?.accept("./reducers", () => {
			return store.replaceReducer(require("./reducers"));
		});
	}

	return store;
}

export type GlobalStore = ReturnType<typeof configureStore>;

const compose =
	(typeof window !== "undefined" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	Redux.compose;

const enhance = compose(
	// Middleware you want to use in development:
	Redux.applyMiddleware(Thunk, Middleware.throttle)
);
