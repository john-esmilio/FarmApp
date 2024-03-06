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

const ViewHerd = ({ navigation, route }) => {
  const data = route.params;
  const [herdData, setHerdData] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const imageUrl = data.imageUrl;
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Set alert message after the component has mounted
    setAlertMessage(JSON.stringify(data));
  }, [data]);

  const goBack = () => {
    navigation.goBack();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchHerds = async () => {
    try {
      const storedHerds = await AsyncStorage.getItem("herds");
      const herds = storedHerds ? JSON.parse(storedHerds) : [];
      setHerdData(herds);
    } catch (error) {
      console.error("Failed to fetch herds:", error);
    }
  };
  useEffect(() => {
    fetchHerds();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchHerds();
    }, [])
  );
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirm Deletion", // Alert Title
      "Are you sure you want to delete this herd?", // Alert Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteHerd(data.herdName), // TODO change to herdID or whatever is in database
          style: "destructive",
        },
      ],
      { cancelable: false } // Prevents dismissing by tapping outside of the alert box
    );

  const deleteHerd = async (herdName) => {
    try {
      let storedHerds = await AsyncStorage.getItem("herds");
      let herds = storedHerds ? JSON.parse(storedHerds) : [];
      herds = herds.filter((herd) => herd.herdName !== herdName);
      await AsyncStorage.setItem("herds", JSON.stringify(herds));
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
          <Text style={styles.headerText}>View Herd</Text>

          <TouchableOpacity
            style={{ position: "absolute", right: 10 }}
            onPress={toggleModal}
          >
            <Entypo name="dots-three-vertical" size={22} />
          </TouchableOpacity>
        </View>

        {/* Display alert message within the component */}
        <View style={{ width: "97%", alignSelf: "center", top: 15 }}>
          <Image
            source={(uri = data.imageUrl)}
            resizeMode="stretch"
            style={{ width: "100%", height: 250, borderRadius: 10 }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.herdInformationTitle}>Herd Information</Text>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Herd Name</Text>
              <Text style={styles.infoContent}>{data.herdName}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Land Owner</Text>
              <Text style={styles.infoContent}>{data.landOwner}</Text>
            </View>
          </View>

          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Paddock Number</Text>
              <Text style={styles.infoContent}>{data.paddockNumber}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Cattle Class</Text>
              <Text style={styles.infoContent}>{data.cattleClass}</Text>
            </View>
          </View>

          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Head Size</Text>
              <Text style={styles.infoContent}>{data.headSize}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>AU Value</Text>
              <Text style={styles.infoContent}>{data.auValue}</Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Status</Text>
              <Text style={styles.infoContent}>
                {data.herdStatus !== "" ? data.herdStatus : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Comments</Text>
              <Text style={styles.infoContent}>
                {data.comments !== "" ? data.comments : "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.infoTitle}>Date Entered</Text>
              <Text style={styles.infoContent}>{data.dateEntered}</Text>
            </View>

            <View>
              <Text style={styles.infoTitle}>Exit Date</Text>
              <Text style={styles.infoContent}>{data.exitDate}</Text>
            </View>
            <View>
              <Text style={styles.infoTitle}>Days Until Move</Text>
              <Text style={styles.infoContent}>{data.differenceInDays}</Text>
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
                    navigation.navigate("UpdateHerd", {
                      herdData: data,
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
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
  modalContainer: {
    width: "100%",
    height: "50%",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    color: "#333",
    fontFamily: "JosefinSans-BoldItalic",
  },
  infoContent: {
    fontSize: 18,
    color: "#666",
    fontFamily: "JosefinSans-Regular",
  },
  herdInformationTitle: {
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
    borderBottomWidth: 1,
    borderColor: "black",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
});

export default ViewHerd;
