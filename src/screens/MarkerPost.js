import React, { useLayoutEffect, useContext, useEffect } from "react";
import styled from "styled-components";
import { ThemeContext } from "styled-components";
import {
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { TimeStamp } from "../components";
import { getCurUser, DB } from "../firebase";
import {
  doc,
  deleteDoc,
  collectionGroup,
  query,
  where,
  getDocs,
  //collection,
} from "firebase/firestore";

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  background-color: white;
  color: black;
`;

const StyledInput = styled.TextInput`
  background-color: white;
  color: black;
  padding: 13px;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
`;

const StyledImg = styled.Image`
  width: ${Dimensions.get("window").width - 50}px;
  height: ${Dimensions.get("window").width - 50}px;
  border-radius: 10px;
  margin: 20px;
  margin-bottom: 100px;
`;

const HeaderText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 40px;
  padding: 0 10px;
`;

const HeaderInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding-top: 20px;
  //padding-horizontal: 10px; // 찾을 수 없다고 해서 주석 처리함.
`;

// postId가 Image정보를 담은 post.
// markerId가 개별 게시물 구분.

const MarkerPost = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);

  //user 불러오기
  const curUser = getCurUser();

  //삭제 함수
  const _handleDeleteBtnPress = async () => {
    Alert.alert("글 삭제", "정말로 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: async () => {
          // post 삭제
          // 컬렉션 그룹 - title 확인해서 삭제하기
          const q = query(
            collectionGroup(DB, "posts"),
            where("title", "==", route.params.title)
          );
          const data = await getDocs(q);
          // 여러 개 있으면 모두 삭제
          data.docs.map(async (item, index) => {
            await deleteDoc(data.docs[index].ref);
          });

          // marker 삭제
          await deleteDoc(doc(DB, "markers", `${route.params.markerId}`));

          // 화면 이동
          navigation.goBack();
        },
      },
    ]);
  };

  //header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "장애물",
      // 삭제 버튼
      headerRight: () => {
        return (
          route.params.uid == curUser.uid && (
            <TouchableOpacity
              onPress={_handleDeleteBtnPress}
              style={{
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: theme.errText,
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  color: "white",
                }}
              >
                삭제
              </Text>
            </TouchableOpacity>
          )
        );
      },
    });
  });

  //   useEffect(() => {
  //     const q = query(collection(DB, "markers"));
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       const list = [];
  //       querySnapshot.forEach((doc) => {
  //         list.push(doc.data());
  //       });
  //       //boards 변수 업데이트
  //       //setBoards(list);
  //     });

  //     return () => unsubscribe();
  //   }, []);

  return (
    <ScrollView>
      <Container>
        {/* 제목 */}
        <StyledInput
          label="title"
          value={route.params.title}
          editable={false}
        />

        {/* 내용 */}
        <StyledInput
          label="desc"
          value={route.params.content}
          multiline={true}
          style={{
            height: 300,
            maxHeight: 300,
            textAlignVertical: "top",
          }}
          editable={false}
        />

        {/* 이미지 */}
        <StyledImg source={{ uri: route.params.image }} />
      </Container>
    </ScrollView>
  );
};

export default MarkerPost;
