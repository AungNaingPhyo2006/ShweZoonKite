import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DrawerLabelText = ({ title }) => {
	return <Text style={styles.txt}>{title}</Text>;
};

export default DrawerLabelText;

const styles = StyleSheet.create({
	txt: {
		fontSize: 14,
		color: "#fff",
		paddingHorizontal: 15,
	},
});
