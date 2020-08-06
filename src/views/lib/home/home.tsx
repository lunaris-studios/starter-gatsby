import * as Gatsby from "@paradigmjs/gatsby";
import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Universal from "@paradigmjs/universal";

import * as Common from "~/common";
import * as Components from "~/components";
import * as Layouts from "~/layouts";
import * as Redux from "~/redux";

import * as Styled from "./home.styled";

export interface IHomePageProps extends ReduxProps {
	test: boolean;
}

type ReduxProps = ReactRedux.ConnectedProps<typeof redux>;

class HomePageImpl extends React.Component<IHomePageProps> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.HomePage`;

	constructor(props: IHomePageProps) {
		super(props);
	}

	public render() {
		return (
			<Layouts.View>
				<Styled.Home.Container>
					This is an example page! Click on this link to test an animation:
					<Components.TransitionLink to="/paint-drip">
						Custom animated link to another page
					</Components.TransitionLink>
					<div>{this.props.store.client.mouse.docX}</div>
					<div>{this.props.store.client.mouse.docY}</div>
					<div>{this.props.store.client.mouse.elH}</div>
					<div>{this.props.store.client.mouse.elW}</div>
					<div>{this.props.store.client.mouse.elX}</div>
					<div>{this.props.store.client.mouse.elY}</div>
					<div>{this.props.store.client.mouse.posX}</div>
					<div>{this.props.store.client.mouse.posY}</div>
				</Styled.Home.Container>
			</Layouts.View>
		);
	}
}

//

function mapStore(state: Redux.TS.RootState) {
	const client = Redux.Reducers.Client.mapState(state);
	const theme = Redux.Reducers.Theme.mapState(state);

	return Redux.createMappedStore({ client, theme });
}

function mapDispatch(dispatch: Redux.TS.Dispatch) {
	const client = Redux.Reducers.Client.mapDispatch(dispatch);
	const theme = Redux.Reducers.Theme.mapDispatch(dispatch);

	return Redux.createMappedDispatch({ client, theme });
}

const redux = ReactRedux.connect(mapStore, mapDispatch);

export const HomePage = redux(HomePageImpl);
