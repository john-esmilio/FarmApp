import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ViewPaddock = ({ navigation, route }) => {
  const data = route.params;
  const [paddockData, setPaddockData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const imageUrl = data.imageUrl;
  const [isModalVisible, setModalVisible] = useState(false);
  const cattleClass = data.cattleClass;
  useEffect(() => {
    // Set alert message after the component has mounted
    setAlertMessage(JSON.stringify(data));
  }, [data]);

  const fetchPaddocks = async () => {
    try {
      const storedPaddocks = await AsyncStorage.getItem("paddocks");
      const paddocks = storedPaddocks ? JSON.parse(storedPaddocks) : [];
      setPaddockData(paddocks);
    } catch (error) {
      console.error("Failed to fetch paddocks:", error);
    }
  };

  useEffect(() => {
    fetchPaddocks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPaddocks();
    }, [])
  );

  const goBack = () => {
    navigation.goBack();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirm Deletion", // Alert Title
      "Are you sure you want to delete this paddock?", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deletePaddock(data.paddockName), // TODO change to paddockID or whatever is in database
          style: "destructive",
        },
      ],
      { cancelable: false } // Prevents dismissing by tapping outside of the alert box
    );

  const deletePaddock = async (paddockName) => {
    try {
      let storedPaddocks = await AsyncStorage.getItem("paddocks");
      let paddocks = storedPaddocks ? JSON.parse(storedPaddocks) : [];
      paddocks = paddocks.filter(
        (paddock) => paddock.paddockName !== paddockName
      );
      await AsyncStorage.setItem("paddocks", JSON.stringify(paddocks));
      navigation.goBack();
    } catch (error) {
      console.error("Failed to delete paddock:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <MaterialIcons name="arrow-back" size={35} />
          </TouchableOpacity>
          <Text style={styles.headerText}>View Paddock</Text>

          <TouchableOpacity
            style={{ position: "absolute", right: 10 }}
            onPress={toggleModal}
          >
            <Entypo name="dots-three-vertical" size={22} />
          </TouchableOpacity>
        </View>

        <View style={{ width: "97%", alignSelf: "center", top: 15 }}>
          <Image
            source={(uri = data.imageUrl)}
            resizeMode="stretch"
            style={{ width: "100%", height: 250, borderRadius: 10 }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.paddockInformationTitle}>
            Paddock Information
          </Text>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Paddock Name</Text>
              <Text style={styles.infoContent}>{data.paddockName}</Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Paddock Number</Text>
              <Text style={styles.infoContent}>{data.paddockNumber}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Size (Acres)</Text>
              <Text style={styles.infoContent}>{data.sizeAcres} Acres</Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Land Owner</Text>
              <Text style={styles.infoContent}>{data.landOwner}</Text>
            </View>
          </View>

          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Cost Type</Text>
              <Text style={styles.infoContent}>{data.costType}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Unit Cost</Text>
              <Text style={styles.infoContent}>{data.unitCost}</Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Crop Type</Text>
              <Text style={styles.infoContent}>{data.cropType}</Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Year Seeded</Text>
              <Text style={styles.infoContent}>
                {data.yearSeeded !== "" ? data.yearSeeded : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Year Renovated</Text>
              <Text style={styles.infoContent}>
                {data.yearRenovated !== "" ? data.yearRenovated : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Cattle Class</Text>
              <Text style={styles.infoContent}>{cattleClass}</Text>
            </View>
          </View>
        </View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          animationInTiming={500}
          animationOutTiming={500}
          style={{
            width: "100%",
            marginLeft: 0,
            marginBottom: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 10,
          }}
        >
          <View style={styles.modalContainer}>
            <View style={{ padding: 10, flex: 1 }}>
              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <FontAwesome name="edit" size={30} color="blue" />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("UpdatePaddock", {
                      paddockData: data,
                    });
                  }}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={{ fontFamily: "JosefinSans-Medium" }}>Edit</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                }}
              >
                <MaterialCommunityIcons
                  name="delete-empty"
                  size={30}
                  color="red"
                />
                <TouchableOpacity
                  onPress={createTwoButtonAlert}
                  style={{ marginLeft: 10 }}
                >
                  <Text style={{ fontFamily: "JosefinSans-Medium" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ViewPaddock;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  headerContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginLeft: 10,
  },
  headerText: {
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 22,
    marginLeft: 15,
  },
  // alertContainer: {
  //   backgroundColor: "#FFFF00", // Yellow background for alert
  //   padding: 10,
  //   marginTop: 10,
  // },
  // alertText: {
  //   fontFamily: "JosefinSans-Regular",
  //   fontSize: 16,
  //   color: "#000000", // Black text for alert
  // },
  modalContainer: {
    width: "100%",
    height: "50%", // Set height to 50% of the screen
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 20,
    color: "#333",
  },
  infoContent: {
    fontSize: 18,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  paddockInformationTitle: {
    fontSize: 26,
    textAlign: "center",
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    fontFamily: "JosefinSans-BoldItalic",
    marginBottom: 10,
  },
  textContainer: {
    marginTop: 10,
    padding: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },

  itemContainer: {
    flex: 1,
    marginRight: 10,
  },

  dateContainer: {
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
});
