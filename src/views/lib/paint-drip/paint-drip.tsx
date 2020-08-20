import * as GB from "gatsby";
import * as React from "react";

import * as Common from "~/common";

export interface IPaintDripPageProps {}

export class PaintDripPageImpl extends React.PureComponent<IPaintDripPageProps> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.PaintDripPage`;

	constructor(props: IPaintDripPageProps) {
		super(props);
	}

	public render() {
		return (
			<React.Fragment>
				This is an example page! Click on this link to test an animation:
				<GB.Link to="/">Custom animated link to another page</GB.Link>
			</React.Fragment>
		);
	}
}

export const PaintDripPage = PaintDripPageImpl;
