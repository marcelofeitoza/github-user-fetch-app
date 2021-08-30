import React, { Component, useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { fetchGithub } from "../services/githubService";

export default function HomePage({ navigation }) {
  const [textInputValue, setTextInputValue] = useState("");

  const clearTextInput = useCallback(() => {
    setTextInputValue("");
  }, []);

  const pressHandler = () => {
    if (textInputValue !== "") {
      navigation.navigate("UserInformation", {
        usernameToFetch: textInputValue,
      });
    } else {
      alert("Please enter a username");
    }
  }


  useEffect(() => {
    clearTextInput();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="auto" barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.mainTitle}>
          Type your github user name and check out your data!
        </Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.typeUsername}
        >
          <TextInput
            id="username"
            style={styles.input}
            placeholder={"Username"}
            onChangeText={(text) => setTextInputValue(text)}
            value={textInputValue}
          />
        </KeyboardAvoidingView>

        <TouchableOpacity onPress={pressHandler} style={styles.addWrapper}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#211954",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    display: "flex",
    width: 379,
    height: 380,
    backgroundColor: "rgba(22, 27, 34, 0.75)",
    borderRadius: 48,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  typeUsername: {
    display: "flex",
    borderRadius: 48,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  mainTitle: {
    color: "#fff",
    fontSize: 25.5,
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 60,
    width: 322,
    height: 60,
    marginBottom: 16,
  },
  addWrapper: {
    width: 149,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: "#000",
    fontSize: 25,
  },
});
