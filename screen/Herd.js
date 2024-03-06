import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "react-native-vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const Herd = ({ navigation, route }) => {
  const [herdData, setHerdData] = useState([]);
  const [filteredHerds, setFilteredHerds] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const loadHerds = async () => {
    try {
      const storedHerds = await AsyncStorage.getItem("herds");
      const parsedHerds = storedHerds ? JSON.parse(storedHerds) : [];
      setHerdData(parsedHerds);
    } catch (error) {
      console.error("Failed to fetch herds:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadHerds();
    }, [])
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = herdData.filter((herd) =>
        herd.herdName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHerds(filtered);
    } else {
      setFilteredHerds(herdData);
    }
  }, [searchQuery, herdData]);

  const handleItemPress = (herd) => {
    navigation.navigate("ViewHerd", herd);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Image
            source={require("../assets/img/logos.png")}
            resizeMode="cover"
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Herd List</Text>
      </View>
      <View>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search available herds"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <TouchableOpacity
        style={styles.addHerdButton}
        onPress={() => navigation.navigate("AddHerd")}
      >
        <Text style={styles.addHerdButtonText}>Add Herd</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filteredHerds.length > 0 ? (
          filteredHerds.map((herd, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleItemPress(herd)}
            >
              <View style={{ left: "2%" }}>
                <Text style={styles.itemName}>
                  Herd Name:
                  <Text style={{ fontFamily: "JosefinSans-BoldItalic" }}>
                    {herd.herdName}{" "}
                  </Text>
                </Text>
              </View>
              <View style={{ width: "100%", height: "70%" }}>
                <Image
                  source={herd.imageUrl}
                  // resizeMode="tile"
                  style={styles.itemImage}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    left: "2%",
                  }}
                >
                  <Entypo name="time-slot" size={18} color="green" />
                  <Text style={styles.itemName}>
                    Days until herds are moved: {herd.differenceInDays}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noHerdsHeader}>No herds added yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 50,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 22,
    marginLeft: 15,
  },
  backButton: {
    marginLeft: 10,
  },
  container: {
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex: 1,
    overflow: "hidden",
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  itemContainer: {
    width: "96%",
    height: 200,
    alignSelf: "center",
    marginTop: "3%",
    backgroundColor: "#ffff",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemName: {
    fontSize: 14,
    fontFamily: "JosefinSans-Regular",
    padding: 5,
  },
  searchBar: {
    marginTop: 8,
    marginBottom: 10,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#ffff",
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  noHerdsHeader: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 20,
    marginTop: "50%",
  },
  addHerdButton: {
    marginBottom: 8,
    width: "40%",
    height: 50,
    backgroundColor: "#007000",
    borderWidth: 0.75,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
  },
  addHerdButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Herd;
