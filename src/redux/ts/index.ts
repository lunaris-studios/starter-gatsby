import * as Redux from "~/redux";

/** */
export type RootState = ReturnType<typeof Redux.createRootReducer>;

/** */
export type RootStore = ReturnType<typeof Redux.configureStore>;

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

/**
 * Generic flux based action object.
 */
export interface Action<T> {
	type: T;
	payload: any;
}
