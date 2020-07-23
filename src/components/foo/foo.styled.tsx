import * as React from "react"
import * as SC from "styled-components"

// re-import `styled-components` development mode DOM classnames.
import styled, { css } from "styled-components"

/**
 * Table of Contents
 *
 * [Foo]
 */

/**
 * [Foo]
 * - [Foo.Container(WRAPPER)]
 */

interface Foo {
  Container: SC.StyledComponent<
    "div",
    any,
    IFooContainerAttrs,
    keyof IFooContainerAttrs
  >
}

export const Foo = {} as Foo

/**
 * [Foo.Container]
 */

interface IFooContainerProps extends SC.ThemeProps<SC.DefaultTheme> {}

interface IFooContainerAttrs extends IFooContainerProps {}

Foo.Container = styled("div").attrs(
  (props: IFooContainerProps): IFooContainerAttrs => ({
    ...props,
  })
)`
	// ...
`
