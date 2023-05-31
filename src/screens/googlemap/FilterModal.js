import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Switch,
	PanResponder,
} from "react-native";
import React, { useState, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeft } from "lucide-react-native";

export default function FilterModal({ toggle, setModalVisible }) {
	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderRelease: (e, gestureState) => {
				if (gestureState.dy > 5) {
					// Close the modal when dragged down by a certain threshold (e.g., 50)
					setModalVisible(false);
				}
			},
		})
	).current;
	const [distance, setDistance] = useState("");
	const [type, setType] = useState(companyType);
	const [plug, setPlug] = useState(plugType);

	const handleOneChange = id => {
		let data = type.map(item => {
			if (id === item.id) {
				return { ...item, isChecked: !item.isChecked };
			}
			return item;
		});
		setType(data);
	};

	const plugTypeSelector = id => {
		let data = plug.map(item => {
			if (id === item.id) {
				return { ...item, isChecked: !item.isChecked };
			}
			return item;
		});
		setPlug(data);
	};

	const handleAllChange = () => {
		// alert('called')
		let data = type.map(item => {
			return { ...item, isChecked: true };
		});
		setType(data);
	};
	const handleUnselect = () => {
		// alert('called')
		let data = type.map(item => {
			return { ...item, isChecked: false };
		});
		setType(data);
	};

	return (
		<SafeAreaView
			style={{ ...styles.container }}
			{...panResponder.panHandlers}>
			<View
				style={{
					backgroundColor: "",
					justifyContent: "center",
					alignItems: "center",
					height: 60,
					width: "100%",
				}}>
				<Text style={{ color: "white", fontSize: 25 }}>Header</Text>
				<TouchableOpacity
					style={{ position: "absolute", top: 15, left: 10 }}
					onPress={toggle}>
					<ChevronLeft color="white" size={30} />
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View style={{ margin: 20 }}>
					<Text style={{ color: "white", marginBottom: 20 }}>
						အကွာအဝေး
					</Text>
					<FlatList
						data={distanceItems}
						keyExtractor={item => item.id}
						numColumns={4}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={{
									backgroundColor:
										distance === item.value
											? "#0084ff"
											: "black",
									padding: 1,
									height: 30,
									width: 70,
									margin: 5,
									borderRadius: 8,
								}}
								onPress={() => {
									setDistance(item.value);
								}}>
								<Text
									style={{
										color: "white",
										textAlign: "center",
									}}>
									{item.name}
								</Text>
							</TouchableOpacity>
						)}
					/>
				</View>

				<View style={{ margin: 20 }}>
					<Text style={{ color: "white", marginBottom: 20 }}>
						ပလပ်ပေါက်အမျိုးအစားများ
					</Text>
					<View>
						<FlatList
							data={plug}
							keyExtractor={item => item.id}
							//  numColumns={1}
							renderItem={({ item }) => (
								<View style={{}}>
									<Text style={{ color: "white" }}>
										{item.name}
									</Text>
									<Switch
										onValueChange={() => {
											plugTypeSelector(item.id);
										}}
										value={item.isChecked ? true : false}
									/>
								</View>
							)}
						/>
					</View>
				</View>

				<View style={{ margin: 20 }}>
					<Text style={{ color: "white", marginBottom: 20 }}>
						ကုမ္မဏီအမျိုးအစား
					</Text>
					<View
						style={{
							justifyContent: "space-around",
							flexDirection: "row",
						}}>
						<TouchableOpacity
							onPress={handleAllChange}
							style={{
								backgroundColor: "blue",
								borderRadius: 50,
								marginRight: 20,
								padding: 10,
								width: 150,
								marginBottom: 20,
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Text
								style={{
									color: "white",
								}}>
								Select all
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleUnselect}
							style={{
								backgroundColor: "gray",
								borderRadius: 50,
								marginRight: 20,
								width: 150,
								padding: 10,
								marginBottom: 20,
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Text style={{ color: "white" }}>Deselect all</Text>
						</TouchableOpacity>
					</View>
					<FlatList
						data={type}
						keyExtractor={item => item.id}
						// numColumns={1}
						renderItem={({ item }) => (
							<View>
								<Text style={{ color: "white" }}>
									{item.type}
								</Text>
								<Switch
									onValueChange={() => {
										handleOneChange(item.id);
									}}
									value={item.isChecked ? true : false}
								/>
							</View>
						)}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
const distanceItems = [
	{
		id: 1,
		name: "500 M",
		value: "500M",
		isChecked: false,
	},
	{
		id: 2,
		name: "1 KM",
		value: "1KM",
		isChecked: false,
	},
	{
		id: 3,
		name: "2 KM",
		value: "2KM",
		isChecked: false,
	},
	{
		id: 4,
		name: "5 KM",
		value: "5KM",
		isChecked: false,
	},
	{
		id: 5,
		name: "10 KM",
		value: "10KM",
		isChecked: false,
	},
	{
		id: 6,
		name: "20 KM",
		value: "20KM",
		isChecked: false,
	},
	{
		id: 7,
		name: "50 KM",
		value: "50KM",
		isChecked: false,
	},
	{
		id: 8,
		name: "100 KM",
		value: "100KM",
		isChecked: false,
	},
];

const plugType = [
	{
		id: 1,
		name: "CSS Type 1",
		value: "csstype1",
		isChecked: false,
	},
	{
		id: 2,
		name: "CSS Type 2",
		value: "csstype2",
		isChecked: false,
	},
	{
		id: 3,
		name: "GB/T",
		value: "gbt",
		isChecked: false,
	},
	{
		id: 4,
		name: "J1772 Type 1",
		value: "J1772type1",
		isChecked: false,
	},
	{
		id: 5,
		name: "Mennekes Type 2",
		value: "mennekestype2",
		isChecked: false,
	},
	{
		id: 6,
		name: "Super Charge",
		value: "supercharger",
		isChecked: false,
	},
];

const companyType = [
	{
		id: 1,
		type: "Alpha Alliance",
		value: "AlphaAlliance",
		isChecked: false,
	},
	{
		id: 2,
		type: "Ace Motor",
		value: "AceMotor",
		isChecked: false,
	},
	{
		id: 3,
		type: "ChargeLab",
		value: "ChargeLab",
		isChecked: false,
	},
	{
		id: 4,
		type: "eCharge",
		value: "ECharge",
		isChecked: false,
	},
	{
		id: 5,
		type: "EVCS",
		value: "EVCS",
		isChecked: false,
	},
	{
		id: 6,
		type: "Tesla",
		value: "Tesla",
		isChecked: false,
	},
];
