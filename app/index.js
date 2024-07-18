import { GestureHandlerRootView } from "react-native-gesture-handler";

import SignIn from "./(auth)/sign-in.jsx";
import SignUp from "./(auth)/sign-up.jsx";
import ItemAddArea from './ItemAddArea/itemadd-route';
import { Text } from "react-native";




export default function Page() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <SignIn/>

      {/* <ItemAddArea /> */}
    </GestureHandlerRootView>
  );
}
