import * as React from "react";
import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Components from "~/components";

import * as Animated from "./foo.animated";
import * as Styled from "./foo.styled";

/**
 * [Foo]
 * - [Foo.Container(WRAPPER)]
 */

export interface IFooProps {
	/**
	 * Indicates whether or not the foo is foo
	 * @default true
	 */
	foo: boolean;
}

export interface IFooState {
	/**
	 * Indicates whether or not the foo is bar
	 * @default false
	 */
	bar: boolean;
}

export interface IFooAnimated {
	/**
	 * Transition animation for [Foo.Container]
	 */
	container: Animated.Container;
}

const defaultProps = Object.freeze<IFooProps>({
	foo: true,
});

const defaultState = Object.freeze<IFooState>({
	bar: false,
});

const defaultAnimated = Object.freeze<IFooAnimated>({
	container: new Animated.Container(),
});

export class Foo extends React.PureComponent<IFooProps, IFooState, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.Overlay`;

	public static readonly defaultProps: IFooProps = defaultProps;
	public static readonly defaultState: IFooState = defaultState;
	public static readonly defaultAnimated: IFooAnimated = defaultAnimated;

	public state: IFooState = defaultState;
	public animated: IFooAnimated = defaultAnimated;

	public render() {
		const {
			foo,
			// ...
		} = this.props;

		const {
			bar,
			// ...
		} = this.state;

		const containerTransitionProps = this.animated.container.transitionProps({
			foo,
		});

		return (
			<Spring.Transition items={foo} {...containerTransitionProps}>
				{(style, visible) =>
					visible && <Styled.Foo.Container style={style}>{/* ... */}</Styled.Foo.Container>
				}
			</Spring.Transition>
		);
	}

	public componentDidMount() {
		// ...
	}

	public componentDidUpdate(prevProps: IFooProps) {
		// ...
	}

	public componentWillUnmount() {
		// ...
	}
}
