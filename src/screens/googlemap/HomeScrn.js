import React, {
	useMemo,
	useState,
	useRef,
	useCallback,
	useEffect,
} from "react";
import {
	Button,
	Text,
	View,
	PermissionsAndroid,
	StyleSheet,
	Alert,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Circle } from "react-native-maps";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import MapViewer from "./MapViewer";
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import InfoModal from "./InfoModal";
import {
	Bell,
	Car,
	ChevronLeft,
	History,
	LocateIcon,
	MapPin,
	Settings,
	User,
} from "lucide-react-native";
import DrawerLabelText from "./DrawerLabelText";
import Hello from "./Hello";
// <===========Test components start Here===========>

function Test1() {
	const navigation = useNavigation();
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Test 1 Screen</Text>
			<Button
				title="Home"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}

function Test2() {
	const navigation = useNavigation();
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Test 2 Screen</Text>
			<Button
				title="Home"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}
function Test3() {
	const navigation = useNavigation();
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Test 3 Screen</Text>
			<Button
				title="Home"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}
function Test4() {
	const navigation = useNavigation();
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Test 4 Screen</Text>
			<Button
				title="Home"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}
function Test5() {
	const navigation = useNavigation();
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Test 5 Screen</Text>
			<Button
				title="Home"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}
function Test6() {
	const navigation = useNavigation();
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Test 6 Screen</Text>
			<Button
				title="Home"
				onPress={() => {
					navigation.goBack();
				}}
			/>
		</View>
	);
}
// <------Test components end Here-------->

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
		</DrawerContentScrollView>
	);
}

// <------------HOME SCREEN start here---------->
const windowWidth = Dimensions.get("window").width;
const Drawer = createDrawerNavigator();
const HomeScreen = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				{/* <=============Drawer===============> */}

				<Drawer.Navigator
					screenOptions={{
						drawerStyle: {
							backgroundColor: "#0D1724",
							width: windowWidth * 0.8,
						},
						overlayColor: "rgba(0, 0, 0, 0.7)",
						drawerItemStyle: {
							marginHorizontal: 12,
						},
					}}
					drawerContent={props => <CustomDrawerContent {...props} />}>
					{/* <------DRAWER SCREENS START HERE--------> */}
					{/* <=============DIVISION===============> */}
					<Drawer.Screen
						name="Map"
						component={MapViewer}
						options={{
							drawerLabel: () => (
								<View
									style={{
										height: 30,
										alignSelf: "flex-end",
									}}>
									<ChevronLeft
										size={28}
										color="white"
										style={{
											position: "absolute",
											left: 20,
										}}
									/>
								</View>
							),
							headerShown: false,
							drawerActiveTintColor: "#0D1724",
						}}
					/>

					{/* <=============မင်္ဂလာပါ!===============> */}
					<Drawer.Screen
						name="Hello"
						component={Hello}
						options={{
							headerShown: false,
							drawerLabel: ({ focused, onPress }) => (
								<TouchableWithoutFeedback
									onPress={focused ? null : onPress}>
									<View style={{}}>
										<Text
											style={{
												color: "white",
												fontSize: 18,
												fontWeight: "bold",
											}}>
											မင်္ဂလာပါ!
										</Text>
									</View>
								</TouchableWithoutFeedback>
							),
						}}
					/>

					{/* <=============DIVISION===============> */}
					<Drawer.Screen
						name="Test1"
						component={Test1}
						options={{
							headerShown: false,
							drawerLabel: () => (
								<View style={{ flex: 1, flexDirection: "row" }}>
									<MapPin
										name="user"
										size={24}
										color="#fff"
									/>
									<DrawerLabelText title="အားသွင်းတိုင်များရှာဖွေခြင်း" />
								</View>
							),
						}}
					/>
					{/* <=============DIVISION===============> */}
					<Drawer.Screen
						name="Test2"
						component={Test2}
						options={{
							headerShown: false,
							drawerLabel: () => (
								<View style={{ flex: 1, flexDirection: "row" }}>
									<Car size={24} color="#fff" />
									<DrawerLabelText title="ကားအငှား၀န်ဆောင်မှု" />
								</View>
							),
						}}
					/>
					{/* <=============DIVISION===============> */}
					<Drawer.Screen
						name="Test3"
						component={Test3}
						options={{
							headerShown: false,
							drawerLabel: () => (
								<View style={{ flex: 1, flexDirection: "row" }}>
									<User size={24} color="#fff" />
									<DrawerLabelText title="ကိုယ်ပိုင်အချက်အလက်" />
								</View>
							),
						}}
					/>
					{/* <=============DIVISION===============> */}
					<Drawer.Screen
						name="Test4"
						component={Test4}
						options={{
							headerShown: false,
							drawerLabel: () => (
								<View style={{ flex: 1, flexDirection: "row" }}>
									<Settings size={24} color="#fff" />
									<DrawerLabelText title="ပြင်ဆင်ရန်" />
								</View>
							),
						}}
					/>
					{/* <=============DIVISION===============> */}
					<Drawer.Screen
						name="Test5"
						component={Test5}
						options={{
							headerShown: false,
							drawerLabel: () => (
								<View style={{ flex: 1, flexDirection: "row" }}>
									<History size={24} color="#fff" />
									<DrawerLabelText title="မှတ်တမ်းများ" />
								</View>
							),
						}}
					/>
					{/* <=============DIVISION===============> */}
					<Drawer.Screen
						name="Test6"
						component={Test6}
						options={{
							headerShown: false,
							drawerLabel: () => (
								<View style={{ flex: 1, flexDirection: "row" }}>
									<Bell size={24} color="#fff" />
									<DrawerLabelText title="အသိပေးချက်များ" />
								</View>
							),
						}}
					/>
					{/* <=============DIVISION===============> */}
				</Drawer.Navigator>
			</View>
		</GestureHandlerRootView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	buttonVertical: {
		position: "absolute",
		bottom: 90,
		right: 10,
	},
	icon1: {
		width: 40,
		height: 40,
		backgroundColor: "#514BC3",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50,
	},
	modalFooter: {
		width: 400,
		height: 90,
		backgroundColor: "red",
		position: "absolute",
		bottom: 0,
		right: 0,
		alignItems: "center",
		zIndex: 9999,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 15,
		backgroundColor: "pink",
		borderRadius: 20,
		width: "80%",
	},
	input: {
		flex: 1,
		marginLeft: 10,
		color: "white",
	},
	icon: {
		marginLeft: 10,
	},
});
