import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";

import Navigator from "./routes/homeStack";

export default function App() {

  return (
    <>
      <StatusBar style="auto" barStyle="light-content" />
      <Navigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#211954",
    alignItems: "center",
    justifyContent: "center",
  },
});
