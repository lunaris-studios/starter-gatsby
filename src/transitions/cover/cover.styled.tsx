import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";
import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Components from "~/components";

import { ICoverProps } from "./cover";

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components";

/**
 * Table of Contents
 *
 * [Cover]
 */

/**
 * [Cover]
 * - [Cover.Container(WRAPPER)]
 */

interface Cover {
	Container: SC.StyledComponent<
		Spring.Animatable,
		any,
		ICoverContainerAttrs,
		keyof ICoverContainerAttrs
	>;
}

export const Cover = {} as Cover;

/**
 * [Cover.Container]
 */

interface ICoverContainerProps extends SC.ThemeProps<SC.DefaultTheme>, ICoverProps {}

interface ICoverContainerAttrs extends ICoverContainerProps {}

Cover.Container = styled(Spring.animated.div).attrs(
	(props: ICoverContainerProps): ICoverContainerAttrs => ({
		...props,
	})
)`
	${Protocol.Snippets.size("100vh", "100vw")}

	background: ${(props: ICoverContainerProps) => props.background};

	display: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
`;
