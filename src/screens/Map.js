import React, { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  ScrollView,
  Modal,
  SafeAreaView,
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
import { FontAwesome5 } from "@expo/vector-icons";

export default function Map({ navigation }) {
  // BottomSheet
  const [visible, setVisible] = useState(false);
  const [building, setBuilding] = useState(["건물 정보"]);

  // // SearchBox
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const onChangeSearch = (query) => setSearchQuery(query);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [marker, setMarker] = useState(["장애물 정보"]);

  // Markers
  const [marks, setMarks] = useState([]);
  //markers collection에서 모든 문서 읽어와서 marks 배열에 저장
  useEffect(() => {
    const q = query(collection(DB, "markers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          loc: new GeoPoint(doc.data().loc.latitude, doc.data().loc.longitude),
          description: doc.data().des,
        });
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
          description1: doc.data().des1,
          description2: doc.data().des2,
          description3: doc.data().des3,
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
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
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
              //description={item.description}
              onPress={() => setShowModal(!showModal)}
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
              onPress={() => {
                setVisible(!visible);
                setBuilding(item);
              }}
              // {
              //   console.log(building);
              // }
            >
              <FontAwesome5 name="building" size={24} color="#AAAAAA" />
            </Marker>
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
          title="장애물 제보"
          onPress={() => navigation.navigate("CreatePost")}
          color={"white"}
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

      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        {/*All views of Modal*/}
        {/*Animation can be slide, slide, none*/}
        <View style={styles.modal}>
          <Text style={styles.text}>모달 열리고 적혀있을것들</Text>
          <Button
            color="#00462A"
            title="지도로 돌아가기"
            onPress={() => {
              setShowModal(!showModal);
            }}
          />
        </View>
      </Modal>

      {/* Bottom Sheet */}
      {/* {bulMarks.map((item, index) => {
        return ( */}
      <BottomSheet
        //BottomSheet이 보이도록 설정
        visible={visible}
        onBackButtonPress={() => setVisible(!visible)}
        onBackdropPress={() => setVisible(!visible)}
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.bottomNavigationView}>
          <ScrollView style={styles.scrollView}>
            <Text
              style={{
                textAlign: "center",
                padding: 20,
                fontSize: 25,
              }}
            >
              {building.title}
            </Text>
            <Text
              style={{
                textAlign: "center",
                padding: 25,
                fontSize: 20,
              }}
            >
              {building.description1}
              {"\n"} {building.description2}
              {"\n"} {building.description3}
            </Text>
            {/* {console.log(building.title)}
            {console.log(building.description)} */}
            {/* boardId 사용하여 해당 게시판으로 이동 */}
            <Button
              title="게시판으로 이동"
              onPress={(params) => {
                // 전체 게시판
                if (params.boardId == "All") {
                  navigation.navigate("AllBoard", {
                    boardId: params.boardId,
                    boardTitle: params.title,
                    starUsers: params.starUsers,
                  });
                }
                // 건물 게시판
                else {
                  navigation.navigate("Board", {
                    boardId: params.boardId,
                    boardTitle: params.title,
                    starUsers: params.starUsers,
                  });
                }
              }}
            ></Button>
          </ScrollView>
        </View>
      </BottomSheet>
      {/* );
      })} */}
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
