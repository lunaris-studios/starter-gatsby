import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as Style from "~/style";

import * as TS from "~/redux/ts";
import * as Reducers from "~/redux/reducers";

export interface State {
	binds: Binds;
	constants: Constants;
}

/** Dynamic theme states */
export interface Binds {
	[Style.Bind.DEVICE]?: Style.Device;
	[Style.Bind.MODE]?: Style.Mode;
}

/** Immutable theme states */
export interface Constants {
	alignments: typeof Style.Alignment;
	boundaries: typeof Style.Boundary;
	breakpoints: typeof Style.Breakpoint;
	colors: typeof Style.Color;
	devices: typeof Style.Device;
	elevations: typeof Style.Elevation;
	fonts: typeof Style.Device;
	intents: typeof Style.Intent;
	keys: typeof Style.Key;
	modes: typeof Style.Mode;
	positions: typeof Style.Position;
	sizes: typeof Style.Device;
	spaces: typeof Style.Space;
}

export enum Actions {
	THEME_SET_DEFAULT = "THEME_SET_DEFAULT",
	THEME_SET_BIND = "THEME_SET_BIND",
}

export const defaultBinds = Object.freeze<Binds>({
	[Style.Bind.DEVICE]: Style.Device.DESKTOP,
	[Style.Bind.MODE]: Style.Mode.LIGHT,
});

export const defaultConstants = Object.freeze<Constants>({
	alignments: Style.Alignment,
	boundaries: Style.Boundary,
	breakpoints: Style.Breakpoint,
	colors: Style.Color,
	devices: Style.Device,
	elevations: Style.Elevation,
	fonts: Style.Device,
	intents: Style.Intent,
	keys: Style.Key,
	modes: Style.Mode,
	positions: Style.Position,
	sizes: Style.Device,
	spaces: Style.Space,
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

	function getDevice(): State["binds"][Style.Bind.DEVICE] {
		return theme.binds[Style.Bind.DEVICE];
	}

	function isDeviceMobile(): boolean {
		return Boolean(theme.binds[Style.Bind.DEVICE] === Style.Device.MOBILE);
	}

	function isDeviceTablet(): boolean {
		return Boolean(theme.binds[Style.Bind.DEVICE] === Style.Device.TABLET);
	}

	function isDeviceDesktop(): boolean {
		return Boolean(theme.binds[Style.Bind.DEVICE] === Style.Device.DESKTOP);
	}

	function isDeviceUltrawide(): boolean {
		return Boolean(theme.binds[Style.Bind.DEVICE] === Style.Device.ULTRAWIDE);
	}

	function isDeviceDesktopOrBigger(): boolean {
		return Boolean(
			theme.binds[Style.Bind.DEVICE] === Style.Device.DESKTOP ||
				theme.binds[Style.Bind.DEVICE] === Style.Device.ULTRAWIDE
		);
	}

	/** */

	function getMode(): State["binds"][Style.Bind.MODE] {
		return theme.binds[Style.Bind.MODE];
	}

	function isModeDark(): boolean {
		return Boolean(theme.binds[Style.Bind.MODE] === Style.Mode.DARK);
	}

	function isModeLight(): boolean {
		return Boolean(theme.binds[Style.Bind.MODE] === Style.Mode.LIGHT);
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

		getMode,
		isModeDark,
		isModeLight,
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

	function setBind<N extends keyof State["binds"]>(name: N, value: State["binds"][N]): ReturnType<typeof set> {
		const payload = Object.freeze({ name, value });
		return set(Actions.THEME_SET_BIND, payload);
	}

	/** */

	function setDevice(device: Style.Device): ReturnType<typeof setBind> {
		return setBind(Style.Bind.DEVICE, device);
	}

	function setDeviceMobile(): ReturnType<typeof setDevice> {
		return setDevice(Style.Device.MOBILE);
	}

	function setDeviceDesktop(): ReturnType<typeof setDevice> {
		return setDevice(Style.Device.DESKTOP);
	}

	function setDeviceTablet(): ReturnType<typeof setDevice> {
		return setDevice(Style.Device.TABLET);
	}

	function setDeviceUltrawide(): ReturnType<typeof setDevice> {
		return setDevice(Style.Device.ULTRAWIDE);
	}

	function setDeviceByWindowSize(windowSize: Reducers.WindowSize.EventState): ReturnType<typeof setDevice> {
		const { width } = windowSize;
		const entries = Object.entries(Style.Breakpoint);

		const device = entries.reduce((acc, entry) => {
			const [device, values] = entry;
			const { min, max } = values;

			if (width > min && width < max) {
				acc = device as Style.Device;
			}

			return acc;
		}, "" as Style.Device);

		return setDevice(device);
	}

	/** */

	function setMode(mode: Style.Mode): ReturnType<typeof setBind> {
		return setBind(Style.Bind.MODE, mode);
	}

	function setModeDark(): ReturnType<typeof setMode> {
		return setMode(Style.Mode.DARK);
	}

	function setModeLight(): ReturnType<typeof setMode> {
		return setMode(Style.Mode.LIGHT);
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

		setMode,
		setModeDark,
		setModeLight,
	};
}

export function useTheme() {
	const theme = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(theme);
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
