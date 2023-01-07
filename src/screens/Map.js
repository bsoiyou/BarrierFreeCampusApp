import React, { useState, useEffect, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  query,
  onSnapshot,
  GeoPoint,
  getGeoPoint,
  collectionGroup,
  document,
  where,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { DB } from "../firebase";
import { BottomSheet } from "react-native-btr";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { ThemeConsumer, ThemeContext } from "styled-components";

export default function Map({ navigation }) {
  const theme = useContext(ThemeContext);

  // BottomSheet
  const [visible, setVisible] = useState(false);
  const [building, setBuilding] = useState(["건물 정보"]);

  // // SearchBox
  // const [searchQuery, setSearchQuery] = React.useState("");
  // const onChangeSearch = (query) => setSearchQuery(query);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [marker, setMarker] = useState(["장애물 정보"]);

  // 장애물 Markers
  const [marks, setMarks] = useState([]);

  // markers collection에서 모든 문서 읽어와서 marks 배열에 저장
  useEffect(() => {
    const q = query(collection(DB, "markers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          title: doc.data().title,
          markerId: doc.data().markerId,
          postId: doc.data().postId,
          loc: new GeoPoint(doc.data().loc.latitude, doc.data().loc.longitude),
        });
      });
      setMarks(list);
    });
    return () => unsubscribe();
  }, []);

  {
    /* 여러 collection을 동시에 받거나, 
collection in collection의 경우 하위 collection의 이름이 동일하기만 하면 받아올 수 있는 방식이 안먹어서 부득이하게 이렇게 함. */
  }
  //게시판 목록 배열 상태변수
  const [boards, setBoards] = useState([]);
  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const list1 = [];
  const list2 = [];
  // 마운트 될 때 동작
  // board collection 모든 문서 불러오기
  useEffect(() => {
    {
      const q1 = query(collection(DB, "boards"));
      const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list1.push(doc.data());
        });
        //boards 변수 업데이트
        setBoards(list1);
        console.log("boards render완료");
      });
      loadPosts();

      return () => unsubscribe1();
      loadPosts();
    }
  }, []);

  // const list = [];
  // useEffect(() => {
  //   const q = query(collectionGroup(DB, "posts"), orderBy("createdAt", "desc"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     let ind = 0;
  //     querySnapshot.forEach((doc) => {
  //       list.push(doc.data());
  //       // 중복글인지 체크
  //       list.map((item) => {
  //         // post 하나씩 가져와서 제목이 같으면 list에서 pop
  //         if (item.title == doc.data().title && list.indexOf(item) !== ind) {
  //           list.pop();
  //           ind--;
  //         }
  //         if (item.markerId == null) {
  //           list.pop();
  //           ind--;
  //         }
  //       });
  //       ind++;
  //     });
  //     setPosts(list);
  //     console.log("boards+posts render완료");
  //     console.log("posts : ", posts);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // const loadBoard = () => {
  //   {
  //     const q1 = query(collection(DB, "boards"));
  //     const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         list1.push(doc.data());
  //       });
  //       //boards 변수 업데이트
  //       setBoards(list1);
  //       console.log("boards render완료");
  //     });
  //     return () => unsubscribe1();
  //   }
  // };

  const loadPosts = () => {
    boards.map((item1) => {
      const q2 = query(
        collection(DB, "boards", item1.boardId, "posts"),
        orderBy("markerId")
      );

      const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          list2.push(doc.data());
        });
        //console.log(list);
        setPosts(list2);
        console.log("posts : ", posts);
      });
      return () => unsubscribe2();
    });
    {
      posts.map((item2) => {
        if (item2.markerId == marker.markerId) {
          setPost(item2);
          console.log("post : ", post);
        }
      });
    }
  };

  const loadPost = () => {
    console.log("=========================================");
  };
  // useEffect(() => {
  //   {
  //     boards.map((item1) => {
  //       const q2 = query(
  //         collection(DB, "boards", item1.boardId, "posts"),
  //         orderBy("markerId")
  //       );

  //       const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           list2.push(doc.data());
  //         });
  //         //console.log(list);
  //         setPosts(list2);
  //         console.log("posts : ", posts);
  //       });
  //       return () => unsubscribe2();
  //     });
  //   }
  //   {
  //     posts.map((item2) => {
  //       if (item2.markerId == marker.markerId) {
  //         setPost(item2);
  //         console.log("post : ", post);
  //       }
  //     });
  //   }
  // }, []);

  // // 장애물 posts를 받아올 변수 설정.
  //const [post, setPost] = useState([]);
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   {
  //     const q = query(
  //       //collection(DB, "boards", "Art", "posts"),
  //       //collection(DB, "boards", item.boardId, "posts"),
  //       collectionGroup(DB, "posts"),
  //       orderBy("markerId")
  //     );
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const list = [];
  //       querySnapshot.forEach((doc) => {
  //         list.push(doc.data());
  //       });
  //       setPosts(list);
  //       console.log("posts : ", posts);
  //     });
  //     return () => unsubscribe();
  //   }
  // }, []);

  // 건물 Markers
  const [bulMarks, setBulMarks] = useState([]);
  //boards collection에서 모든 문서 읽어와서 marks 배열에 저장
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
          starUsers: doc.data().starUsers,
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
          latitudeDelta: 0.01,
          longitudeDelta:
            0.01 *
            (Dimensions.get("window").width / Dimensions.get("window").height),
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
                latitude: item.loc.latitude,
                longitude: item.loc.longitude,
              }}
              title={`${index + 1}` + "번 장애물"}
              // description="Marker sample"
              onPress={() => {
                setShowModal(!showModal);
                setMarker(item);
                //loadBoard();
                loadPosts();
                loadPost();
              }}
            >
              <AntDesign name="warning" size={24} color="#D30000" />
            </Marker>
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
            >
              <FontAwesome5 name="building" size={24} color="#AAAAAA" />
            </Marker>
          );
        })}
      </MapView>

      {/* 장애물 제보 버튼 */}
      <TouchableOpacity
        onPress={() => navigation.navigate("CreatePost")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.errText,
          width: 110,
          padding: 10,
          borderRadius: 20,
          position: "absolute",
          bottom: "7%",
          right: 20,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "white",
            fontWeight: "bold",
          }}
        >
          장애물 제보
        </Text>
      </TouchableOpacity>

      {/* //Map 화면 전환 버튼
      <View
        style={{
          position: "absolute",
          bottom: "5%",
          left: "5%",
          //alignSelf: "center",
          backgroundColor: "#00462A",
          borderRadius: 25,
        }}
      >
        <Button
          style={{}}
          title="←"
          onPress={() => navigation.navigate("Map2")}
          color="#fff"
        />
      </View> */}

      {/* bottom sheet으로 건물 보이는 거랑 장애물 보이는 거 동시에 연동하는게 힘들어서 장애물은 modal을 사용해보려고 함. */}
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        {/* 장애물 정보 : Modal 창 내에서 보일것들*/}
        {/*Animation can be slide, slide, none*/}
        <View style={styles.modal}>
          {/* <Text style={styles.text}>{marker.markerId}</Text> */}
          <Text style={styles.modalText}>
            해당 장애물에 대해{"\n"} 더 알아보시겠습니까?{"\n"}
          </Text>
          {/* 게시글 확인 버튼 */}
          <TouchableOpacity
            onPress={() => {
              setShowModal(!showModal);
              // {
              //   posts.map((item) => {
              //   // <Marker
              //   //   key={index}
              //   //   coordinate={{
              //   //     latitude: item.loc.latitude,
              //   //     longitude: item.loc.longitude,
              //   //   }}
              //   //   title={item.title}
              //   //   onPress={() => {
              //   //     setVisible(!visible);
              //   //     setBuilding(item);
              //   //   }}
              //   // >
              //   //   <FontAwesome5 name="building" size={24} color="#AAAAAA" />
              //   // </Marker>
              //   if (item.id == marker.markerId) {
              //     setPost(item);
              //     console.log("post : ", post);
              //   }
              // });
              // }

              //loadBoard();
              //loadPosts();
              loadPost();
              console.log(marker.postId);
              console.log(post.id);
              if (toString(marker.markerId) == toString(post.id)) {
                navigation.navigate("MarkerPost", {
                  //marker,
                  // markerId: marker.markerId,
                  createdAt: post.createdAt,
                  endDate: post.endDate,
                  postId: post.id,
                  image: post.image,
                  isEmer: post.isEmer,
                  markerId: post.markerId,
                  startDate: post.startDate,
                  title: post.title,
                  boardTitle: "장애물",
                  // starUsers: marker.starUsers,
                });
              } else {
                alert("해당 게시물을 확인할 수 없습니다.");
              }
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.d_btnBgColor,
              width: 220,
              padding: 15,
              marginTop: 30,
              borderRadius: 10,
              marginBottom: 150,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "600",
              }}
            >
              장애물 게시글 확인하기
            </Text>
          </TouchableOpacity>

          {/* 지도로 돌아가기 버튼 */}
          <TouchableOpacity
            onPress={() => {
              setShowModal(!showModal);
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              width: 200,
              marginTop: 50,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: theme.greenText,
                fontWeight: "bold",
              }}
            >
              지도로 돌아가기
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* 건물 정보 : Bottom Sheet */}
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
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* 건물 이름 */}
            <Text
              style={{
                textAlign: "center",
                fontSize: 26,
                color: "black",
                fontWeight: "bold",
                marginTop: 30,
              }}
            >
              {building.title}
            </Text>
            {/* 건물 설명 */}
            <Text
              style={{
                textAlign: "center",
                margin: 25,
                fontSize: 19,
                lineHeight: 40,
              }}
            >
              {building.description1}
              {"\n"} {building.description2}
              {"\n"} {building.description3}
            </Text>
            {/* 게시판 이동 버튼 */}
            <TouchableOpacity
              onPress={() => {
                setVisible(!visible);
                // 전체 게시판
                if (building.boardId == "All") {
                  navigation.navigate("AllBoard", {
                    boardid: "All",
                    boardTitle: building.title,
                    starUsers: building.starUsers,
                  });
                }
                // 건물 게시판
                else {
                  navigation.navigate("Board", {
                    boardId: building.boardId,
                    boardTitle: building.title,
                    starUsers: building.starUsers,
                  });
                }
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.d_btnBgColor,
                width: 200,
                padding: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                게시판으로 이동
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </BottomSheet>
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
    width: "90%",
  },
  text: {
    fontSize: 42,
  },
  modalText: {
    fontSize: 22,
    textAlign: "center",
    lineHeight: 40,
    fontWeight: "600",
    marginTop: 100,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
