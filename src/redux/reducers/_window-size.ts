import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as Sensors from "~/sensors";

import * as TS from "~/redux/ts";

export type EventState = Sensors.IWindowSizeSensorState;
export type State = {} & EventState;
export enum Actions {
	WINDOW_SET_DEFAULT = "WINDOW_SET_DEFAULT",
}

export const defaultState = Object.freeze<State>({
	height: 0,
	width: 0,
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.WINDOW_SET_DEFAULT: {
				const { payload } = action;
				return payload as State;
			}
		}
	});
}

export function mapState(state: TS.RootState) {
	const { windowSize } = state;

	function getWindowSize(): State {
		return windowSize;
	}

	return {
		state: windowSize,
		getWindowSize,
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

	function setWindowSize(payload: State): ReturnType<typeof set> {
		return set(Actions.WINDOW_SET_DEFAULT, payload);
	}

	/** */

	return { setWindowSize };
}

export function useWindow() {
	const windowSize = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(windowSize);
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
