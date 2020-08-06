import * as React from "react";

import * as Common from "~/common";

import * as Styled from "./head.styled";

export interface IHeadProps {}

export class Head extends React.PureComponent<IHeadProps, {}> {
	public static displayName = `${Common.DISPLAYNAME_PREFIX}.Head`;

	constructor(props: IHeadProps) {
		super(props);
	}

	public render() {
		return (
			<React.Fragment>
				<Styled.Head.Global />
			</React.Fragment>
		);
	}
}
