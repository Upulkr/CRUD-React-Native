import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import cat from ".../../../assets/cat.png";
export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
 
        const user = userCredential.user;
        console.log("User signed in: ", user);
        Alert.alert("Success", "User signed in successfully");
        router.push("/ItemAddArea/itemadd-route");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in: ", errorCode, errorMessage);
      });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={cat} style={styles.backgroundImage} />
        <View style={styles.overlay}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 16,
              textAlign: "center",
              color: "white",
            }}
          >
            Sign In
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Sign In" onPress={handleSignIn} />
          <View
            style={{
              color: "white",
              marginTop: 20,
              textAlign: "center",
              position: "relative",
              top: 20,

              justifyContent: "center",
            }}
          >
            <Link href="/sign-up" style={styles.linkText}>
              <Text>Don't have an account? Sign Up</Text>
            </Link>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#161622",
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "90%",
    resizeMode: "contain",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    // optional: to make inputs more readable
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
   text:"white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  linkText: {
    color: "white",

    textAlign: "center",
    fontSize: 20,
  
  },
});
