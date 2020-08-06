import * as React from "react";

import * as Common from "~/common";

export interface INotFoundPageProps {}

class NotFoundPageImpl extends React.PureComponent<INotFoundPageProps> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.NotFoundPage`;

	constructor(props: INotFoundPageProps) {
		super(props);
	}

	public render() {
		return <React.Fragment>Page Not Found!</React.Fragment>;
	}
}

export const NotFoundPage = NotFoundPageImpl;
