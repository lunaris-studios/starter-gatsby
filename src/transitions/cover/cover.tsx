import * as React from "react";
import * as Spring from "react-spring";
import * as GPTL from "gatsby-plugin-transition-link";

import * as Common from "~/common";

import * as Styled from "./cover.styled";

export interface ICoverProps {
	/**
	 * Background color of the cover slide.
	 * @default string
	 */
	background?: string;
}

const defaultProps = Object.freeze<ICoverProps>({
	background: "#000000",
});

class CoverImpl_ extends React.PureComponent<ICoverProps, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.CoverTransition`;

	constructor(props: ICoverProps) {
		super(props);
	}

	public render() {
		const { background } = this.props;

		return (
			<GPTL.TransitionPortal>
				<GPTL.TransitionState>
					{(transition) => (
						<Spring.Spring
							from={{
								transform: "translate3d(100%, 0%, 0%)",
							}}
							to={{
								transform: transition.mount
									? "translate3d(100%, 0%, 0%)"
									: "translate3d(-100%, 0%, 0%)",
							}}
						>
							{(spring) => {
								console.log(spring);
								return <Styled.Cover.Container background={background} style={spring} />;
							}}
						</Spring.Spring>
					)}
				</GPTL.TransitionState>
			</GPTL.TransitionPortal>
		);
	}
}

const CoverImpl = (props: ICoverProps = defaultProps) => {
	const { background } = props;

	const transition = GPTL.useTransitionState();

	console.log("transition", transition);

	const style = Spring.useSpring({
		transform: transition.mount ? "translate3d(100%, 0%, 0%)" : "translate3d(-100%, 0%, 0%)",
	});

	return (
		<GPTL.TransitionPortal>
			<Styled.Cover.Container background={background} style={style} />
		</GPTL.TransitionPortal>
	);
};

CoverImpl.displayName = `${Common.DISPLAYNAME_PREFIX}.CoverTransition`;

export const Cover = CoverImpl_;
