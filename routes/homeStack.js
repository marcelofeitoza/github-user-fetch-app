import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomePage from "../screens/HomePage";
import UserInformation from "../screens/UserInformation";

const screens = {
  HomePage: {
    screen: HomePage,
  },
  UserInformation: {
    screen: UserInformation,
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
  },
});

export default createAppContainer(HomeStack);
