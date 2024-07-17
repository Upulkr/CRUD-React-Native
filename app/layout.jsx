import { Text, View } from "react-native";
import React, { Component } from "react";

export class layout extends Component {
  render() {
    return (
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
    );
  }
}

export default layout;
