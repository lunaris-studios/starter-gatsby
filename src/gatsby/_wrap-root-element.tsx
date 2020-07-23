import * as React from "react";
import * as GB from "gatsby";
import * as ReactRedux from "react-redux";

import * as Redux from "~/redux";

export interface IWrapRootElementProps extends GB.WrapRootElementBrowserArgs {
	defaultState: Partial<Redux.TS.RootState>;
}

export const wrapRootElement = (props: IWrapRootElementProps) => {
	const { element, defaultState } = props;

	const store = Redux.configureStore(defaultState);

	return (
		<React.Fragment>
			<ReactRedux.Provider store={store}>{element}</ReactRedux.Provider>
		</React.Fragment>
	);
};
