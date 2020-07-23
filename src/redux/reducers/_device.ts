import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as Sensors from "~/sensors";

import * as TS from "~/redux/ts";

export interface State {
	motion: Sensors.IDeviceMotionSensorState;
	orientation: Sensors.IDeviceOrientationSensorState;
}

export enum Actions {
	DEVICE_SET_DEFAULT = "DEVICE_SET_DEFAULT",
	DEVICE_SET_MOTION = "DEVICE_SET_MOTION",
	DEVICE_SET_ORIENTATION = "DEVICE_SET_ORIENTATION",
}

export const defaultState = Object.freeze<State>({
	motion: Sensors.DeviceMotionSensor.defaultState,
	orientation: Sensors.DeviceOrientationSensor.defaultState,
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.DEVICE_SET_DEFAULT: {
				const { payload } = action;
				return payload as State;
			}
			case Actions.DEVICE_SET_MOTION: {
				const { payload } = action;
				draft.motion = payload;
				break;
			}
			case Actions.DEVICE_SET_ORIENTATION: {
				const { payload } = action;
				draft.orientation = payload;
				break;
			}
		}
	});
}

export function mapState(state: TS.RootState) {
	const { device } = state;

	function getUser(): State {
		return device;
	}

	function getMotion(): State["motion"] {
		return device.motion;
	}

	function getOrientation(): State["orientation"] {
		return device.orientation;
	}

	return {
		state: device,
		getUser,
		getMotion,
		getOrientation,
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
		return set(Actions.DEVICE_SET_DEFAULT, payload);
	}

	function setMotion(payload: State["motion"]): ReturnType<typeof set> {
		return set(Actions.DEVICE_SET_MOTION, payload);
	}

	function setOrientation(payload: State["orientation"]): ReturnType<typeof set> {
		return set(Actions.DEVICE_SET_ORIENTATION, payload);
	}

	/** */

	return { setUser, setMotion, setOrientation };
}

export function useUser() {
	const device = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(device);
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
