import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Callout, Marker } from "react-native-maps";
import Car from "../../assets/images/CarIcon.png";

const UserMarker = ({ currentLocation }) => {
	const [showTitle, setShowTitle] = useState(false);

	const handleMarkerPress = () => {
		setShowTitle(true);
		setTimeout(() => {
			setShowTitle(false);
		}, 3000);
	};

	return (
		<Marker.Animated
			coordinate={currentLocation}
			title={showTitle ? "You" : null}
			anchor={{ x: 0.5, y: 0.5 }}
			style={styles.markerStyle}
			onPress={handleMarkerPress}>
			<View style={styles.imageContainer}>
				<Image source={Car} style={{ width: 23, height: 23 }} />
			</View>
		</Marker.Animated>
	);
};

export default UserMarker;

const styles = StyleSheet.create({
	markerStyle: {
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		position: "absolute",
		borderRadius: 50,
		top: 0,
		left: 0,
		borderColor: "#514BC3",
		borderWidth: 3,
		backgroundColor: "cyan",
	},
});
