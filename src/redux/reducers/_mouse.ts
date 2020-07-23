import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as Sensors from "~/sensors";

import * as TS from "~/redux/ts";

export type EventState = Sensors.IMouseSensorState;
export type State = {} & EventState;

export enum Actions {
	MOUSE_SET_DEFAULT = "MOUSE_SET_DEFAULT",
}

export const defaultState = Object.freeze({
	docX: 0,
	docY: 0,
	posX: 0,
	posY: 0,
	elX: 0,
	elY: 0,
	elH: 0,
	elW: 0,
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.MOUSE_SET_DEFAULT: {
				const { payload } = action;
				return payload as State;
			}
		}
	});
}

export function mapState(state: TS.RootState) {
	const { mouse } = state;

	function getMouse(): State {
		return mouse;
	}

	return {
		state: mouse,
		getMouse,
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

	function setMouse(payload: State): ReturnType<typeof set> {
		return set(Actions.MOUSE_SET_DEFAULT, payload);
	}

	/** */

	return { setMouse };
}

export function useMouse() {
	const mouse = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(mouse);
	const actions = mapDispatch(dispatch);

	return { state, ...actions };
}
