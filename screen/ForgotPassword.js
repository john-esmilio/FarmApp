import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Form, TextValidator } from "react-native-validator-form";
import { MaterialIcons } from "react-native-vector-icons";

const { width, height } = Dimensions.get("window");

const ForgotPassword = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleResetPassword = () => {
    setEmailError("");

    if (!email || !email.trim()) {
      setEmailError("Email cannot be empty");
      return;
    }

    try {
      console.log("Password reset logic would be implemented here.");
      Alert.alert(
        "Password Reset",
        "A password reset email has been sent to your email address.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      setEmailError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/img/logos.png")}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={[styles.container, { width: width * 0.8 }]}>
        <Text style={styles.signUpText}>Forgot Password?</Text>
        <Form>
          <TextValidator
            style={styles.inputField}
            name="email"
            label="email"
            validators={["required", "isEmail"]}
            errorMessages={["This field is required"]}
            placeholder="Enter your email here"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {emailError !== "" && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </Form>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.loginButtonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  container: {
    alignItems: "center",
    marginHorizontal: "10%",
  },
  signUpText: {
    fontSize: 22,
    marginVertical: 10,
  },
  inputField: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
    color: "#000",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007000",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoImage: {
    width: width * 0.9,
    height: height * 0.2,
  },
  // backButton: {
  //   marginLeft: 15,
  //   position: "absolute",
  //   // top: 10,
  //   bottom: 100,
  // },
  headerContainer: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
});

export default ForgotPassword;
