import { GestureHandlerRootView } from "react-native-gesture-handler";
import ItemAddArea from "./ItemAddArea/itemadd-route.jsx";
import SignIn from "./(auth)/sign-in.jsx";
import SignUp from "./(auth)/sign-up.jsx";

export default function Page() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <SignIn/> */}

      <ItemAddArea />
    </GestureHandlerRootView>
    
  );
}
