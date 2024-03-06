import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Alert } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

const ChangeUsername = ({ navigation, route }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const [newUserName, setNewUserName] = useState("");
  const [email, setEmail] = useState("");

  const [newUserNameError, setNewUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const changeName = () => {
    // Reset error messages
    setNewUserNameError("");
    setEmailError("");

    // Validate newUserName
    if (!newUserName || !newUserName.trim()) {
      setNewUserNameError("Username cannot be empty");
    }

    // Validate email
    if (!email || !email.trim()) {
      setEmailError("Email cannot be empty");
    }

    // If any field has an error, return without attempting signup
    if (emailError || newUserNameError) {
      return;
    }

    // Add username change logic here
    Alert.alert("Username changed successfully", "Navigating back to account", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.logoContainer}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <MaterialIcons name="arrow-back" size={35} />
        </TouchableOpacity>
        <Image
          source={require("../assets/img/logos.png")}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.signUpText}>Change Username</Text>
        <TextInput
          placeholder="New Username"
          style={styles.input}
          value={newUserName}
          onChangeText={(text) => setNewUserName(text)}
          onBlur={() =>
            setNewUserNameError(
              !newUserName.trim() ? "Username cannot be empty" : ""
            )
          }
        />
        {newUserNameError !== "" && (
          <Text style={styles.errorText}>{newUserNameError}</Text>
        )}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          onBlur={() =>
            setEmailError(!email.trim() ? "Email cannot be empty" : "")
          }
        />
        {emailError !== "" && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}
        <TouchableOpacity style={styles.loginButton} onPress={changeName}>
          <Text style={styles.loginButtonText}>Change Username</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  signUpText: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "JosefinSans-Regular",
    textAlign: "center",
  },
  input: {
    width: "95%",
    height: 50,
    alignSelf: "center",
    fontFamily: "JosefinSans-Medium",
    fontSize: 17,
    borderWidth: 0.6,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1.5,
    marginTop: "5%",
    backgroundColor: "#ffff",
  },
  loginButton: {
    width: "95%",
    height: 50,
    backgroundColor: "#007000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1.5,
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "JosefinSans-Bold",
  },
  errorText: {
    color: "red",
    fontSize: 15,
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "JosefinSans-Regular",
    alignSelf: "flex-start",
  },
  logoContainer: {
    width: "95%",
    // height: 190,
    paddingTop: 40,
    // backgroundColor: 'rgb(164, 164, 164,5)',
    alignSelf: "center",
    borderRadius: 10,
    // borderWidth: 1.5,
  },
  logoImage: {
    width: "100%",
    alignSelf: "center",
    height: 100,
  },
  showPasswordButton: {
    alignSelf: "flex-end",
    marginRight: "5%",
    marginTop: "2%",
  },
  showPasswordButtonText: {
    fontSize: 16,
    color: "black",
    fontFamily: "JosefinSans-MediumItalic",
  },
  showHideButton: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  backButton: {
    marginLeft: 10,
    top: 10,
  },
});
