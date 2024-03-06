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

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    // Reset error messages
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email || !email.trim()) {
      setEmailError("Email cannot be empty");
    }

    // Validate password
    if (!password || !password.trim()) {
      setPasswordError("Password cannot be empty");
    }

    // If either field is empty, return without attempting login
    if (emailError || passwordError) {
      return;
    }
    navigation.navigate("HomeTabs");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/img/logo.png")}
            resizeMode="stretch"
            style={styles.logoImage}
          />
        </View>
        {/* <Text style={styles.welcomeText}>Welcome</Text> */}

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
          secureTextEntry
          onBlur={() =>
            setPasswordError(!password.trim() ? "Password cannot be empty" : "")
          }
        />
        {passwordError !== "" && (
          <Text style={styles.errorText}>{passwordError}</Text>
        )}

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signUpText}>
          Need an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            Sign Up Here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

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
  logoContainer: {
    width: "95%",
    height: 190,
    paddingTop: 40,
    // backgroundColor: 'rgb(164, 164, 164,5)',
    alignSelf: "center",
    borderRadius: 10,
    // borderWidth: 1.5,
  },
  logoImage: {
    width: "90%",
    alignSelf: "center",
    height: 100,
  },
  welcomeText: {
    fontFamily: "JosefinSans-Bold",
    fontSize: 50,
    color: "white",
    alignSelf: "center",
    top: "2%",
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
  forgotPasswordButton: {
    marginTop: "2%",
    alignSelf: "flex-end",
    right: "5%",
  },
  forgotPasswordText: {
    fontFamily: "JosefinSans-MediumItalic",
    fontSize: 16,
    color: "black",
  },
  loginButton: {
    width: "95%",
    height: 50,
    backgroundColor: "#C2ADFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1.5,
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: "JosefinSans-Bold",
  },
  signUpText: {
    fontFamily: "JosefinSans-MediumItalic",
    fontSize: 16,
    color: "black",
    width: "90%",
    alignSelf: "center",
    marginTop: "3%",
  },
  signUpLink: {
    fontFamily: "JosefinSans-BoldItalic",
    color: "purple",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    fontSize: 15,
    marginTop: 5,
    paddingLeft: 10,
    fontFamily: "JosefinSans-Regular",
    alignSelf: "flex-start",
  },
});

export default Login;
