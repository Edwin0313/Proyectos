import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import pokemonViewController from "../view-controller/pokemonViewController";
import { FlatList } from "react-native";
import RenderPokemonList from "../components/renderPokemonList";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const [loadingLocal, setloadingLocal] = useState(false);
  const { pokemons, loading, setloading, getPokemons, getMorePokemons } =
    pokemonViewController();

  const fnLoadMoreItems = async () => {
    try {
      setloadingLocal(true);
      await getMorePokemons();
      setloadingLocal(false);
    } catch (error) {}
  };

  // Get Pokemon data when component mounts
  const fnGetPokemons = async () => {
    setloading(true);
    await getPokemons();
    setloading(false);
  };
  useEffect(() => {
    fnGetPokemons();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {loadingLocal ? <Loader loading={loadingLocal} /> : null}
        {loading ? <Loader loading={loading} /> : null}
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <RenderPokemonList item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyComponent}>
              <Text style={styles.emptyComponentText}>
                No existen registros
              </Text>
            </View>
          }
          ItemSeparatorComponent={
            <View
              style={{
                height: 2,
                width: "100%",
              }}
            />
          }
          onEndReached={fnLoadMoreItems}
          onEndReachedThreshold={0}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  emptyComponent: {
    marginHorizontal: 40,
    marginTop: 15,
    marginBottom: 2,
    elevation: 30,
    shadowColor: "#127054",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyComponentText: {
    padding: 2,
    color: "#0E0E3A",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
    borderRadius: 15,
    textTransform: "uppercase",
  },
});
