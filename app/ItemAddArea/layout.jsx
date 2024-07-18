import { View, Text } from "react-native";
import React from "react";

const layout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="itemadd-route" options={{ headerShown: false }} />
        
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default layout;
