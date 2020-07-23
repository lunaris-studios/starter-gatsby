import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as Sensors from "~/sensors";

import * as TS from "~/redux/ts";

export type EventState = Sensors.ILocationSensorState;
export type State = {} & EventState;

export enum Actions {
	LOCATION_SET_DEFAULT = "LOCATION_SET_DEFAULT",
}

export const defaultState = Object.freeze<State>({
	trigger: "",
	state: {},
	length: 0,
	hash: "",
	host: "",
	hostname: "",
	href: "",
	origin: "",
	pathname: "",
	port: "",
	protocol: "",
	search: "",
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.LOCATION_SET_DEFAULT: {
				const { payload } = action;
				return payload as State;
			}
		}
	});
}
export function mapState(state: TS.RootState) {
	const { location } = state;

	function getLocation(): State {
		return location;
	}

	return {
		state: location,
		getLocation,
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

	function setLocation(payload: State): ReturnType<typeof set> {
		return set(Actions.LOCATION_SET_DEFAULT, payload);
	}

	/** */

	return { setLocation };
}

export function useLocation() {
	const location = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(location);
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
