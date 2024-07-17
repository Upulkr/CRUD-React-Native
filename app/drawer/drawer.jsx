import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../profile/profile";
import SignOut from "../(auth)/sign-out";


  

const Drawer = createDrawerNavigator();

export default function DrawerWindow() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="profile" component={Profile} />
        <Drawer.Screen name="sign-out" component={SignOut} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
