import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import FavoritesScreen from "../screens/FavoriteScreen";
import SearchScreen from "../screens/SearchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ReviewsScreen from "../screens/ReviewScreen";
import DescriptionScreen from "../screens/DescriptionScreen";
import PaymentSuccessScreen from "../screens/PaymentSuccessScreen";
import DateSelectionScreen from "../screens/DateSelectionScreen";
import GuestSelectionScreen from "../screens/GuestSelectionScreen";
import FilterScreen from "../screens/FilterScreen";
import DetailScreen from "../screens/DetailScreen";
import ConfirmAndPayScreen from "../screens/ConfirmAndPayScreen";
import IntroduceScreen from "../screens/Introduce";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import RegisterAccount from "../screens/RegisterAccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InboxScreen from "../screens/InboxScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="FilterScreen">
      <Stack.Screen
        name="Introduce"
        component={IntroduceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login2"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterAccount"
        component={RegisterAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewsScreen"
        component={ReviewsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DescriptionScreen"
        component={DescriptionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DateSelectionScreen"
        component={DateSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuestSelectionScreen"
        component={GuestSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmAndPayScreen"
        component={ConfirmAndPayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
