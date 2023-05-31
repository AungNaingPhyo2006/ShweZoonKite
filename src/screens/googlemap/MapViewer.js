import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	PermissionsAndroid,
	Alert,
	ScrollView,
	Image,
	ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import React, { useState, useEffect, useRef, useMemo } from "react";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import NetInfo from "@react-native-community/netinfo";
import {
	AlignCenter,
	Crosshair,
	Filter,
	History,
	Info,
	ListStartIcon,
	Search,
	Store,
} from "lucide-react-native";
import BottomSheet, {
	BottomSheetFlatList,
	BottomSheetScrollView,
	BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import InfoModal from "./InfoModal";
import { LocateIcon } from "lucide-react-native";
import FilterModal from "./FilterModal";
// import Geolocation from "@react-native-community/geolocation";
import GeoLocation from "react-native-geolocation-service";
import Car from "../../assets/images/CarIcon.png";
import UserMarker from "./UserMarker";
import StationMarker from "./StationMarker";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
//  <=============Data===============>
import stationPlaces from "./PlaceData";
import * as geolib from "geolib";
import NearestMarker from "./NearestMarker";
const data = [
	{
		id: 1,
		station: "Alpha Alliance EV Charger",
		address: "No.203, Yangon International Airport",
		distance: "13 miles",
		status: "24 hours open",
		closedTime: "",
		power: "50KV",
		location: "တည်နေရာရယူမည်",
	},
	{
		id: 2,
		station: "ACE Motor",
		address: "Myanmar Plaza",
		distance: "16 miles",
		status: "opening",
		closedTime: "20:00",
		power: "50KV",
		location: "တည်နေရာရယူမည်",
	},
	{
		id: 3,
		station: "ChargeLab",
		address: "Junction Square, Hledan",
		distance: "16 miles",
		status: "opening",
		closedTime: "20:00",
		power: "50KV",
		location: "တည်နေရာရယူမည်",
	},
	{
		id: 4,
		station: "ECharge",
		address: "Pansodan ",
		distance: "16 miles",
		status: "opening",
		closedTime: "20:00",
		power: "50KV",
		location: "တည်နေရာရယူမည်",
	},
	{
		id: 5,
		station: "EVCS",
		address: "Inya",
		distance: "16 miles",
		status: "opening",
		closedTime: "20:00",
		power: "50KV",
		location: "တည်နေရာရယူမည်",
	},
	{
		id: 6,
		station: "Tesla",
		address: "City Mall St.John",
		distance: "16 miles",
		status: "opening",
		closedTime: "20:00",
		power: "50KV",
		location: "တည်နေရာရယူမည်",
	},
];
const ListItem = ({ station, address, distance, status, power, location }) => {
	const { colors } = useTheme();

	// console.log("Test location---->", location);
	return (
		<ScrollView
			style={{
				paddingVertical: 12,
				// backgroundColor: "blue",
				// paddingHorizontal: 12,
			}}>
			<View style={{ paddingHorizontal: 5, paddingVertical: 9 }}>
				<View
					style={{
						flexDirection: "row",
					}}>
					<View
						style={{
							width: 50,
							height: 50,
							backgroundColor: "#32C760",
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 50,
						}}>
						<Store size={24} color="white" />
					</View>
					<View style={{ marginHorizontal: 12 }}>
						<Text style={{ color: colors.title }}>{station}</Text>
						<Text style={{ color: colors.subTitle }}>
							{address}
						</Text>
						<Text style={{ color: colors.subTitle }}>
							{distance}
						</Text>
						<Text style={{ color: colors.warning }}>{status}</Text>
						{/* <==========Buttons==========> */}
						<View
							style={{
								flexDirection: "row",
								marginVertical: 5,
							}}>
							<View
								style={{
									...styles.closetButton,
									backgroundColor: colors.button,
								}}>
								<Text style={{ color: "white", padding: 5 }}>
									{power}
								</Text>
							</View>
							<View style={{ width: "3%" }}></View>
							<TouchableOpacity
								style={{
									...styles.closetButton,
									backgroundColor: "#32C760",
								}}
								onPress={() => {
									Alert.alert("", "Hi, What are you doing?");
								}}>
								<Text style={{ color: "white" }}>
									{location}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
			<View
				style={{
					flex: 1,
					backgroundColor: "#000",
					height: 1,
					marginTop: 9,
				}}></View>
		</ScrollView>
	);
};

// Render each item in the list
const renderItem = ({ item }) => {
	return (
		<ListItem
			station={item.station}
			address={item.address}
			distance={item.distance}
			status={item.status}
			power={item.power}
			location={item.location}
		/>
	);
};
//  <=============MAIN COMPONENT===============>
const MapViewer = ({ navigation }) => {
	const [defaultLocation, setDefaultLocation] = useState({
		latitude: 16.798307,
		longitude: 96.149612,
	});
	const [currentLocation, setCurrentLocation] = useState(null);
	const [mapRegion, setMapRegion] = useState(null);
	const [isInfoModal, setIsInfoModal] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);

	// <=========Loading==========>
	const [mapLoading, setMapLoading] = useState(true);
	const handleMapLayout = () => {
		setMapLoading(false);
	};
	// <=========Check internet connection==========>
	const checkInternetConnection = () => {
		NetInfo.fetch().then(state => {
			if (state.isConnected === false) {
				Alert.alert(
					"No Internet Connection",
					"Please check your internet connection."
				);
			}
		});
	};

	useEffect(() => {
		checkInternetConnection();
	}, []);

	// <=========Zoom Level Customization==========>
	const [zoomLevel, setZoomLevel] = useState(0);
	const [markersVisible, setMarkersVisible] = useState(true);

	const handleRegionChange = region => {
		// Update the zoom level based on the region's latitudeDelta
		setZoomLevel(region.latitudeDelta);

		// Toggle marker visibility based on the zoom level
		if (region.latitudeDelta < 0.43 && !markersVisible) {
			setMarkersVisible(true);
		} else if (region.latitudeDelta >= 0.43 && markersVisible) {
			setMarkersVisible(false);
		}
	};

	// <=============Rendering Markers===============>
	const renderMarkers = () => {
		if (!markersVisible) {
			return null;
		}

		return (
			<>
				{/* <======= Render markers======> */}
				{/* <=========Current Device Location=========> */}
				<UserMarker currentLocation={currentLocation} />

				{/* <=======Stations========>*/}
				{stationPlaces.map(place => {
					if (
						currentLocation.latitude !== undefined &&
						currentLocation.longitude !== undefined &&
						place.latitude !== undefined &&
						place.longitude !== undefined
					) {
						// Calculate distance using geolib.getDistance method
						const distanceInMeters = geolib.getDistance(
							{
								latitude: currentLocation.latitude,
								longitude: currentLocation.longitude,
							},
							{
								latitude: place.latitude,
								longitude: place.longitude,
							}
						);

						// Convert distance to miles
						const distanceInMiles =
							(distanceInMeters / 1000) * 0.621371;
						//<========duration=========>
						const averageSpeedInMph = 10;
						const durationHours =
							distanceInMiles / averageSpeedInMph;
						const durationMinutes = durationHours * 60;
						const hours = Math.floor(durationMinutes / 60);
						const minutes = Math.round(durationMinutes % 60);

						//<=============>
						return (
							<StationMarker
								key={place.name}
								title={place.name}
								description={`${
									place.description
								} \n ${distanceInMiles.toFixed(
									2
								)} miles \n ${hours}:${minutes}mins`}
								location={{
									latitude: place.latitude,
									longitude: place.longitude,
								}}
							/>
						);
					}
					return null;
				})}

				{/* <==========find nearest===========> */}

				{currentLocation.latitude &&
					currentLocation.longitude &&
					stationPlaces.length > 0 && (
						<NearestMarker
							key="nearestPlace"
							title="NEAREST PLACE"
							description="Nearest place to your location"
							location={geolib.findNearest(
								{
									latitude: currentLocation.latitude,
									longitude: currentLocation.longitude,
								},
								stationPlaces.map(place => ({
									latitude: place.latitude,
									longitude: place.longitude,
								}))
							)}
						/>
					)}
				{/* <==========find nearest end===========> */}
			</>
		);
	};

	// <=============Bottom Sheet start===============>
	const bottomSheetRef = useRef();
	const snapPoints = useMemo(() => ["10%", "70%"], []);

	// <===========Searching===========>
	const [filteredData, setFilteredData] = useState(data);
	const [searchQuery, setSearchQuery] = useState("");

	const filterData = query => {
		const filtered = data.filter(item => {
			return (
				item.station.toLowerCase().includes(query.toLowerCase()) ||
				item.address.toLowerCase().includes(query.toLowerCase())
			);
		});
		setFilteredData(filtered);
	};
	// <===========searching end===========>

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};
	const InfoModalOpen = () => {
		setIsInfoModal(!isInfoModal);
	};
	// <==========navigate to current location=============>
	const mapRef = useRef(null);
	const handleCurrentLocation = () => {
		mapRef.current.animateToRegion(mapRegion, 1000);
	};

	//  <=============Map location search Method===============>
	useEffect(() => {
		console.log("current location====>", currentLocation);
		const requestLocationPermission = async () => {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
					{
						title: "Location Permission Required",
						message: "This app needs to access your location",
						buttonNeutral: "Ask Me Later",
						buttonNegative: "Cancel",
						buttonPositive: "OK",
					}
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					GeoLocation.watchPosition(
						position => {
							const { latitude, longitude } = position.coords;
							setCurrentLocation({ latitude, longitude });
							// <===========Testing===========>
							setMapRegion(prevRegion => {
								if (!prevRegion) {
									return {
										latitude,
										longitude,
										latitudeDelta: 0.001,
										longitudeDelta: 0.001,
									};
								}
								return prevRegion;
							});
						},
						error => {
							console.log("watch position", error);
							Alert.alert("", error.message);
						},
						{
							enableHighAccuracy: true,
							showLocationDialog: true,
							timeout: 50000,
							maximumAge: 0,
							distanceFilter: 0,
						}
					);
				} else {
					console.log("Location permission denied");
				}
			} catch (err) {
				console.log(err);
			}
		};
		requestLocationPermission();
	}, []);

	//  <=============Main Component Return Here===============>
	return (
		<View style={{ flex: 1 }}>
			{/* <=============MAP VIEWS===============> */}
			{currentLocation && (
				<View style={{ flex: 1 }}>
					{mapLoading && (
						<ActivityIndicator
							style={styles.loadingStyle}
							size="large"
							color="blue"
						/>
					)}
					<MapView
						style={{ flex: 1 }}
						followsUserLocation={true}
						customMapStyle={mapStyle}
						region={mapRegion}
						ref={mapRef}
						onRegionChangeComplete={handleRegionChange}
						onLayout={handleMapLayout}>
						{renderMarkers()}
					</MapView>
				</View>
			)}

			{/* <===========Buttons at the Map============> */}
			<View
				style={{
					color: "#000",
					position: "absolute",
					top: 10,
					left: 10,
				}}>
				<TouchableOpacity
					onPress={() => navigation.openDrawer()}
					style={styles.icon1}>
					<AlignCenter color="white" size={24} />
				</TouchableOpacity>
			</View>
			{/* <===========Vertical button===========> */}
			<View style={styles.buttonVertical}>
				<TouchableOpacity
					onPress={InfoModalOpen}
					style={{ marginVertical: 8 }}>
					<View style={styles.icon1}>
						<Info color="white" size={24} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						Alert.alert("", "History");
					}}
					style={{ marginVertical: 8 }}>
					<View style={styles.icon1}>
						<History color="white" size={24} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						// Alert.alert("", "crosshairs");
						handleCurrentLocation();
					}}
					style={{ marginVertical: 8 }}>
					<View style={styles.icon1}>
						{/* <Crosshair color="white" size={24} /> */}
						<LocateIcon color="white" size={28} />
					</View>
				</TouchableOpacity>
			</View>

			{/* <===========Bottom Sheet===========> */}
			<BottomSheet
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				backgroundStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
				handleIndicatorStyle={{ backgroundColor: "#fff", width: 70 }}
				keyboardBlurBehavior="restore">
				<View style={{ flex: 1 }}>
					<View
						style={{
							// flex: 1,
							padding: 10,
							flexDirection: "row",
							paddingTop: 1,
						}}>
						{/* <=================INPUT CONTAINER=================> */}
						<View style={{ flex: 1, flexDirection: "row" }}>
							<BottomSheetTextInput
								style={{
									flex: 1,
									backgroundColor: "gray",
									height: 40,
									borderRadius: 15,
									paddingLeft: 40,
								}}
								placeholder="  Search"
								cursorColor={"yellow"}
								onChangeText={text => {
									setSearchQuery(text);
									filterData(text);
								}}
							/>

							<Search
								color="white"
								size={24}
								style={{
									position: "absolute",
									left: 10,
									top: 10,
								}}
							/>
						</View>
						<TouchableOpacity
							onPress={toggleModal}
							style={{
								backgroundColor: "white",
								marginLeft: 10,
								height: 35,
								width: 35,
								padding: 5,
								justifyContent: "center",
								alignItems: "center",
								borderRadius: 50,
							}}>
							<Filter color="#99d6ff" size={24} />
						</TouchableOpacity>
						{/* <=============INPUT CONTAINER END=============>*/}
					</View>
					{/* <=============BottomSheetFlatList=============>*/}
					<View style={{ marginHorizontal: 12, marginVertical: 5 }}>
						<Text style={{ color: "#fff", fontWeight: "bold" }}>
							Closest Charging Stations
						</Text>
					</View>

					<FlatList
						data={filteredData}
						keyExtractor={item => item.id}
						renderItem={renderItem}
						contentContainerStyle={styles.contentContainer}
					/>
				</View>
			</BottomSheet>
			{/* <===========InfoModal===========> */}
			{isInfoModal && (
				<InfoModal
					InfoModalOpen={InfoModalOpen}
					isInfoModal={isInfoModal}
					setIsInfoModal={setIsInfoModal}
				/>
			)}
			{/* <===========Filter Modal===========> */}

			<Modal
				isVisible={isModalVisible}
				coverScreen={true}
				animationIn={"slideInRight"}
				animationOut={"slideOutRight"}
				animationInTiming={600}
				animationOutTiming={600}
				style={{ margin: 0 }}>
				<View style={{ flex: 1, backgroundColor: "#001a33" }}>
					<FilterModal
						toggle={toggleModal}
						setModalVisible={setModalVisible}
					/>
				</View>
			</Modal>
			{/* <===========Filter Modal ===========> */}
		</View>
	);
};

export default MapViewer;

//  <=============Map styles ===============>
const mapStyle = [
	{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
	{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
	{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [{ color: "#263c3f" }],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [{ color: "#6b9a76" }],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [{ color: "#38414e" }],
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [{ color: "#212a37" }],
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9ca5b3" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [{ color: "#746855" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [{ color: "#1f2835" }],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [{ color: "#f3d19c" }],
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [{ color: "#2f3948" }],
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [{ color: "#17263c" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{ color: "#515c6d" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.stroke",
		stylers: [{ color: "#17263c" }],
	},
];

const styles = StyleSheet.create({
	contentContainer: {
		// flex: 1,
		marginHorizontal: 15,
		backgroundColor: "#36373B",
		// borderTopRightRadius: 20,
		// borderTopLeftRadius: 20,
		borderRadius: 20,
	},
	buttonVertical: {
		position: "absolute",
		bottom: 90,
		right: 10,
		zIndex: 0,
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
	closetButton: {
		// backgroundColor: "#514bc3",
		borderRadius: 9,
		paddingHorizontal: 20,
		justifyContent: "center",
	},
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
	loadingStyle: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
});
