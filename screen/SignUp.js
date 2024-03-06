import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Alert } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

const SignUp = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSignUp = () => {
    // Reset error messages
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate First Name
    if (!firstName || !firstName.trim()) {
      setFirstNameError("First Name cannot be empty");
    }

    // Validate Last Name
    if (!lastName || !lastName.trim()) {
      setLastNameError("Last Name cannot be empty");
    }

    // Validate email
    if (!email || !email.trim()) {
      setEmailError("Email cannot be empty");
    }

    // Validate password
    if (!password || !password.trim()) {
      setPasswordError("Password cannot be empty");
    }

    // Validate confirm password
    if (!confirmPassword || !confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password cannot be empty");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }

    // If any field has an error, return without attempting signup
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }

    // Add signup logic here
    // Moves to login screen after successful signup
    navigation.navigate("Login");
    Alert.alert("User Registered Successfully", "Please Login to continue", [
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <MaterialIcons name="arrow-back" size={35} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/img/logos.png")}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.signUpText}>Sign Up</Text>
        <TextInput
          placeholder="First name"
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          onBlur={() =>
            setFirstNameError(
              !firstName.trim() ? "First Name cannot be empty" : ""
            )
          }
        />
        {firstNameError !== "" && (
          <Text style={styles.errorText}>{firstNameError}</Text>
        )}

        <TextInput
          placeholder="Last name"
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          onBlur={() =>
            setLastNameError(
              !lastName.trim() ? "Last Name cannot be empty" : ""
            )
          }
        />
        {lastNameError !== "" && (
          <Text style={styles.errorText}>{lastNameError}</Text>
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

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          onBlur={() =>
            setPasswordError(!password.trim() ? "Password cannot be empty" : "")
          }
        />
        {passwordError !== "" && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        {/* Toggle button to show/hide password */}
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.showPasswordButton}
        >
          <Text style={styles.showPasswordButtonText}>
            {showPassword ? "Hide " : "Show "}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showConfirmPassword}
          onBlur={() =>
            setConfirmPasswordError(
              !confirmPassword.trim()
                ? "Confirm Password cannot be empty"
                : confirmPassword !== password
                ? "Passwords do not match"
                : ""
            )
          }
        />
        <TouchableOpacity
          style={styles.showPasswordButton}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Text style={styles.showPasswordButtonText}>
            {showConfirmPassword ? "Hide" : "Show"}
          </Text>
        </TouchableOpacity>
        {confirmPasswordError !== "" && (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        )}

        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    // marginTop: 2,
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
    marginLeft: 15,
    top: 30,
  },
});
