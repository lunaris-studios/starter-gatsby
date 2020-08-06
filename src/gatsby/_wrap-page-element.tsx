import * as GB from "gatsby";
import * as Protocol from "@paradigmjs/protocol";
import * as React from "react";
import * as SC from "styled-components";

import styled from "styled-components";

export interface IWrapPageElement
	extends GB.WrapRootElementBrowserArgs,
		GB.WrapPageElementNodeArgs {}

export function wrapPageElement(props: IWrapPageElement) {
	const { element } = props;

	return <Container>{element}</Container>;
}

/**
 * [Container]
 */

interface IFooContainerProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IFooContainerAttrs extends IFooContainerProps {}

const Container = styled("div").attrs(
	(props: IFooContainerProps): IFooContainerAttrs => ({
		...props,
	})
)``;
