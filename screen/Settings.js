// Settings.js
import React from "react";
import { View, Switch, Text } from "react-native";
import { useTheme } from "../utils/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{`Current theme: ${theme}`}</Text>
      <Switch value={theme === "dark"} onValueChange={toggleTheme} />
    </View>
  );
};

export default Settings;
