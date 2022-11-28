import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function FindRoute({ navigation }) {
  state = {
    hand: "right",
  };
  const [choosenLabel, setChoosenLabel] = useState("Native");
  const [choosenIndex, setChoosenIndex] = useState("2");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel(itemValue);
            setChoosenIndex(itemIndex);
          }}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
        {/*Text to show selected picker*/}
        <Text style={styles.text}>Selected Value: {choosenLabel}</Text>
        <Text style={styles.text}>Selected Index: {choosenIndex}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
  },
});
