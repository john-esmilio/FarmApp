import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, Entypo } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Textarea from "react-native-textarea/src/Textarea";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import moment from "moment";
const UpdateHerd = ({ navigation, route }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const images = [
    require("../assets/img/cow1.jpg"),
    require("../assets/img/cow2.jpg"),
    require("../assets/img/cow3.jpg"),
    require("../assets/img/cow4.jpg"),
  ];
  const data = route.params.herdData ?? {};
  const [randomImage, setRandomImage] = useState(null);
  const [herdName, setHerdName] = useState("");
  const [landOwner, setLandOwner] = useState("");
  const [paddockNumber, setPaddockNumber] = useState("");
  // const [paddockNumber, setPaddockNumber] = useState(data.paddockNumber ?? "");
  // use the above example to set the paddock number to replace the placeholder
  const [cattleClass, setCattleClass] = useState(null);
  const [headSize, setHeadSize] = useState("");
  const [herdStatus, setHerdStatus] = useState("");
  const [auValue, setAuValue] = useState("");
  const [comments, setComments] = useState("");
  const [dateEntered, setDateEntered] = useState(new Date());
  const [exitDate, setExitDate] = useState(new Date());
  const [openDateEntered, setOpenDateEntered] = useState(false);

  const [openExitDate, setOpenExitDate] = useState(false);
  const [herdNameError, setHerdNameError] = useState("");
  const [landOwnerError, setLandOwnerError] = useState("");
  const [paddockNumberError, setPaddockNumberError] = useState("");
  const [cattleClassError, setCattleClassError] = useState("");
  const [headSizeError, setHeadSizeError] = useState("");
  const [auValueError, setAuValueError] = useState("");
  const [dateEnteredError, setDateEnteredError] = useState("");
  const [exitDateError, setExitDateError] = useState("");
  const momentDateEntered = moment(dateEntered);
  const momentExitDate = moment(exitDate);

  const differenceInDays = momentExitDate
    .diff(momentDateEntered, "days", true)
    .toFixed(2);
  const formattedDateEntered = moment(dateEntered).format(
    "MMMM Do YYYY, h:mm:ss a"
  );
  const formattedExitDate = moment(exitDate).format("MMMM Do YYYY, h:mm:ss a");

  const validateHerdName = () => {
    const isValid = herdName.trim() !== "";
    setHerdNameError(isValid ? "" : "Herd Name cannot be empty");
    return isValid;
  };

  const validateLandOwner = () => {
    const isValid = landOwner.trim() !== "";
    setLandOwnerError(isValid ? "" : "Land Owner cannot be empty");
    return isValid;
  };

  const validatePaddockNumber = () => {
    const isValid = paddockNumber.trim() !== "";
    setPaddockNumberError(isValid ? "" : "Paddock Number needed");
    return isValid;
  };

  const validateCattleClass = () => {
    const isValid = cattleClass;
    setCattleClassError(isValid ? "" : "Cattle Class needed");
    return isValid;
  };

  const validateHeadSize = () => {
    const isValid = headSize.trim() !== "";
    setHeadSizeError(isValid ? "" : "Head Size cannot be empty");
    return isValid;
  };
  const validateAuValue = () => {
    const isValid = auValue.trim() !== "";
    setAuValueError(isValid ? "" : "AU Value cannot be empty");
    return isValid;
  };
  const validateHerdStatus = () => {
    const isValid = herdStatus.trim() == "";
    return isValid;
  };

  const validateComments = () => {
    const isValid = comments.trim() !== "";
    return isValid;
  };

  const validateDateEntered = () => {
    const isValid = dateEntered instanceof Date && !isNaN(dateEntered);
    setDateEnteredError(isValid ? "" : "Date Entered is not valid");
    return isValid;
  };

  const validateExitDate = () => {
    const isValid = exitDate instanceof Date && !isNaN(exitDate);
    setExitDateError(isValid ? "" : "Exit Date is not valid");
    return isValid;
  };

  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handleSave = async () => {
    const isHerdNameValid = validateHerdName(herdName);
    const isLandOwnerValid = validateLandOwner(landOwner);
    const isPaddockNumberValid = validatePaddockNumber(paddockNumber);
    const isCattleClassValid = validateCattleClass(cattleClass);
    const isHeadSizeValid = validateHeadSize(headSize);
    const isAuValueValid = validateAuValue(auValue);
    const isDateEnteredValid = validateDateEntered(dateEntered);
    const isExitDateValid = validateExitDate(exitDate);

    /**
     * if (validationsAreSuccessful) {
     * add existing code below
     * }
     * This will allow the user to change the herd name, so a herdID is needed
     * in the backend.
     */
    if (
      isHerdNameValid &&
      isLandOwnerValid &&
      isPaddockNumberValid &&
      isCattleClassValid &&
      isHeadSizeValid &&
      isAuValueValid &&
      isDateEnteredValid &&
      isExitDateValid
    ) {
      try {
        let herds = await AsyncStorage.getItem("herds");
        herds = herds ? JSON.parse(herds) : [];
        const index = herds.findIndex((h) => h.paddockNumber === paddockNumber);

        // Ensure the herd was found before attempting to update
        if (index !== -1 && herds[index] !== undefined) {
          // Update herd details
          herds[index] = {
            ...herds[index],
            herdName,
            landOwner,
            paddockNumber,
            cattleClass,
            headSize,
            auValue,
            herdStatus,
            comments,
            dateEntered: formattedDateEntered,
            exitDate: formattedExitDate,
            differenceInDays,
            imageUrl: getRandomImageUrl(),
          };

          // Save the updated herds array back to AsyncStorage
          await AsyncStorage.setItem("herds", JSON.stringify(herds));
          Alert.alert("Success", "Herd updated successfully.", [
            { text: "OK", onPress: () => navigation.navigate("Herd") },
          ]);
        } else {
          // If the index is -1 or the item is undefined, show an error
          Alert.alert(
            "Error",
            "Herd not found, enter the correct paddock number."
          );
        }
      } catch (error) {
        console.error("Failed to update herd:", error);
        Alert.alert("Error", "Failed to update herd.");
      }
    } else {
      // Handle validation error
      Alert.alert("Validation Error", "Please check the input fields.");
    }
  };

  useEffect(() => {
    // Generate a random index to select a random image
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []); // Run this effect only once when the component mounts

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <MaterialIcons name="arrow-back" size={35} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Update Herd</Text>
        </View>

        <View
          style={{ width: "97%", height: 280, alignSelf: "center", top: 15 }}
        >
          {randomImage && (
            <Image
              source={randomImage}
              resizeMode="stretch"
              style={{ width: "100%", height: 250, borderRadius: 10 }}
            />
          )}
        </View>
        <View style={styles.editingContainer}>
          <Text style={styles.editingTitle}>
            Currently Editing Herd #{data.paddockNumber}
          </Text>
        </View>
        <View
          style={{
            width: "97%",
            alignSelf: "center",
            top: 8,
          }}
        >
          <TextInput
            placeholder="Enter Herd Name"
            value={herdName}
            onChangeText={setHerdName}
            onBlur={validateHerdName}
            style={{
              height: 50,
              fontFamily: "JosefinSans-Medium",
              fontSize: 17,
              borderWidth: 0.6,
              borderRadius: 10,
              paddingLeft: 10,
              backgroundColor: "#ffff",
              marginBottom: 10,
            }}
          />
          {herdNameError !== "" && (
            <Text style={styles.errorText}>{herdNameError}</Text>
          )}
        </View>
        <View
          style={{
            width: "97%",
            alignSelf: "center",
            top: 8,
          }}
        >
          <TextInput
            placeholder="Enter Land Owner"
            value={landOwner}
            onChangeText={(text) => setLandOwner(text)}
            onBlur={validateLandOwner}
            style={{
              height: 50,
              fontFamily: "JosefinSans-Medium",
              fontSize: 17,
              borderWidth: 0.6,
              borderRadius: 10,
              paddingLeft: 10,
              backgroundColor: "#ffff",
              marginBottom: 10,
            }}
          />
          {landOwnerError !== "" && (
            <Text style={styles.errorText}>{landOwnerError}</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            marginBottom: 10,
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              width: "49%",
              height: 50,
              borderRadius: 10,
              borderWidth: 0.6,
              backgroundColor: "#ffff",
              marginRight: 4,
            }}
          >
            <TextInput
              placeholder="Paddock Number"
              value={paddockNumber}
              onChangeText={(text) => setPaddockNumber(text)}
              onBlur={validatePaddockNumber}
              style={{
                width: "100%",
                height: 50,
                fontFamily: "JosefinSans-Medium",
                fontSize: 17,
                borderRadius: 10,
                paddingLeft: 10,
              }}
            />
            {paddockNumberError !== "" && (
              <Text style={styles.errorText}>{paddockNumberError}</Text>
            )}
          </View>

          <View
            style={{
              width: "49%",
              height: 50,
              borderWidth: 0.6,
              borderRadius: 10,
              backgroundColor: "#ffff",
              marginLeft: 4,
              fontFamily: "JosefinSans-Medium",
            }}
          >
            <Picker
              selectedValue={cattleClass}
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue === "placeholder") {
                  Alert.alert(
                    "Validation Error",
                    "Please select a valid cattle class."
                  );
                } else {
                  setCattleClass(itemValue);
                  setCattleClassError("");
                }
              }}
            >
              <Picker.Item label="Cattle Class" value="placeholder" />
              <Picker.Item label="Cow" value="Cow" />
              <Picker.Item label="Bull" value="Bull" />
              <Picker.Item label="Yearling" value="Yearling" />
            </Picker>
            {cattleClassError !== "" && (
              <Text style={styles.pickerErrorText}>{cattleClassError}</Text>
            )}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 10,
            width: "100%",
            alignSelf: "center",
            paddingHorizontal: 5,
          }}
        >
          <View style={{ width: "49%" }}>
            <TextInput
              placeholder="Head Size"
              value={headSize}
              onChangeText={(text) => setHeadSize(text)}
              onBlur={validateHeadSize}
              style={{
                width: "100%",
                height: 50,
                fontFamily: "JosefinSans-Medium",
                fontSize: 17,
                borderWidth: 0.6,
                borderRadius: 10,
                paddingLeft: 10,
                marginRight: 4,
                backgroundColor: "#ffff",
              }}
            />
            {headSizeError !== "" && (
              <Text style={styles.errorText}>{headSizeError}</Text>
            )}
          </View>

          <View style={{ width: "48%" }}>
            <TextInput
              placeholder="AU Value"
              value={auValue}
              onChangeText={(text) => setAuValue(text)}
              onBlur={validateAuValue}
              style={{
                width: "100%",
                height: 50,
                fontFamily: "JosefinSans-Medium",
                fontSize: 17,
                borderWidth: 0.6,
                borderRadius: 10,
                paddingLeft: 10,
                backgroundColor: "#ffff",
              }}
            />
            {auValueError !== "" && (
              <Text style={styles.errorText}>{auValueError}</Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
            width: "100%",
            alignSelf: "center",
            marginTop: 10,
            paddingHorizontal: 5,
          }}
        >
          <TextInput
            placeholder="Status"
            value={herdStatus}
            onChangeText={(text) => setHerdStatus(text)}
            onBlur={validateHerdStatus}
            style={{
              width: "100%",
              height: 50,
              fontFamily: "JosefinSans-Medium",
              fontSize: 17,
              borderWidth: 0.6,
              borderRadius: 10,
              paddingLeft: 10,
              backgroundColor: "#ffff",
            }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
            width: "100%",
            alignSelf: "center",
            paddingHorizontal: 5,
          }}
        >
          <Textarea
            placeholder="Comments"
            value={comments}
            onChangeText={(text) => setComments(text)}
            onBlur={validateComments}
            style={{
              width: "100%",
              height: 150,
              fontFamily: "JosefinSans-Medium",
              fontSize: 17,
              borderWidth: 0.6,
              borderRadius: 10,
              paddingLeft: 10,
              backgroundColor: "#ffff",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            alignSelf: "center",
            paddingHorizontal: 5,
          }}
        >
          <View
            style={{
              width: "49%",
              height: 85,
              borderRadius: 10,
              backgroundColor: "#ffff",
              marginRight: 4,
              borderWidth: 0.6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => setOpenDateEntered(true)}>
              <Text>Date Entered</Text>
              <Text
                style={{
                  width: "100%",
                  color: "#000000",
                  fontSize: 17,
                  fontFamily: "JosefinSans-Medium",
                }}
              >
                {dateEntered ? dateEntered.toDateString() : "Select Enter Date"}
              </Text>
              {dateEntered && (
                <Text
                  style={{
                    width: "100%",
                    color: "#000000",
                    fontSize: 15,
                    fontFamily: "JosefinSans-Medium",
                  }}
                >
                  Time:
                  {` ${dateEntered.getHours()}:${
                    dateEntered.getMinutes() < 10 ? "0" : ""
                  }${dateEntered.getMinutes()}`}
                </Text>
              )}
            </TouchableOpacity>

            {openDateEntered && (
              <DatePicker
                modal
                open={openDateEntered}
                date={dateEntered}
                onConfirm={(dateEntered) => {
                  setOpenDateEntered(false);
                  setDateEntered(dateEntered);
                }}
                onCancel={() => {
                  setOpenDateEntered(false);
                }}
              />
            )}

            {dateEnteredError !== "" && (
              <Text style={styles.errorText}>{dateEnteredError}</Text>
            )}
          </View>
          <View
            style={{
              width: "49%",
              height: 85,
              borderRadius: 10,
              backgroundColor: "#ffff",
              marginRight: 4,
              borderWidth: 0.6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => setOpenExitDate(true)}>
              <Text>Exit Date</Text>
              <Text
                style={{
                  width: "100%",
                  color: "#000000",
                  fontSize: 17,
                  fontFamily: "JosefinSans-Medium",
                }}
              >
                {exitDate ? exitDate.toDateString() : "Select Exit Date"}
              </Text>
              {exitDate && (
                <Text
                  style={{
                    width: "100%",
                    color: "#000000",
                    fontSize: 15,
                    fontFamily: "JosefinSans-Medium",
                  }}
                >
                  Time:
                  {` ${exitDate.getHours()}:${
                    exitDate.getMinutes() < 10 ? "0" : ""
                  }${exitDate.getMinutes()}`}
                </Text>
              )}
            </TouchableOpacity>

            {openExitDate && (
              <DatePicker
                modal
                open={openExitDate}
                date={exitDate}
                onConfirm={(exitDate) => {
                  setOpenExitDate(false);
                  setExitDate(exitDate);
                }}
                onCancel={() => {
                  openExitDate(false);
                }}
              />
            )}

            {exitDateError !== "" && (
              <Text style={styles.errorText}>{exitDateError}</Text>
            )}
          </View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 5 }}>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: "#007000",
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSave}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "JosefinSans-Bold",
                color: "#ffffff",
              }}
            >
              Update Herd
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
// };
export default UpdateHerd;

const styles = StyleSheet.create({
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
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
    paddingLeft: 10,
    fontFamily: "JosefinSans-SemiBoldItalic",
  },
  pickerErrorText: {
    color: "red",
    fontSize: 12,
    marginTop: -2,
    paddingLeft: 10,
    fontFamily: "JosefinSans-SemiBoldItalic",
  },
  editingContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  editingTitle: {
    fontSize: 18,
    fontFamily: "JosefinSans-BoldItalic",
  },
});
