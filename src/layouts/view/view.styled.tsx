import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";

import * as Common from "~/common";
import * as Components from "~/components";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [View]
 */

/**
 * [View]
 * - [View.Container(WRAPPER)]
 */

interface View {
	Container: SC.StyledComponent<"div", any, IViewContainerAttrs, keyof IViewContainerAttrs>;
}

export const View = {} as View;

/**
 * [View.Container]
 */

interface IViewContainerProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IViewContainerAttrs extends IViewContainerProps {}

View.Container = styled("div").attrs(
	(props: IViewContainerProps): IViewContainerAttrs => ({
		...props,
	})
)`
	${Protocol.Snippets.page()}
	min-height: 100vh;
	/** mobile viewport bug fix*/
	min-height: fill-available;
`;
