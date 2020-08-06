import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import * as Sensors from "@paradigmjs/sensors";

import * as TS from "~/redux/ts";

export interface IClientState {
	locale: Sensors.ILocaleSensorState;
	location: Sensors.ILocationSensorState;
	motion: Sensors.IDeviceMotionSensorState;
	mouse: Sensors.IMouseSensorState;
	network: Sensors.INetworkSensorState;
	orientation: Sensors.IDeviceOrientationSensorState;
	windowSize: Sensors.IWindowSizeSensorState;
}

export enum EClientActions {
	CLIENT_SET_DEFAULT = "CLIENT_SET_DEFAULT",

	/** Locale */
	CLIENT_SET_LOCALE = "CLIENT_SET_LOCALE",

	/** Location */
	CLIENT_SET_LOCATION = "CLIENT_SET_LOCATION",

	/** Motion */
	CLIENT_SET_MOTION = "CLIENT_SET_MOTION",

	/** Mouse */
	CLIENT_SET_MOUSE = "CLIENT_SET_MOUSE",

	/** Network */
	CLIENT_SET_NETWORK = "CLIENT_SET_NETWORK",

	/** Orientation */
	CLIENT_SET_ORIENTATION = "CLIENT_SET_ORIENTATION",

	/** Window Size */
	CLIENT_SET_WINDOW_SIZE = "CLIENT_SET_WINDOW_SIZE",
}

export const defaultState = Object.freeze<IClientState>({
	locale: Sensors.LocaleSensor.defaultState,
	location: Sensors.LocationSensor.defaultState,
	motion: Sensors.DeviceMotionSensor.defaultState,
	mouse: Sensors.MouseSensor.defaultState,
	network: Sensors.NetworkSensor.defaultState,
	orientation: Sensors.DeviceOrientationSensor.defaultState,
	windowSize: Sensors.WindowSizeSensor.defaultState,
});

export function reducer(state: IClientState = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<IClientState>) => {
		switch (action.type) {
			case EClientActions.CLIENT_SET_DEFAULT: {
				const { payload } = action;
				return payload as IClientState;
			}

			/** Locale */
			case EClientActions.CLIENT_SET_LOCALE: {
				const { payload } = action;
				draft.locale = payload;
				break;
			}

			/** Location */
			case EClientActions.CLIENT_SET_LOCATION: {
				const { payload } = action;
				draft.location = payload;
				break;
			}

			/** Motion */
			case EClientActions.CLIENT_SET_MOTION: {
				const { payload } = action;
				draft.motion = payload;
				break;
			}

			/** Mouse */
			case EClientActions.CLIENT_SET_MOUSE: {
				const { payload } = action;
				draft.mouse = payload;
				break;
			}

			/** Network */
			case EClientActions.CLIENT_SET_NETWORK: {
				const { payload } = action;
				draft.network = payload;
				break;
			}

			/** Orientation */
			case EClientActions.CLIENT_SET_ORIENTATION: {
				const { payload } = action;
				draft.orientation = payload;
				break;
			}

			/** Window Size */
			case EClientActions.CLIENT_SET_WINDOW_SIZE: {
				const { payload } = action;
				draft.windowSize = payload;
				break;
			}
		}
	});
}

export function mapState(state: Pick<TS.RootState, "client">) {
	const { client } = state;

	function getClient(): IClientState {
		return client;
	}

	/** Locale */
	function getLocale(): IClientState["locale"] {
		return client.locale;
	}

	/** Location */
	function getLocation(): IClientState["location"] {
		return client.location;
	}

	/** Motion */
	function getMotion(): IClientState["motion"] {
		return client.motion;
	}

	/** Mouse */
	function getMouse(): IClientState["mouse"] {
		return client.mouse;
	}

	/** Network */
	function getNetwork(): IClientState["network"] {
		return client.network;
	}

	/** Orientation */
	function getOrientation(): IClientState["orientation"] {
		return client.orientation;
	}

	/** Window Size */
	function getWindowSize(): IClientState["windowSize"] {
		return client.windowSize;
	}

	return {
		...client,
		getClient,
		getLocale,
		getLocation,
		getMotion,
		getMouse,
		getNetwork,
		getOrientation,
		getWindowSize,
	};
}

export type MappedDispatch = ReturnType<typeof mapDispatch>;
export type MappedDispatchActions = ReturnType<MappedDispatch[keyof MappedDispatch]>;

export function mapDispatch(dispatch: Redux.Dispatch<Redux.AnyAction>) {
	function set(type: EClientActions, payload?: any) {
		const action = Object.freeze({ type, payload });
		return dispatch(action);
	}

	type set = ReturnType<typeof set>;

	//

	/** Client */
	function setClient(payload: IClientState): set {
		return set(EClientActions.CLIENT_SET_DEFAULT, payload);
	}

	/** Locale */
	function setLocale(payload: IClientState["locale"]): set {
		return set(EClientActions.CLIENT_SET_LOCALE, payload);
	}

	/** Location */
	function setLocation(payload: IClientState["location"]): set {
		return set(EClientActions.CLIENT_SET_LOCATION, payload);
	}

	/** Motion */
	function setMotion(payload: IClientState["motion"]): set {
		return set(EClientActions.CLIENT_SET_MOTION, payload);
	}

	/** Mouse */
	function setMouse(payload: IClientState["mouse"]): set {
		return set(EClientActions.CLIENT_SET_MOUSE, payload);
	}

	/** Network */
	function setNetwork(payload: IClientState["network"]): set {
		return set(EClientActions.CLIENT_SET_NETWORK, payload);
	}

	/** Orientation */
	function setOrientation(payload: IClientState["orientation"]): set {
		return set(EClientActions.CLIENT_SET_ORIENTATION, payload);
	}

	/** Window Size */
	function setWindowSize(payload: IClientState["windowSize"]): set {
		return set(EClientActions.CLIENT_SET_WINDOW_SIZE, payload);
	}

	//

	return {
		setClient,
		setLocale,
		setLocation,
		setMotion,
		setMouse,
		setNetwork,
		setOrientation,
		setWindowSize,
	};
}

export function useClient() {
	const client = ReactRedux.useSelector((state: TS.RootState) => state.client);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState({ client });
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
