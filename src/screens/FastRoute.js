import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Alert,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import SwiperWithChildren from "./SwiperWithChildren";

export default function FastRoute({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SwiperWithChildren />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: "center",
  },
  text: {
    fontSize: width * 0.1,
    textAlign: "center",
  },
});
