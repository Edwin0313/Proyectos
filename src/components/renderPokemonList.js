import React, { memo } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { urlImagePokemon } from "../constans/routes";
import { extImage } from "../constans/values";
import { useNavigation } from "@react-navigation/native";

const RenderPokemonList = ({ item }) => {
  const navigation = useNavigation();
  const fnGetPokemnById = (id) => {
    navigation.navigate("Pokemon", { id: id });
  };
  return (
    <Pressable
      onPress={() => fnGetPokemnById(item.id)}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "#CAF0FF" : "white",
        },
        styles.container,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}># {item.id}</Text>
      </View>

      <View style={styles.imageComponent}>
        <Image
          style={styles.image}
          src={urlImagePokemon + item.id + extImage}
          alt={`Pokemon ${item.name}`}
        />
      </View>
      <View style={styles.nameComponent}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

export default memo(RenderPokemonList);
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 40,
    marginTop: 15,
    marginBottom: 2,
    elevation: 40,
    shadowColor: "#127054",
    borderTopLeftRadius: 15,
  },
  header: {},
  headerText: {
    padding: 10,
    color: "#0E0E3A",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    borderColor: "#EBEBEB",
    borderWidth: 1,
    backgroundColor: "#F3F3A2",
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  imageComponent: {
    marginVertical: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 275,
    height: 275,
  },
  nameComponent: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    padding: 2,
    color: "#0E0E3A",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    textTransform: "uppercase",
  },
});
