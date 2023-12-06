import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "#0E0E3A",
          headerStyle: { backgroundColor: "#F3F3A2" },
        }}
      >
        <Stack.Screen name="Pokemons" component={HomeScreen} />
        <Stack.Screen name="Pokemon" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
