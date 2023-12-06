import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Sprite = ({ uri }) => {
  return (
    <View style={[styles.column]}>
      <View>
        <Image style={styles.image} src={uri} />
      </View>
    </View>
  );
};

export default Sprite;
const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 8,
    borderColor: "grey",
    borderRadius: 50,
    borderWidth: 1,
    elevation: 10,
    shadowColor: "#127054",
    backgroundColor: "white",
  },
  image: {
    width: 60,
    height: 60,
  },
});
