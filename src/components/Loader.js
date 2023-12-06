import React from "react";
import { View, Modal, ActivityIndicator } from "react-native";

const Loader = ({ loading, opacity, sizeIcon }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={loading}>
      <View
        backgroundColor={
          opacity ? "rgba(0,0,0," + opacity + ")" : "rgba(0,0,0,0.35)"
        }
        style={{
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ActivityIndicator size={sizeIcon ? sizeIcon : 60} color="#F3F3A2" />
      </View>
    </Modal>
  );
};

export default Loader;
