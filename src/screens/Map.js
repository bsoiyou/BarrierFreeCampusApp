import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  GeoPoint,
  getGeoPoint,
  collectionGroup,
} from "firebase/firestore";
import { DB } from "../firebase";
import { BottomSheet } from "react-native-btr";
// BottomSheet
const [visible, setVisible] = useState(false);
const toggleBottomNavigationView = () => {
  //Toggling the visibility state of the bottom sheet
  setVisible(!visible);
};
function BotSheet({}) {
  return (
    <BottomSheet
      //BottomSheet이 보이도록 설정
      visible={visible}
      onBackButtonPress={toggleBottomNavigationView}
      onBackdropPress={toggleBottomNavigationView}
    >
      {/*Bottom Sheet inner View*/}
      <View style={styles.bottomNavigationView}>
        <ScrollView style={styles.scrollView}>
          <Text
            style={{
              textAlign: "center",
              padding: 20,
              fontSize: 20,
            }}
          >
            INFORMATION
          </Text>
          {/* boardId 사용하여 해당 게시판으로 이동 */}
          <Button title="게시판으로 이동" onPress={alert}></Button>
        </ScrollView>
      </View>
    </BottomSheet>
  );
}

export default function Map({ navigation }) {
  // // SearchBox
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const onChangeSearch = (query) => setSearchQuery(query);

  // Markers
  const [marks, setMarks] = useState([]);
  //markers collection에서 모든 문서 읽어와서 marks 배열에 저장
  useEffect(() => {
    const q = query(collection(DB, "markers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(
          new GeoPoint(doc.data().loc.latitude, doc.data().loc.longitude)
        );
      });
      setMarks(list);
    });
    return () => unsubscribe();
  }, []);

  // Markers
  const [bulMarks, setBulMarks] = useState([]);
  //building collection에서 모든 문서 읽어와서 marks 배열에 저장
  useEffect(() => {
    const q = query(collection(DB, "boards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          title: doc.data().title,
          loc: new GeoPoint(doc.data().loc.latitude, doc.data().loc.longitude),
          boardId: doc.data().boardId,
        });
      });
      setBulMarks(list);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.561025,
          longitude: 126.94654,
          latitudeDelta: 0.003,
          longitudeDelta: 0.004,
        }}
        provider={PROVIDER_GOOGLE}
        maxZoomLevel={30}
      >
        {/* marks 배열에서 하나씩 꺼내서 marker 찍기 */}
        {marks.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={`${index}`}
              description="this is a marker example"
              onPress={toggleBottomNavigationView}
            />
          );
        })}

        {/* boards 배열에서 하나씩 꺼내서 marker 찍기 */}
        {bulMarks.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.loc.latitude,
                longitude: item.loc.longitude,
              }}
              title={item.title}
              onPress={toggleBottomNavigationView}
            />
          );
        })}
      </MapView>

      {/* 장애물 제보 버튼 */}
      <View
        style={{
          position: "absolute",
          bottom: "10%",
          alignSelf: "center",
          backgroundColor: "#D30000",
          borderRadius: 25,
        }}
      >
        <Button
          style={{}}
          title="장애물 제보"
          onPress={() => navigation.navigate("CreatePost")}
          color="#fff"
        />
      </View>

      {/* 길찾기 버튼 */}
      <View
        style={{
          position: "absolute",
          top: "5%",
          right: "5%",
          //alignSelf: "center",
          backgroundColor: "#00462A",
          borderRadius: 25,
        }}
      >
        <Button
          style={{}}
          title="길찾기"
          onPress={() => navigation.navigate("FindRoute")}
          color="#fff"
        />
      </View>
    </View>
  );
}

// //postId 부분을 각 marker가 가진 postId 값으로 들어가게 수정
// const q1 = query(collectionGroup(DB, 'posts'), where('postId', '==', route.params.postId));
// const data=getDocs(q);
// postRef = data.docs[0].ref;
// const docSnap = getDoc(postRef);
// console.log(docSnap.data());

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    // 수정하기
    height: Dimensions.get("window").height - 20,
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  scrollView: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
