import * as React from "react";
import * as GB from "gatsby";
import * as ReactRedux from "react-redux";

import * as Common from "~/common";
import * as Components from "~/components";
import * as Redux from "~/redux";

export interface IWrapRootElementProps {
	/**
	 * State to pass to the Redux store on initialization.
	 * @default object
	 */
	defaultState: Partial<Redux.TS.RootState>;

	/**
	 * React element to pass as a child / child node. By default, Gatsby
	 * will pass all page nodes as the element.
	 */
	element: React.ReactElement;
}

const defaultProps = Object.freeze<IWrapRootElementProps>({
	defaultState: {},
	element: {} as React.ReactElement,
});

class WrapRootElementImpl extends React.PureComponent<IWrapRootElementProps, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.WrapRootElement`;

	constructor(props: IWrapRootElementProps) {
		super(props);

		this.store = Redux.configureStore(this.props.defaultState);
	}

	public static readonly defaultProps: IWrapRootElementProps = defaultProps;

	public store: Redux.GlobalStore;

	public render() {
		const { element } = this.props;

		return (
			<React.Fragment>
				<Components.Head />
				<ReactRedux.Provider store={this.store}>
					<Components.Observer>{element}</Components.Observer>
				</ReactRedux.Provider>
			</React.Fragment>
		);
	}
}

export const wrapRootElement = (props: IWrapRootElementProps = defaultProps) => (
	<WrapRootElementImpl {...props} />
);
