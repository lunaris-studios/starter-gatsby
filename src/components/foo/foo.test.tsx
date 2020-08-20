import * as React from "react";
import * as Testing from "@testing-library/react";

import * as Util from "~/util";
import * as Gatsby from "~/gatsby";

import * as Component from "./foo";
import * as Styled from "./foo.styled";

// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Foo", () => {
	it("renders correctly", () => {
		const node = Util.testWrapper(<Component.Foo />);
		const FooContainer = find(node.baseElement, Styled.Foo.Container);

		expect(FooContainer).toMatchSnapshot();
	});
});
