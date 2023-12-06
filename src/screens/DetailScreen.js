import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { PokeContext } from "../store/PokeContext";
import { urlImagePokemon } from "../constans/routes";
import { extImage } from "../constans/values";
import Sprite from "../components/Sprite";

const DetailScreen = ({ route }) => {
  const { pokemon, getPokemonById } = useContext(PokeContext);
  const [abilities, setabilities] = useState("");
  const [moves, setMoves] = useState("");
  const [types, setTypes] = useState("");
  const { id } = route.params;
  // Get Pokemon data when component mounts
  const fnGetPokemonById = async (id) => {
    await getPokemonById(id);
  };
  const fnConcatAbilities = () => {
    if (pokemon.abilities !== undefined) {
      var aux = "";
      pokemon.abilities.map((ability) => {
        aux += ability.ability.name + " | ";
      })[0];
      setabilities(aux);
    }
  };
  const fnConcatTypes = () => {
    if (pokemon.types !== undefined) {
      var aux = "";
      pokemon.types.map((type) => {
        aux += type.type.name + " | ";
      })[0];
      setTypes(aux);
    }
  };
  const fnConcatMoves = () => {
    if (pokemon.moves !== undefined) {
      var aux = "";
      pokemon.moves.map((move) => {
        aux += move.move.name + " | ";
      })[0];
      setMoves(aux);
    }
  };
  useEffect(() => {
    fnGetPokemonById(id);
  }, []);
  useEffect(() => {
    fnConcatAbilities();
    fnConcatMoves();
    fnConcatTypes();
  }, [pokemon]);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <View
            style={[
              styles.column,
              {
                width: "35%",
              },
            ]}
          >
            <Text
              style={[
                styles.subTitle,
                {
                  fontSize: 40,
                },
              ]}
            >
              # {pokemon.id}
            </Text>
          </View>
          <View
            style={[
              styles.column,
              {
                width: "65%",
              },
            ]}
          >
            <Text
              style={[
                styles.subTitle,
                {
                  fontSize: 35,
                  textTransform: "uppercase",
                },
              ]}
            >
              {pokemon.name}
            </Text>
          </View>
        </View>
        <View style={styles.imageComponent}>
          <Image
            style={styles.image}
            src={urlImagePokemon + id + extImage}
            alt={`Pokemon ${id}`}
          />
        </View>
        <View style={styles.row}>
          <View
            style={[
              styles.column,
              {
                width: "100%",
              },
            ]}
          >
            <Text
              style={[
                styles.subTitle,
                {
                  fontSize: 25,
                },
              ]}
            >
              Weight: {pokemon.weight / 10} kg
            </Text>
          </View>
        </View>
        {pokemon.sprites !== undefined && (
          <View style={styles.row}>
            <Sprite uri={pokemon.sprites.back_default} />
            <Sprite uri={pokemon.sprites.back_shiny} />
            <Sprite uri={pokemon.sprites.front_default} />
            <Sprite uri={pokemon.sprites.front_shiny} />
          </View>
        )}

        <View style={styles.bodyTable}>
          <View style={[styles.row]}>
            <View style={[styles.leftColumnTable]}>
              <Text style={[styles.subTitleTable]}>Type:</Text>
            </View>
            <View style={[styles.rightColumnTable]}>
              <Text style={[styles.subTitleTable]}>{types}</Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={[styles.leftColumnTable]}>
              <Text style={[styles.subTitleTable]}>Abilities:</Text>
            </View>
            <View style={[styles.rightColumnTable]}>
              <Text style={[styles.subTitleTable]}>{abilities}</Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={[styles.leftColumnTable]}>
              <Text style={[styles.subTitleTable]}>Moves:</Text>
            </View>
            <View style={[styles.rightColumnTable]}>
              <Text style={[styles.subTitleTable]}>{moves}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailScreen;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
  },
  imageComponent: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
  headerText: {
    padding: 2,
    color: "#0E0E3A",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    borderColor: "#EBEBEB",
    borderWidth: 1,
    backgroundColor: "#F3F3A2",
    marginVertical: 10,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  row: {
    flexDirection: "row",
    padding: 5,
    justifyContent: "space-between",
  },
  column: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
  },
  bodyTable: {
    marginTop: 15,
    marginBottom: 15,
    elevation: 10,
    shadowColor: "#127054",
    marginHorizontal: 15,
    backgroundColor: "#F3F3A2",
    borderRadius: 15,
  },
  rightColumnTable: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    width: "65%",
  },
  leftColumnTable: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
    width: "35%",
    marginVertical: 15,
    borderRightWidth: 2,
    borderColor: "#CECECE",
  },
  subTitle: {
    color: "#0E0E3A",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitleTable: {
    color: "#0E0E3A",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  text: {
    color: "#0E0E3A",
    fontSize: 14,
  },
});
