import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Universal from "react-universal-interface";

import * as Common from "~/common";
import * as Redux from "~/redux";
import * as Sensors from "~/sensors";
import * as Util from "~/util";

import * as Styled from "./observer.styled";

import { withHover } from 'libreact/lib/HoverSensor';

export interface IOberserverProps extends ConnectedProps {}

type ConnectedProps = Redux.ConnectedProps<typeof connector>;

// const enhancer = Redux.compose(
// 	connector,
// 	Sensors.withDeviceMotion,
// 	Sensors.withDeviceOrientation,
// 	Sensors.withLocales,
// 	Sensors.withLocation,
// 	Sensors.withMouse,
// 	Sensors.withNetwork,
// 	Sensors.withWindowSize
// );

// type ConnectedProps = Redux.ConnectedProps<typeof connector>;
// type SensorProps = Sensors.CombinedProps<{
// 	deviceMotion: Sensors.IDeviceMotionSensorProps;
// 	deviceOrientation: Sensors.IDeviceOrientationSensorProps;
// 	locales: Sensors.ILocaleSensorProps;
// 	location: Sensors.ILocationSensorProps;
// 	mouse: Sensors.IMouseSensorProps;
// 	network: Sensors.INetworkSensorProps;
// 	windowSize: Sensors.IWindowSizeSensorProps;
// }>;

// export interface IOberserverProps extends Common.IProps, ConnectedProps, SensorProps {}

// @ReactRedux.connect(mapState, mapDispatch)
// @Sensors.withDeviceMotion
@withHover
export class Oberserver extends React.PureComponent<IOberserverProps, {}> {
	// public static displayName = `${Common.DISPLAYNAME_PREFIX}.Oberserver` as any;

	public constructor(props: IOberserverProps) {
		super(props);
	}

	public componentDidUpdate() {
		const { device: deviceState } = this.props.store;
		const { device: deviceActions } = this.props.dispatch;

		const { location: locationState } = this.props.store;
		const { location: locationActions } = this.props.dispatch;

		const { mouse: mouseState } = this.props.store;
		const { mouse: mouseActions } = this.props.dispatch;

		const { theme: themeState } = this.props.store;
		const { theme: themeActions } = this.props.dispatch;

		const { user: userState } = this.props.store;
		const { user: userActions } = this.props.dispatch;

		const { windowSize: windowSizeState } = this.props.store;
		const { windowSize: windowSizeActions } = this.props.dispatch;

		/** === DEVICE MOTION === */
		const { deviceMotion: deviceMotionSensor } = this.props.sensor;
		if (!Util.isEqual(deviceState.state.motion, deviceMotionSensor.state)) {
			deviceActions.setMotion(deviceMotionSensor.state);
		}

		/** === DEVICE ORIENTATION === */
		const { deviceOrientation: deviceOrientationSensor } = this.props.sensor;
		if (!Util.isEqual(deviceState.state.orientation, deviceOrientationSensor.state)) {
			deviceActions.setOrientation(deviceOrientationSensor.state);
		}

		/** === LOCALES === */
		const { locales: localesSensor } = this.props.sensor;
		if (!Util.isEqual(userState.state.locales, localesSensor.state)) {
			userActions.setLocales(localesSensor.state);
		}

		/** === LOCATION === */
		const { network: networkSensor } = this.props.sensor;
		if (!Util.isEqual(userState.state.network, networkSensor.state)) {
			userActions.setNetwork(networkSensor.state);
		}

		/** === LOCATION === */
		const { location: locationSensor } = this.props.sensor;
		if (!Util.isEqual(locationState.state, locationSensor.state)) {
			locationActions.setLocation(locationSensor.state);
		}

		/** === MOUSE === */
		const { mouse: mouseSensor } = this.props.sensor;
		if (!Util.isEqual(mouseState.state, mouseSensor.state)) {
			mouseActions.setMouse(mouseSensor.state);
		}

		/** === WINDOW SIZE === */
		const { windowSize: windowSizeSensor } = this.props.sensor;
		if (!Util.isEqual(windowSizeState.state, windowSizeSensor.state)) {
			windowSizeActions.setWindowSize(windowSizeSensor.state);
			themeActions.setDeviceByWindowSize(windowSizeSensor.state);
		}
	}

	public render() {
		const { children } = this.props;

		const { mouse: mouseSensor } = this.props.sensor;

		return (
			<Styled.Observer.Container>
				<Styled.Observer.Mouse.Container ref={mouseSensor.refHandlers.target}>
					{children}
				</Styled.Observer.Mouse.Container>
			</Styled.Observer.Container>
		);
	}
}

//

function mapState(state: Redux.TS.RootState) {
	const device = Redux.Reducers.Device.mapState(state);
	const location = Redux.Reducers.Location.mapState(state);
	const mouse = Redux.Reducers.Mouse.mapState(state);
	const theme = Redux.Reducers.Theme.mapState(state);
	const user = Redux.Reducers.User.mapState(state);
	const windowSize = Redux.Reducers.WindowSize.mapState(state);

	return { store: { device, location, mouse, theme, user, windowSize } };
}

function mapDispatch(dispatch: Redux.Dispatch) {
	const device = Redux.Reducers.Device.mapDispatch(dispatch);
	const location = Redux.Reducers.Location.mapDispatch(dispatch);
	const mouse = Redux.Reducers.Mouse.mapDispatch(dispatch);
	const theme = Redux.Reducers.Theme.mapDispatch(dispatch);
	const user = Redux.Reducers.User.mapDispatch(dispatch);
	const windowSize = Redux.Reducers.WindowSize.mapDispatch(dispatch);

	return { dispatch: { device, location, mouse, theme, user, windowSize } };
}

const connector = ReactRedux.connect(mapState, mapDispatch);

class MyData extends React.Component {
	render () {
			return Universal.render(this.props, this.state);
	}
}

const withData = Universal.createEnhancer(MyData, 'data');