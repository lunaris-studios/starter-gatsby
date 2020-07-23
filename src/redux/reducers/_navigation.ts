import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as TS from "~/redux/ts";

export type State = {
	active: boolean;
	routes: Route[];
};

export type Route = {
	label: string;
	path: string;
};

export enum Actions {
	NAVIGATION_SET_DEFAULT = "NAVIGATION_SET_DEFAULT",
	NAVIGATION_SET_ACTIVE = "NAVIGATION_SET_ACTIVE",
	NAVIGATION_TOGGLE_ACTIVE = "NAVIGATION_TOGGLE_ACTIVE",
	NAVIGATION_SET_ROUTES = "NAVIGATION_SET_ROUTES",
	NAVIGATION_ADD_ROUTE = "NAVIGATION_ADD_ROUTE",
}

export const defaultState = Object.freeze<State>({
	active: false,
	routes: [
		{
			label: "",
			path: "",
		},
	],
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.NAVIGATION_SET_DEFAULT: {
				const { payload } = action;
				return payload as State;
			}
			case Actions.NAVIGATION_SET_ACTIVE: {
				const { payload } = action;
				draft.active = payload;
				break;
			}
			case Actions.NAVIGATION_TOGGLE_ACTIVE: {
				draft.active = !draft.active;
				break;
			}
			case Actions.NAVIGATION_SET_ROUTES: {
				const { payload } = action;
				draft.routes = payload;
				break;
			}
			case Actions.NAVIGATION_ADD_ROUTE: {
				const { payload } = action;
				draft.routes.push(payload);
				break;
			}
		}
	});
}

export function mapState(state: TS.RootState) {
	const { navigation } = state;

	function getNavigation(): State {
		return navigation;
	}

	function isActive(): State["active"] {
		return Boolean(navigation.active);
	}

	function getRoutes(): State["routes"] {
		return navigation.routes;
	}

	return {
		state: navigation,
		getNavigation,
		getRoutes,
		isActive,
	};
}

export type MappedDispatch = ReturnType<typeof mapDispatch>;
export type MappedDispatchActions = ReturnType<MappedDispatch[keyof MappedDispatch]>;

export function mapDispatch(dispatch: Redux.Dispatch<Redux.AnyAction>) {
	function set(type: Actions, payload?: any) {
		const action = Object.freeze({ type, payload });
		return dispatch(action);
	}

	/** */

	function setNavigation(payload: State): ReturnType<typeof set> {
		return set(Actions.NAVIGATION_SET_DEFAULT, payload);
	}

	/** */

	function setActive(active: State["active"]): ReturnType<typeof set> {
		return set(Actions.NAVIGATION_SET_ACTIVE, active);
	}

	function toggleActive(): ReturnType<typeof set> {
		return set(Actions.NAVIGATION_TOGGLE_ACTIVE);
	}

	/** */

	function setRoutes(routes: State["routes"]): ReturnType<typeof set> {
		return set(Actions.NAVIGATION_SET_ROUTES, routes);
	}

	function addRoute(route: Route): ReturnType<typeof set> {
		return set(Actions.NAVIGATION_ADD_ROUTE, route);
	}

	/** */

	return {
		setNavigation,

		setActive,
		toggleActive,

		setRoutes,
		addRoute,
	};
}

export function useNavigation() {
	const navigation = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(navigation);
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
