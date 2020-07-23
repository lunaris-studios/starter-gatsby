import * as React from "react";

import * as Animators from "~/animators";
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

const defaultProps = Object.freeze<IFooProps>({
	foo: true
});

const defaultState = Object.freeze<IFooState>({
	bar: false,
});


export class Foo extends React.PureComponent<IFooProps, IFooState, {}> {
	static readonly defaultProps: IFooProps = defaultProps;
	private defaultState: IFooState = defaultState;

	public state: IFooState = this.defaultState;
	private animate: Animated.Controller = new Animated.Controller();

	public render() {
		const {
			// ...
		} = this.props; 

		return (
			<Styled.Foo.Container>
				{/* ... */}
			</Styled.Foo.Container>
		)
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
