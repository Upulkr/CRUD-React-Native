import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import ShoppingItem from "../../components/ShoppingItem.js";
import {
  addDoc,
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
} from "../../firebase/api.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";

const ItemAddArea = () => {
  const [title, setTitle] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);

  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });

      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getShoppingItems();
  };

  const getShoppingItems = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    let items = [];

    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });

    setShoppingList(items);
  };

  useEffect(() => {
    getShoppingItems();
  }, []);

  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));

    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));
    getShoppingItems();
  };
  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Sign out canceled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const auth = getAuth();
              await signOut(auth);
              Alert.alert("Success", "User signed out successfully");

              router.replace("/sign-in");
            } catch (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error("Error signing out: ", errorCode, errorMessage);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Shopping List</Text>
          <View style={styles.countContainer}>
            <Text style={styles.headerCount}>{shoppingList.length}</Text>
          </View>
          <Pressable onPress={deleteShoppingList}>
            <FontAwesome
              name="trash"
              size={24}
              color="black"
              style={{ marginRight: 30, marginLeft: 10, width: 20 }}
            />
          </Pressable>
          <Pressable onPress={handleSignOut} style={styles.signoutButton}>
            <FontAwesome
              name="sign-out"
              size={24}
              color="black"
              style={{ marginRight: 0, marginLeft: 10, width: 20 }}
            />
          </Pressable>
        </View>

        {shoppingList.length > 0 ? (
          <FlatList
            data={shoppingList}
            renderItem={({ item }) => (
              <ShoppingItem
                id={item.id}
                title={item.title}
                isChecked={item.isChecked}
                getShoppingItems={getShoppingItems}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>
              There are no items. Add something!
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter Shopping item"
            style={styles.textInput}
            value={title}
            onChangeText={(text) => setTitle(text)}
            onSubmitEditing={addShoppingItem}
          />
          <Pressable onPress={addShoppingItem}>
            <FontAwesome
              name="plus"
              size={24}
              color="black"
              style={{ marginLeft: 10, marginRight: 10 }}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  countContainer: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  headerCount: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  itemTitle: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 18,
    color: "grey",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    padding: 10,
    spaceBetween: 10,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    width: "80%",
    backgroundColor: "white",
  },
  signoutButton: {
    marginLeft: 10,
  },
});

export default ItemAddArea;
