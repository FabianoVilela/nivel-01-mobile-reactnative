import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  header: {
    color: "#36bea1",
    fontSize: 50,
    fontWeight: "bold",
  },
});
