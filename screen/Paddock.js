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
import { useFocusEffect } from "@react-navigation/native";

const Paddock = ({ navigation, route }) => {
  const [paddockData, setPaddockData] = useState([]);
  const [filteredPaddocks, setFilteredPaddocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  const loadPaddocks = async () => {
    try {
      const storedPaddocks = await AsyncStorage.getItem("paddocks");
      const parsedPaddocks = storedPaddocks ? JSON.parse(storedPaddocks) : [];
      setPaddockData(parsedPaddocks);
    } catch (error) {
      console.error("Failed to fetch paddocks:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadPaddocks();
    }, [])
  );

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = paddockData.filter((paddock) =>
        paddock.paddockName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPaddocks(filtered);
    } else {
      setFilteredPaddocks(paddockData);
    }
  }, [searchQuery, paddockData]);

  const handleItemPress = (paddock) => {
    navigation.navigate("ViewPaddock", paddock);
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
        <Text style={styles.headerText}>Paddock List</Text>
      </View>
      <View>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search available paddocks"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <TouchableOpacity
        style={styles.addPaddockButton}
        onPress={() => navigation.navigate("AddPaddock")}
      >
        <Text style={styles.addPaddockButtonText}>Add Paddock</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {filteredPaddocks.length > 0 ? (
          filteredPaddocks.map((paddock, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => handleItemPress(paddock)}
            >
              <View style={{ left: "2%" }}>
                <Text style={styles.itemName}>
                  Paddock Name:
                  <Text style={{ fontFamily: "JosefinSans-BoldItalic" }}>
                    {paddock.paddockName}{" "}
                  </Text>
                </Text>
              </View>
              <View style={{ width: "100%", height: "70%" }}>
                <Image
                  source={paddock.imageUrl}
                  resizeMode="fit"
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
                  <Text style={styles.itemName}>
                    Paddock Number: {paddock.paddockNumber}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    right: "2%",
                  }}
                >
                  <Text style={styles.itemName}>
                    Land Owner:{paddock.landOwner}
                    <Text style={{ fontFamily: "JosefinSans-BoldItalic" }}>
                      {paddock.herdDaysLeft}
                    </Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noPaddocksHeader}>No paddocks added yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Paddock;

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
  addPaddockContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  backButton: {
    marginLeft: 10,
  },
  itemContainer: {
    width: "96%",
    height: 200,
    alignSelf: "center",
    marginTop: "3%",
    backgroundColor: "#FFFF",
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
  noPaddocksHeader: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "JosefinSans-BoldItalic",
    fontSize: 20,
    marginTop: "50%",
  },
  addPaddockButton: {
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
    alignSelf: "center", // Center button horizontally
  },
  addPaddockButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    // fontFamily: "JosefinSans-BoldItalic",
  },
});
