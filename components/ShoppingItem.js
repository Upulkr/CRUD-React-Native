import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { deleteDoc, db, doc, updateDoc } from "../firebase/api.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";

<AntDesign name="delete" size={24} color="black" />;
export const ShoppingItem = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const updateChecked = async () => {
    const shoppingRef = doc(db, "shopping", props.id);

    await updateDoc(shoppingRef, {
      isChecked: isChecked,
    });
  };

  useEffect(() => {
    updateChecked();
  }, [isChecked]);

  const deleteShoppingItem = async () => {
    await deleteDoc(doc(db, "shopping", props.id));
    props.getShoppingItems();
  };
  return (
    <SafeAreaView style={styles.container}>
 
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <FontAwesome name="check-circle" size={24} color="black" />
        ) : (
          <FontAwesome name="circle-thin" size={24} color="black" />
        )}
      </Pressable>

      <Text style={styles.title}>{props.title}</Text>

      <Pressable onPress={deleteShoppingItem}>
        <FontAwesome name="trash" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    justifyContent: "space-between",
    padding:25
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});

export default ShoppingItem;