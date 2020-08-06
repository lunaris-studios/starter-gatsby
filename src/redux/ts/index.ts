import * as Redux from "redux";

import { configureStore, createRootReducer } from "~/redux";

/** */
export type RootState = ReturnType<typeof createRootReducer>;

/** */
export type RootStore = ReturnType<typeof configureStore>;

/** */
export interface CustomAction extends Redux.Action {
	payload: any;
}

/** */
export type MappedState = Partial<RootState[keyof RootState]> & {
	[key: string]: any;
};

/**
 * Shim to pass to Redux.compose to maintain component type hierarchy
 */
export interface ConnectedComponent<P extends object> extends React.ComponentClass {
	new (props: P): React.Component<P>;
}

/** */
export type Dispatch = Redux.Dispatch;
