import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Marker } from "react-native-maps";
import Car from "../../assets/images/CarIcon.png";

const StationMarker = ({ title, description, location }) => {
	const [showTitle, setShowTitle] = useState(false);

	const handleMarkerPress = () => {
		setShowTitle(true);
		setTimeout(() => {
			setShowTitle(false);
		}, 5000);
	};

	return (
		<Marker
			coordinate={location}
			anchor={{ x: 0.5, y: 1.5 }}
			onPress={handleMarkerPress}>
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
				}}>
				{showTitle ? (
					<View
						style={{
							backgroundColor: "white",
							borderRadius: 8,
							padding: 12,
						}}>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "bold",
								marginBottom: 4,
								alignSelf: "center",
							}}>
							{title}
						</Text>
						<Text style={{ fontSize: 14, color: "gray" }}>
							{description}
						</Text>
					</View>
				) : (
					<></>
				)}
				<View style={styles.imageContainer}>
					{/* <Image source={Car} style={{ width: 23, height: 23 }} /> */}
					<Text style={{ width: 23, height: 23 }}>⛽</Text>
				</View>
			</View>
		</Marker>
	);
};

export default StationMarker;

const styles = StyleSheet.create({
	markerStyle: {
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		borderRadius: 5,
		top: 0,
		left: 0,
		borderColor: "#514BC3",
		borderWidth: 3,
		backgroundColor: "pink",
	},
});
