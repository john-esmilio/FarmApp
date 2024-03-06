import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const Account = ({ navigation }) => {
  // const userName = route.params?.userName || "Default Name";
  const userName = userName || "Default Name";

  const createTwoButtonAlert = () =>
    Alert.alert("Logout", "Are you sure you want to logout? ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("Login") },
    ]);

  const settings = () => {
    navigation.navigate("Settings");
  };
  const changeUsername = () => {
    navigation.navigate("ChangeUsername");
  };

  const changePassword = () => {
    navigation.navigate("ChangePassword");
  };

  return (
    <ScrollView style={{ backgroundColor: "#ffffff" }}>
      <View
        style={{
          width: "95%",
          alignSelf: "center",
          flex: 1,
          marginTop: 50,
        }}
      >
        <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/img/user.png")}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderWidth: 0.5,
                borderRadius: 50,
                backgroundColor: "red",
                left: 5,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: "5%",
                fontFamily: "JosefinSans-Bold",
                fontSize: 18,
              }}
            >
              {userName}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={changeUsername}>
          <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                width: "100%",
                height: 50,
              }}
            >
              <Image
                source={require("../assets/img/account1.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 50,
                  left: 5,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  paddingLeft: "5%",
                  fontFamily: "JosefinSans-Bold",
                  fontSize: 18,
                }}
              >
                Change Username
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={changePassword}>
          <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                width: "100%",
                height: 50,
              }}
            >
              <Image
                source={require("../assets/img/account.png")}
                resizeMode="contain"
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 50,
                  left: 5,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  paddingLeft: "5%",
                  fontFamily: "JosefinSans-Bold",
                  fontSize: 18,
                }}
              >
                Change Password
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              borderRadius: 10,
              width: "100%",
              height: 50,
            }}
          >
            <Image
              source={require("../assets/img/herd.png")}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                borderWidth: 0.5,
                borderRadius: 50,
                left: 5,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: "5%",
                fontFamily: "JosefinSans-Bold",
                fontSize: 18,
              }}
            >
              Number of herds:
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              borderRadius: 10,
              width: "100%",
              height: 50,
            }}
          >
            <Image
              source={require("../assets/img/herd1.png")}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                borderWidth: 0.5,
                borderRadius: 50,
                left: 5,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: "5%",
                fontFamily: "JosefinSans-Bold",
                fontSize: 18,
              }}
            >
              Number of paddocks:
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 20, width: "100%", height: 70 }}>
          <TouchableOpacity onPress={createTwoButtonAlert}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#ffffff",
                borderRadius: 10,
                width: "100%",
                height: 50,
              }}
            >
              <Image
                source={require("../assets/img/logout.png")}
                resizeMode="center"
                style={{
                  width: 50,
                  height: 50,
                  borderWidth: 0.5,
                  borderRadius: 50,
                  left: 5,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  paddingLeft: "5%",
                  fontFamily: "JosefinSans-Bold",
                  fontSize: 18,
                }}
              >
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({});
