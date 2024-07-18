import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Link, router } from "expo-router";
import cat from ".../../../assets/signup.png";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;
        Alert.alert("Success", "User signed in successfully");
        router.push("/ItemAddArea/itemadd-route");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up: ", errorCode, errorMessage);
      });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
       
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
            Sign Up
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
          <Button title="Sign Up" onPress={handleSignUp} />
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
            <Link href="/sign-in" style={styles.linkText}>
              <Text>Already have an account? Sign In</Text>
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
    backgroundColor: "#161622",
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
    text: "white",
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

