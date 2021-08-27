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
  const [userData, setUserData] = useState([]);
  const [textInputValue, setTextInputValue] = useState("");

  const fetchUserData = async (username) => {
    await fetchGithub(username).then((data) => {
      setUserData(data);
      clearTextInput();
    });

    //console.log(response);

    userData.length > 0
      ? navigation.navigate("UserDetails", { userData })
      : null;
  };

  const clearTextInput = useCallback(() => {
    setTextInputValue("");
  }, []);

  const pressHandler = async () => {
    if (textInputValue !== null) {
      console.log(textInputValue);

      await fetchUserData(textInputValue);

      const userDataObject = userData[0];

      setTimeout(() => {
        navigation.navigate("UserInformation", {
          userDataObject,
        });
        console.log(textInputValue + "123");
      }, 1500);

      //clear textInputValue after submit
    } else {
      alert("Please enter a username");
    }
  };

  useEffect(() => {
    clearTextInput();
    setUserData([]);
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

          <TouchableOpacity onPress={pressHandler} style={styles.addWrapper}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
