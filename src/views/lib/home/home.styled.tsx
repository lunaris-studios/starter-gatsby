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
 * [Home]
 */

/**
 * [Home]
 * - [Home.Container(WRAPPER)]
 */

interface Home {
	Container: SC.StyledComponent<"div", any, IHomeContainerAttrs, keyof IHomeContainerAttrs>;
}

export const Home = {} as Home;

/**
 * [Home.Container]
 */

interface IHomeContainerProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IHomeContainerAttrs extends IHomeContainerProps {}

Home.Container = styled("div").attrs(
	(props: IHomeContainerProps): IHomeContainerAttrs => ({
		...props,
	})
)`
	${Protocol.Snippets.flex("column", "space-between")}
	${Protocol.Snippets.cover()}
`;
