import * as React from "react";
import * as Styled from "styled-components";

import * as Style from "~/style";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [Observer]
 * - [Observer.Mouse]
 * - [Observer.Scroll]
 */

/**
 * [Observer]
 * - [Observer.Container(WRAPPER)]
 * - - [Observer.Mouse(NODE)]
 * - - [Observer.Scroll(NODE)]
 */

interface Observer {
	Container: Styled.StyledComponent<"div", any, IObserverContainerAttrs, keyof IObserverContainerAttrs>;

	Mouse: ObserverMouse;
}

export const Observer = {} as Observer;

/**
 * [Observer.Container]
 */

interface IObserverContainerProps {}

interface IObserverContainerAttrs extends IObserverContainerProps {}

Observer.Container = styled("div").attrs(
	(props: IObserverContainerProps): IObserverContainerAttrs => ({
		...props,
	})
)`
	${Style.Snippets.cover()}
	overflow: auto;
`;

/**
 * [Observer.Mouse]
 * - [Observer.Mouse.Container(WRAPPER)]
 */

interface ObserverMouse {
	Container: Styled.StyledComponent<"div", any, IObserverMouseContainerAttrs, keyof IObserverMouseContainerAttrs>;
}

Observer.Mouse = {} as ObserverMouse;

/**
 * [Observer.Mouse.Container]
 */

interface IObserverMouseContainerProps {}

interface IObserverMouseContainerAttrs extends IObserverMouseContainerProps {}

Observer.Mouse.Container = styled("div").attrs(
	(props: IObserverMouseContainerProps): IObserverMouseContainerAttrs => ({
		...props,
	})
)`
	${Style.Snippets.size("auto", "auto")}
`;
