import * as React from "react";
import * as TL from "gatsby-plugin-transition-link";

import { default as _TransitionLink } from "gatsby-plugin-transition-link";

export interface ITransitionLink {
	children: React.ReactNode;
	to: TL.TransitionLinkProps["to"];
}

export const TransitionLink = (props: ITransitionLink) => (
	<_TransitionLink {...props} exit={{ length: 1 }} entry={{ length: 1 }} />
);
