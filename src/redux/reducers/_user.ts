import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as Sensors from "~/sensors";

import * as TS from "~/redux/ts";

export interface State {
	network: Sensors.INetworkSensorState;
	locales: Sensors.ILocaleSensorState;
}

export enum Actions {
	USER_SET_DEFAULT = "USER_SET_DEFAULT",
	USER_SET_NETWORK = "USER_SET_NETWORK",
	USER_SET_LOCALES = "USER_SET_LOCALES",
}

export const defaultState = Object.freeze<State>({
	network: Sensors.NetworkSensor.defaultState,
	locales: Sensors.LocalesSensor.defaultState,
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.USER_SET_DEFAULT: {
				const { payload } = action;
				return payload as State;
			}
			case Actions.USER_SET_NETWORK: {
				const { payload } = action;
				draft.network = payload;
				break;
			}
			case Actions.USER_SET_LOCALES: {
				const { payload } = action;
				draft.locales = payload;
				break;
			}
		}
	});
}

export function mapState(state: Partial<TS.RootState>) {
	const { user } = state;

	function getUser(): State {
		return user;
	}

	function getNetwork(): State["network"] {
		return user.network;
	}

	function getLocales(): State["locales"] {
		return user.locales;
	}

	return {
		state: user,
		getUser,
		getNetwork,
		getLocales,
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

	function setUser(payload: State): ReturnType<typeof set> {
		return set(Actions.USER_SET_DEFAULT, payload);
	}

	function setNetwork(payload: State["network"]): ReturnType<typeof set> {
		return set(Actions.USER_SET_NETWORK, payload);
	}

	function setLocales(payload: State["locales"]): ReturnType<typeof set> {
		return set(Actions.USER_SET_LOCALES, payload);
	}

	/** */

	return { setUser, setNetwork, setLocales };
}

export function useUser() {
	const user = ReactRedux.useSelector((state: TS.RootState) => state.user);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState({ user });
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
