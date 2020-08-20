import * as Immer from "immer";
import * as Protocol from "@paradigmjs/protocol";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import * as Sensors from "@paradigmjs/sensors";

import * as TS from "~/redux/ts";
import * as Reducers from "~/redux/reducers";

export interface State {
	binds: Binds;
	constants: Constants;
}

/**
 * Dynamic theme states
 */
export interface Binds {
	device: Protocol.Device;
	scheme: Protocol.Scheme;
}

/**
 * Immutable theme states
 */
export interface Constants {
	alignments: typeof Protocol.Alignment;
	boundaries: typeof Protocol.Boundary;
	breakpoints: typeof Protocol.Breakpoint;
	colors: typeof Protocol.Color;
	devices: typeof Protocol.Device;
	elevations: typeof Protocol.Elevation;
	fonts: typeof Protocol.Device;
	intents: typeof Protocol.Intent;
	keys: typeof Protocol.Key;
	positions: typeof Protocol.Position;
	schemes: typeof Protocol.Scheme;
	sizes: typeof Protocol.Device;
	spaces: typeof Protocol.Space;
}

export enum Actions {
	THEME_SET_DEFAULT = "THEME_SET_DEFAULT",
	THEME_SET_BIND = "THEME_SET_BIND",
}

export const defaultBinds = Object.freeze<Binds>({
	device: Protocol.Device.DESKTOP,
	scheme: Protocol.Scheme.LIGHT,
});

export const defaultConstants = Object.freeze<Constants>({
	alignments: Protocol.Alignment,
	boundaries: Protocol.Boundary,
	breakpoints: Protocol.Breakpoint,
	colors: Protocol.Color,
	devices: Protocol.Device,
	elevations: Protocol.Elevation,
	fonts: Protocol.Device,
	intents: Protocol.Intent,
	keys: Protocol.Key,
	positions: Protocol.Position,
	schemes: Protocol.Scheme,
	sizes: Protocol.Device,
	spaces: Protocol.Space,
});

export const defaultState = Object.freeze<State>({
	binds: defaultBinds,
	constants: defaultConstants,
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.THEME_SET_DEFAULT: {
				const { payload } = action;
				draft = payload;
				break;
			}
			case Actions.THEME_SET_BIND: {
				const { payload } = action;
				draft.binds[payload.name] = payload.value;
				break;
			}
		}
	});
}

export function mapState(state: TS.RootState) {
	const { theme } = state;

	function getTheme(): State {
		return theme;
	}

	/** */

	function getDevice(): State["binds"]["device"] {
		return theme.binds.device;
	}

	function isDeviceMobile(): boolean {
		return Boolean(theme.binds.device === Protocol.Device.MOBILE);
	}

	function isDeviceTablet(): boolean {
		return Boolean(theme.binds.device === Protocol.Device.TABLET);
	}

	function isDeviceDesktop(): boolean {
		return Boolean(theme.binds.device === Protocol.Device.DESKTOP);
	}

	function isDeviceUltrawide(): boolean {
		return Boolean(theme.binds.device === Protocol.Device.ULTRAWIDE);
	}

	function isDeviceDesktopOrBigger(): boolean {
		return Boolean(
			theme.binds.device === Protocol.Device.DESKTOP ||
				theme.binds.device === Protocol.Device.ULTRAWIDE
		);
	}

	/** */

	function getScheme(): State["binds"]["scheme"] {
		return theme.binds.scheme;
	}

	function isSchemeDark(): boolean {
		return Boolean(theme.binds.scheme === Protocol.Scheme.DARK);
	}

	function isSchemeLight(): boolean {
		return Boolean(theme.binds.scheme === Protocol.Scheme.LIGHT);
	}

	return {
		...theme.constants,
		getTheme,

		getDevice,
		isDeviceMobile,
		isDeviceTablet,
		isDeviceDesktop,
		isDeviceUltrawide,
		isDeviceDesktopOrBigger,

		getScheme,
		isSchemeDark,
		isSchemeLight,
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

	function setTheme(payload: State) {
		return set(Actions.THEME_SET_DEFAULT, payload);
	}

	function setBind<N extends keyof State["binds"]>(
		name: N,
		value: State["binds"][N]
	): ReturnType<typeof set> {
		const payload = Object.freeze({ name, value });
		return set(Actions.THEME_SET_BIND, payload);
	}

	/** */

	function setDevice(device: Protocol.Device): ReturnType<typeof setBind> {
		return setBind("device", device);
	}

	function setDeviceMobile(): ReturnType<typeof setDevice> {
		return setDevice(Protocol.Device.MOBILE);
	}

	function setDeviceDesktop(): ReturnType<typeof setDevice> {
		return setDevice(Protocol.Device.DESKTOP);
	}

	function setDeviceTablet(): ReturnType<typeof setDevice> {
		return setDevice(Protocol.Device.TABLET);
	}

	function setDeviceUltrawide(): ReturnType<typeof setDevice> {
		return setDevice(Protocol.Device.ULTRAWIDE);
	}

	function setDeviceByWindowSize(
		windowSize: Sensors.IWindowSizeSensorState
	): ReturnType<typeof setDevice> {
		const { width } = windowSize;
		const entries = Object.entries(Protocol.Breakpoint);

		const device = entries.reduce((acc, entry) => {
			const [device, values] = entry;
			const { min, max } = values;

			// TODO (sam): remove truthy check following @paradigmjs/sensors update
			if (width && width > min && width < max) {
				acc = device as Protocol.Device;
			}

			return acc;
		}, "" as Protocol.Device);

		return setDevice(device);
	}

	/** */

	function setScheme(scheme: Protocol.Scheme): ReturnType<typeof setBind> {
		return setBind("scheme", scheme);
	}

	function setSchemeDark(): ReturnType<typeof setScheme> {
		return setScheme(Protocol.Scheme.DARK);
	}

	function setSchemeLight(): ReturnType<typeof setScheme> {
		return setScheme(Protocol.Scheme.LIGHT);
	}

	/** */

	return {
		setTheme,
		setBind,

		setDevice,
		setDeviceMobile,
		setDeviceDesktop,
		setDeviceTablet,
		setDeviceUltrawide,
		setDeviceByWindowSize,

		setScheme,
		setSchemeDark,
		setSchemeLight,
	};
}

export function useTheme() {
	const theme = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(theme);
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
