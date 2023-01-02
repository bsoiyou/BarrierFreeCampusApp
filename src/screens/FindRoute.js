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
  const [choosenSrcLabel, setChoosenSrcLabel] =
    useState("출발지를 선택해주세요.");
  const [choosenSrcIndex, setChoosenSrcIndex] = useState("0");
  const [choosenDestLabel, setChoosenDestLabel] =
    useState("도착지를 선택해주세요.");
  const [choosenDestIndex, setChoosenDestIndex] = useState("0");

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
  //building collection에서 모든 문서 읽어와서 building 배열에 저장
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
        {/* 출발지 선택 */}
        <Text style={styles.pickerText}>출발지 선택</Text>
        <Picker
          selectedValue={choosenSrcLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenSrcLabel(itemValue);
            setChoosenSrcIndex(itemIndex);
          }}
        >
          {/* route 배열에서 하나씩 꺼내서 picker 찍기 */}
          {srcBuilding.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.title} value={item.title} />
            );
          })}
        </Picker>
        {/* 도착지 선택 */}
        <Text style={styles.pickerText}>도착지 선택</Text>
        <Picker
          selectedValue={choosenDestLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenDestLabel(itemValue);
            setChoosenDestIndex(itemIndex);
          }}
        >
          {/* route 배열에서 하나씩 꺼내서 picker 찍기 */}
          {destBuilding.map((item, index) => {
            return (
              <Picker.Item key={index} label={item.title} value={item.title} />
            );
          })}
        </Picker>
        {/*Text to show selected picker*/}
        <Text style={styles.text}> 출발지 : {choosenSrcLabel}</Text>
        {/* <Text style={styles.text}>Selected Index: {choosenSrcIndex}</Text> */}
        <Text style={styles.text}> 도착지 : {choosenDestLabel}</Text>
        {/* <Text style={styles.text}>Selected Index: {choosenDestIndex}</Text> */}
      </View>

      <View
        style={{
          //position: "absolute",
          //bottom: "10%",
          alignSelf: "center",
          backgroundColor: "#00462A",
          borderRadius: 25,
        }}
      >
        <Button
          style={{}}
          title="경로 설정 완료"
          onPress={(params) => {
            if (choosenSrcIndex == choosenDestIndex) {
              alert("출발지와 도착지를 다르게 설정해주세요.");
            } else {
              navigation.navigate("FastRoute", {
                pathIndex: choosenSrcIndex,
              });
            }
          }}
          backgroundColor="#00462A"
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
    alignContent: "center",
  },
  text: {
    fontSize: 20,
    alignSelf: "center",
  },
  pickerText: {
    fontSize: 22,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
