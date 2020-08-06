import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Sensors from "@paradigmjs/sensors";
import * as Universal from "@paradigmjs/universal";
import * as Util from "@paradigmjs/util";

import * as Common from "~/common";
import * as Redux from "~/redux";

import * as Styled from "./observer.styled";

export interface IOberserverProps extends ReduxProps, SensorProps {}

type ReduxProps = ReactRedux.ConnectedProps<typeof redux>;
type SensorProps = Universal.ComposedProps<typeof sensors>;

class ObserverImpl extends React.PureComponent<IOberserverProps, {}> {
	public static readonly displayName = `${Common.DISPLAYNAME_PREFIX}.Observer`;

	public constructor(props: IOberserverProps) {
		super(props);
	}

	public componentDidUpdate() {
		const { client: clientStore, theme: themeStore } = this.props.store;
		const { client: clientDispatch, theme: themeDispatch } = this.props.dispatch;

		/** Locale */
		const { locale: localeSensor } = this.props.sensors;
		if (!Util.isEqual(clientStore.locale, localeSensor)) {
			clientDispatch.setLocale(localeSensor);
		}

		/** Location */
		const { location: locationSensor } = this.props.sensors;
		if (!Util.isEqual(clientStore.location, locationSensor)) {
			clientDispatch.setLocation(locationSensor);
		}

		/** Motion */
		const { deviceMotion: motionSensor } = this.props.sensors;
		if (!Util.isEqual(clientStore.motion, motionSensor)) {
			clientDispatch.setMotion(motionSensor);
		}

		/** Mouse */
		const { mouse: mouseSensor } = this.props.sensors;
		if (!Util.isEqual(clientStore.mouse, mouseSensor)) {
			clientDispatch.setMouse(mouseSensor);
		}

		/** Network */
		const { network: networkSensor } = this.props.sensors;
		if (!Util.isEqual(clientStore.network, networkSensor)) {
			clientDispatch.setNetwork(networkSensor);
		}

		/** Orientation */
		const { deviceOrientation: orientationSensor } = this.props.sensors;
		if (!Util.isEqual(clientStore.orientation, orientationSensor)) {
			clientDispatch.setOrientation(orientationSensor);
		}

		/** Window Size */
		const { windowSize: windowSizeSensor } = this.props.sensors;
		if (!Util.isEqual(clientStore.windowSize, windowSizeSensor)) {
			clientDispatch.setWindowSize(windowSizeSensor);
			themeDispatch.setDeviceByWindowSize(windowSizeSensor);
		}
	}

	public render() {
		const { children } = this.props;

		const { mouse: mouseSensor } = this.props.sensors;

		return (
			<Styled.Observer.Container>
				<Styled.Observer.Mouse.Container ref={mouseSensor.refHandlers?.target}>
					{children}
				</Styled.Observer.Mouse.Container>
			</Styled.Observer.Container>
		);
	}
}

//

function mapState(state: Redux.TS.RootState) {
	const client = Redux.Reducers.Client.mapState(state);
	const theme = Redux.Reducers.Theme.mapState(state);

	return { store: { client, theme } };
}

function mapDispatch(dispatch: Redux.TS.Dispatch) {
	const client = Redux.Reducers.Client.mapDispatch(dispatch);
	const theme = Redux.Reducers.Theme.mapDispatch(dispatch);

	return { dispatch: { client, theme } };
}

const redux = ReactRedux.connect(mapState, mapDispatch);

const sensors = Universal.compose(
	Sensors.withDeviceOrientationSensor,
	Sensors.withDeviceMotionSensor,
	Sensors.withLocaleSensor,
	Sensors.withLocationSensor,
	Sensors.withMouseSensor,
	Sensors.withNetworkSensor,
	Sensors.withWindowSizeSensor
);

export const Observer = redux(sensors(ObserverImpl));
