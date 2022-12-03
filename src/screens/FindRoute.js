import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";
import { DB } from "../firebase";

export default function FindRoute({ navigation }) {
  const [choosenLabel, setChoosenLabel] = useState("Native");
  const [choosenIndex, setChoosenIndex] = useState("2");

  // 건물들 불러오기
  const [srcBuilding, setSrcBuilding] = useState([]);
  //building collection에서 모든 문서 읽어와서 marks 배열에 저장
  useEffect(() => {
    const q = query(collection(DB, "route"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          title: doc.data().title,
        });
      });
      setSrcBuilding(list);
    });
    return () => unsubscribe();
  }, []);

  const [destBuilding, setDestBuilding] = useState([]);
  //building collection에서 모든 문서 읽어와서 marks 배열에 저장
  useEffect(() => {
    const q = query(collection(DB, "route"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          title: doc.data().title,
        });
      });
      setDestBuilding(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*Picker with multiple chose to choose*/}
        {/*selectedValue to set the preselected value if any*/}
        {/*onValueChange will help to handle the changes*/}
        <Picker
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel1(itemValue);
            setChoosenIndex1(itemIndex);
          }}
        >
          {/* boards 배열에서 하나씩 꺼내서 marker 찍기 */}
          {srcBuilding.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.title} value={item.title} />
            );
          })}
        </Picker>

        <Picker
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel2(itemValue);
            setChoosenIndex2(itemIndex);
          }}
        >
          {/* boards 배열에서 하나씩 꺼내서 marker 찍기 */}
          {destBuilding.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.title} value={item.title} />
            );
          })}
        </Picker>
        {/*Text to show selected picker*/}
        <Text style={styles.text}>출발지: {choosenLabel1}</Text>
        <Text style={styles.text}>Selected Index: {choosenIndex1}</Text>
        <Text style={styles.text}>목적지: {choosenLabel2}</Text>
        <Text style={styles.text}>Selected Index: {choosenIndex2}</Text>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: "10%",
          alignSelf: "center",
          backgroundColor: "#00462A",
          borderRadius: 25,
        }}
      >
        <Button
          style={{}}
          title="경로 설정 완료"
          onPress={() => navigation.navigate("Route")}
          color="#fff"
        />
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
