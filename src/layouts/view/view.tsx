import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Sensors from "@paradigmjs/sensors";
import * as Universal from "@paradigmjs/universal";
import * as Util from "@paradigmjs/util";

import * as Common from "~/common";
import * as Redux from "~/redux";
import * as Transitions from "~/transitions";

import * as Styled from "./view.styled";

export interface IViewProps {}

class ViewImpl extends React.PureComponent<IViewProps, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.ViewLayout`;

	public constructor(props: IViewProps) {
		super(props);
	}

	public componentDidUpdate() {}

	public render() {
		const { children } = this.props;

		return (
			<Styled.View.Container>
				<Transitions.Cover />
				{children}
			</Styled.View.Container>
		);
	}
}

export const View = ViewImpl;
