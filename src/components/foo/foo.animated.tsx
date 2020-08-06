import * as Spring from "react-spring";

import * as Common from "~/common";
import * as Util from "~/util";

import * as Component from "./foo";

export enum Type {
	CONTAINER_TRANSITION = "CONTAINER_TRANSITION",
}

export interface IContainerTransition {
	opacity: number;
	transform: string;
}

export interface IContainerTransitionOptions extends Component.IFooProps {}

const defaultContainerTransition = Object.freeze<IContainerTransition>({
	opacity: 0,
	transform: "translate3d(0%, -100%, 0%)",
});

export class Container {
	public controller: Spring.Controller = new Spring.Controller();

	public static defaultContainerTransition: IContainerTransition = defaultContainerTransition;

	public transitionProps(options: IContainerTransitionOptions) {
		const { foo } = options;

		const props: Spring.TransitionDefaultProps = Object.freeze({
			from: defaultContainerTransition,
			enter: () => async (next) => {
				await next({
					opacity: 1,
					transform: "translate3d(100%, 0%, 0%)",
				});
			},
			leave: () => async (next) => {
				await next({
					opacity: 0,
					transform: "translate3d(100%, 0%, 0%)",
				});
			},
			onStart: () => {},
			onRest: () => {},
		});

		return props;
	}
}
