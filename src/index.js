import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#e9e9f0' />
      <View style={styles.container}>
        <Text style={styles.title}>Hello Fabiano</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e9e9f0",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#36bea1",
    fontSize: 32,
    fontWeight: "bold",
  },
});
