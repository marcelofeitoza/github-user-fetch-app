import React, { useState, useEffect, useCallback } from "react";
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
import { fetchGithub, fetchUserRepositories } from "../services/githubService";

export default function UserInformation({ navigation }) {
  const [userRepositories, setUserRepositories] = useState([]);

  const clearUserRepositories = useCallback(() => {
    setUserRepositories([]);
  }, []);

  const pressHandler = () => {
    //clear userRepositories and userInfo
    clearUserRepositories();
    navigation.goBack();
  };

  const fetchRepositoriesData = async (username) => {
    const data = await fetchUserRepositories(username);
    setUserRepositories(data);
  };

  const [userData, setUserData] = useState([]);

  const fetchUserData = async (username) => {
    const data = await fetchGithub(username);
    setUserData(data);
  };

  const usernameToFetch = navigation.getParam("usernameToFetch");
  useEffect(() => {
    fetchUserData(usernameToFetch);
    fetchRepositoriesData(usernameToFetch);
  }, []);

  //console.log(userData.login);
  //console.log(userRepositories);

  return (
    /* 
    <Text style={styles.mainHeader}>
      {usernameToFetch !== undefined ? usernameToFetch : "User not found"}
    </Text>
    */

    <View style={styles.mainContainer}>
      <StatusBar style="auto" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.allData}>
          <View style={styles.userBasicInfo}>
            <Image
              source={{ uri: userData.avatar_url }}
              style={styles.userPicture}
            />

            <View style={styles.imageAndSideText}>
              <View>
                <Text style={[{ width: "100%" }, styles.mainHeader]}>
                  Name:
                </Text>
                <Text style={styles.mainUserInfo}>{userData.name}</Text>
              </View>

              <View>
                <Text style={styles.mainHeader}>Username:</Text>
                <Text style={styles.mainUserInfo}>{userData.login}</Text>
              </View>

              <View>
                <Text style={styles.mainHeader}>Location:</Text>
                <Text style={styles.mainUserInfo}>{userData.location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.userStats1}>
            <View style={styles.userDataView1}>
              <Text style={styles.header}>Repostories:</Text>
              <Text style={styles.userInfo}>{userData.public_repos}</Text>
            </View>

            <View style={styles.userDataView1}>
              <Text style={styles.header}>Following:</Text>
              <Text style={styles.userInfo}>{userData.following}</Text>
            </View>

            <View style={styles.userDataView1}>
              <Text style={styles.header}>Followers:</Text>
              <Text style={styles.userInfo}>{userData.followers}</Text>
            </View>

            <View style={styles.userDataView1}>
              <Text style={styles.header}>Id:</Text>
              <Text style={styles.userInfo}>{userData.id}</Text>
            </View>
          </View>

          <View style={styles.userStats2}>
            <View style={styles.userDataView2}>
              <Text style={styles.header}>Company:</Text>
              <Text numberOfLines={2} style={styles.userInfo}>
                {userData.company ? userData.company : "No company"}
              </Text>
            </View>

            <View style={styles.userDataView2}>
              <Text style={styles.header}>Type:</Text>
              <Text style={styles.userInfo}>{userData.type}</Text>
            </View>

            <View style={styles.userDataView2}>
              <Text style={styles.header}>Created at:</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="clip"
                style={styles.userInfo}
              >
                {userData.created_at}
              </Text>
            </View>

            <View style={styles.emptyDataView2}>
              <Text style={styles.header}></Text>
              <Text style={styles.userInfo}></Text>
            </View>
          </View>

          <View style={styles.repositoriesListContainer}>
            <Text style={styles.header}>{userData.login}'s Repositories</Text>
            <ScrollView style={styles.repositoriesList}>
              {userRepositories.map((repository, index) => {
                return (
                  <View key={index} style={styles.repository}>
                    <Text style={styles.repositoryName}>{repository.name}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
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
    height: 610,
    backgroundColor: "rgba(22, 27, 34, 0.75)",
    borderRadius: 32,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  allData: {
    display: "flex",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
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
    marginRight: 16,
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
  userStats1: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 8,
  },
  userDataView1: {
    marginHorizontal: 8,
  },

  userStats2: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 8,
    marginBottom: 8,
  },
  userDataView2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginHorizontal: 4,

    width: "29%",
    height: 50,
  },

  header: {
    fontSize: 13,
    color: "#C4C4C4",
    paddingHorizontal: 8,
  },
  userInfo: {
    fontSize: 14,
    color: "#fff",
    paddingHorizontal: 8,
    flexWrap: "wrap",
  },
  emptyDataView: {
    flex: 1,
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
    flexWrap: "wrap",
    width: 197,
  },
  lastItem: {
    paddingRight: 32,
  },

  repositoriesListContainer: {
    width: 334,
    height: 275,
  },
  repositories: {
    justifyContent: "space-around",
    marginTop: 16,
    marginBottom: 16,
  },
  repositoriesList: {
    marginTop: 4,
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
