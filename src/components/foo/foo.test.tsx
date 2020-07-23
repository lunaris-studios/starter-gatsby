import * as React from "react";

import * as Util from "~/util";

import * as Component from "./foo";
import * as Styled from "./foo.styled";


// @ts-ignore
import { find } from "styled-components/test-utils";

describe("Foo", () => {
  it("renders correctly", () => {
    const node = Util.wrapper(<Component.Foo />);
    const FooContainer = find(node.baseElement, Styled.Foo.Container);
    
    expect(FooContainer).toMatchSnapshot();
  });
});
