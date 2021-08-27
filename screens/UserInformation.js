import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ListItem,
  ScrollView,
} from "react-native";
import { fetchUserRepositories } from "../services/githubService";

//export default function UserInformation({ userInfo, userRepositories, navigation }) {

export default function UserInformation({ navigation }) {
  const userInfo = navigation.getParam("userDataObject");
  console.log(userInfo);
  
  if (userInfo === undefined) {
    alert("User not found or something went wrong. Try again");
    setTimeout(() => {
      navigation.goBack();
    }, 1500);
  }

  const [userRepositories, setUserRepositories] = useState([]);

  const pressHandler = () => {
    //clear userRepositories and userInfo
    setUserRepositories([]);
    navigation.goBack();
  };

  useEffect(() => {
    setTimeout(() => {
      const fetchRepoData = async (username) => {
        const response = await fetchUserRepositories(username);
        setUserRepositories([response]);

        console.log(userRepositories);
      };

      if (userInfo !== undefined) {
        fetchRepoData(userInfo.login);
      }
    }, 2000);

  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="auto" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.userBasicInfo}>
          {/*<Image
            source={{ uri: userInfo.avatar_url }}
            style={styles.userPicture}
          />

           <View style={styles.imageAndSideText}>
            <Text style={styles.mainHeader}>Name:</Text>
            <Text style={styles.mainUserInfo}>{userInfo[0].name}</Text>

            <Text style={styles.mainHeader}>Username:</Text>
            <Text style={styles.mainUserInfo}>{userInfo[0].login}</Text>

            <Text style={styles.mainHeader}>Location:</Text>
            <Text style={styles.mainUserInfo}>{userInfo[0].location}</Text>
          </View> */}
        </View>
        {/*
        <View style={styles.userStats}>
          <View style={styles.textSection}>
            <Text style={styles.header}>Repostories:</Text>
            <Text style={styles.userInfo}>{userInfo[0].public_repos}</Text>
          </View>

          <View style={styles.following, styles.textSection}>
            <Text style={styles.header, styles.textSection}>Following:</Text>
            <Text style={styles.userInfo}>{userInfo[0].following}</Text>
          </View>

          <View style={styles.followers, styles.textSection}>
            <Text style={styles.header}>Followers:</Text>
            <Text style={styles.userInfo}>{userInfo[0].followers}</Text>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.header}>Id:</Text>
            <Text style={styles.userInfo}>{userInfo[0].id}</Text>
          </View>
        </View>

        <View style={styles.userStats}>
          <View style={styles.textSection}>
            <Text style={styles.header}>Company:</Text>
            <Text style={styles.userInfo}>
              {userInfo[0].company ? userInfo[0].company : "No company"}
            </Text>
          </View>

          <View style={styles.type, styles.textSection}>
            <Text style={styles.header}>Type:</Text>
            <Text style={styles.userInfo}>{userInfo[0].type}</Text>
          </View>

          <View style={styles.lastItem, styles.textSection}>
            <Text style={styles.header}>Created at:</Text>
            <Text style={styles.userInfo}>{userInfo[0].created_at}</Text>
          </View>

          <View style={styles.textSection}> 
            <Text style={styles.header}></Text>
            <Text style={styles.userInfo}></Text>
          </View>
        </View>

        <View>
          <Text style={styles.header}>{userInfo[0].login}'s Repositories</Text>

          <ScrollView style={styles.repositoriesList}>
            {userRepositories.map((repository, index) => {
              return (
                <View key={index} style={styles.repository}>
                  <Text style={styles.repositoryName}>{repository.name}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>*/}
      </View>

      <TouchableOpacity onPress={pressHandler} style={styles.returnButton}>
        <Text style={styles.returnText}>Return</Text>
      </TouchableOpacity>
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
    height: 550,
    backgroundColor: "rgba(22, 27, 34, 0.75)",
    borderRadius: 48,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  returnButton: {
    width: 149,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  returnText: {
    fontSize: 25,
  },
  userPicture: {
    width: 148,
    height: 148,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: "#C4C4C4",
    marginRight: 40,
  },
  userBasicInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  imageSideText: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  userStats: {
    display: "flex",
    flexDirection: "row",
    marginTop: 16,
  },
  header: {
    fontSize: 14,
    color: "#C4C4C4",
  },
  userInfo: {
    fontSize: 14,
    color: "#fff",
  },

  type: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  following: {
    paddingRight: 8,
    paddingLeft: 16,
  },
  followers: {
    paddingLeft: 8,
    paddingRight: 16,
  },

  mainHeader: {
    fontSize: 16,
    color: "#C4C4C4",
  },
  mainUserInfo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  lastItem: {
    paddingRight: 32,
  },

  repositories: {
    justifyContent: "space-around",
    marginTop: 16,
    width: 334,
    height: 200,
    marginBottom: 16,
  },

  repositoriesList: {
    marginTop: 4,
    width: 334,
    height: 338,
    borderRadius: 8,
    backgroundColor: "rgba(196, 196, 196, 0.25)",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
  },
  repositoryName: {
    fontSize: 14,
    paddingVertical: 1,
    paddingLeft: 4,
    marginVertical: 1,
    color: "#fff",
  },
});
