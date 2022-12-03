import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import SwiperWithChildren from "./SwiperWithChildren";

const images = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4A.png?alt=media&token=f68ed468-0bc5-47b9-acdc-49770a8bc727",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4B.png?alt=media&token=5ae834bb-77f3-4402-adb3-1e1639934cac",
  },
];

export default function FastRoute({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SwiperWithChildren />
        <Text>빠른 길찾기</Text>
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
    height: "50%",
    //width: "100%",
    justifyContent: "center",
  },
  text: {
    fontSize: "50%",
    textAlign: "center",
  },
});
