import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import FavoritesScreen from "../screens/FavoriteScreen";
import SearchScreen from "../screens/SearchScreen";
import BookingScreen from "../screens/BookingScreen";
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
import InboxDetailScreen from "../screens/InboxDetailScreen";
import PoliciesDetailScreen from "../screens/PoliciesDetailScreen";
import HomeAdmin from "../screens/HomeAdmin";
import AdminProductManagement from "../screens/AdminProductManagement";
import AdminUserManagement from "../screens/AdminUserManagement";
import AdminFormModal from "../screens/AdminFormModal";


const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Introduce">
      <Stack.Screen
        name="Introduce"
        component={IntroduceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminHome"
        component={HomeAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminProductManagement"
        component={AdminProductManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminUserManagement"
        component={AdminUserManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminFormModal"
        component={AdminFormModal}
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
        name="InboxDetailScreen"
        component={InboxDetailScreen}
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
        name="BookingScreen"
        component={BookingScreen}
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
        name="PoliciesDetailScreen"
        component={PoliciesDetailScreen}
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
