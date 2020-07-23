import * as React from "react";
import * as GPTL from "gatsby-plugin-transition-link";

export default () => (
	<div>
		This is an example page! Click on this link to test an animation:
		<GPTL.AniLink paintDrip to="/fade">
			Paint drip to another page
		</GPTL.AniLink>
	</div>
);
