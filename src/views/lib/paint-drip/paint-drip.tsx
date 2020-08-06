import * as Gatsby from "@paradigmjs/gatsby";
import * as React from "react";

import * as Common from "~/common";
import * as Components from "~/components";

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
				<Gatsby.TransitionLink to="/" entry>
					Custom animated link to another page
				</Gatsby.TransitionLink>
			</React.Fragment>
		);
	}
}

export const PaintDripPage = PaintDripPageImpl;
