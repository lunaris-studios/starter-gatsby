import * as Immer from "immer";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

import * as TS from "~/redux/ts";

export type State = {
	active: boolean;
};

export enum Actions {
	HEADER_SET_DEFAULT = "HEADER_SET_DEFAULT",
	HEADER_SET_ACTIVE = "HEADER_SET_ACTIVE",
	HEADER_TOGGLE_ACTIVE = "HEADER_TOGGLE_ACTIVE",
}

export const defaultState = Object.freeze<State>({
	active: false,
});

export function reducer(state: State = defaultState, action: MappedDispatchActions) {
	return Immer.produce(state, (draft: Immer.Draft<State>) => {
		switch (action.type) {
			case Actions.HEADER_SET_DEFAULT: {
				const { payload } = action;
				return payload as State;
			}
			case Actions.HEADER_SET_ACTIVE: {
				const { payload } = action;
				draft.active = payload;
				break;
			}
			case Actions.HEADER_TOGGLE_ACTIVE: {
				draft.active = !draft.active;
				break;
			}
		}
	});
}
export function mapState(state: TS.RootState) {
	const { header } = state;

	function getHeader(): State {
		return header;
	}

	function isActive(): State["active"] {
		return header.active;
	}

	return {
		state: header,
		getHeader,
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

	function setHeader(payload: State): ReturnType<typeof set> {
		return set(Actions.HEADER_SET_DEFAULT, payload);
	}

	/** */

	function setActive(active: State["active"]): ReturnType<typeof set> {
		return set(Actions.HEADER_SET_ACTIVE, active);
	}

	function toggleActive(): ReturnType<typeof set> {
		return set(Actions.HEADER_TOGGLE_ACTIVE);
	}

	/** */

	return {
		setHeader,

		setActive,
		toggleActive,
	};
}

export function useHeader() {
	const header = ReactRedux.useSelector((state: TS.RootState) => state);
	const dispatch = ReactRedux.useDispatch();

	const state = mapState(header);
	const actions = mapDispatch(dispatch);

	return { ...state, ...actions };
}
