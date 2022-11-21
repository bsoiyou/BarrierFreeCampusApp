import React, { useState, useEffect, useRef, useLayoutEffect, useContext  } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';
import {createPost, getCurUser} from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage, DB} from "../firebase";
import { getFirestore, collection, addDoc, setDoc, doc,updateDoc  } from "firebase/firestore";
import DatePicker from 'react-native-datepicker';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, Alert, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: black;
  background-color: white;
  padding: 20px;
  line-height: 30px;
`;




//기간 설정 화면
export default function SetDay({navigation, route}) {
  const [startDate, setStartDate] = useState('01-01-2020');
  const [endDate, setEndDate] =  useState('11-01-2022');


  const theme=useContext(ThemeContext);


  // storage에 이미지 올리기
  const uploadImage = async (image_uri, postId)=> {

    const response = await fetch(image_uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `post/${postId}/photo.jpg`);

    uploadBytes(storageRef, blob).then((snapshot) => {
    
    // storage에서 img 값 불러오기
    getDownloadURL(storageRef)
    .then((url) => {
      const curDocRef = doc(DB, "boards", `${route.params.boardId}/posts/${postId}`);
      updateDoc(curDocRef, {
        image: url,
      });
    })  
    .catch((error) => {
      console.log(error.message);
    });
    
  });
}

//글 업로드 함수
const uploadPost =  async ()=>{
  try{

    //spinner 실행
    // spinner.start();

    //user 받기
    const curUser=getCurUser();

    // 함수 호출하여 db에 올리고 post id 받기
    const postId = await createPost({
      boardId: route.params.boardId, 
      title: route.params.title, 
      content: route.params.content,
      isEmer: route.params.isEmer, 
      image: route.params.image, 
      uid: curUser.uid, 
      startDate: startDate, 
      endDate: endDate,
    });

    await uploadImage(route.params.image, postId);

    // 해당 board로 다시 이동
    // board id랑 title 추가하기!
    navigation.navigate('Board',{boardId: route.params.boardId, boardTitle: route.params.boardTitle});
  }
    // 로그인 실패
    catch(err){
      console.log(err.message);
      Alert.alert("업로드 실패"); 
    }
    finally{
      // spinner 중지
      //spinner.stop();
    }
}


//header
useLayoutEffect(()=>{
  navigation.setOptions({
    headerLeft: ({onPress}) => {
      return (
        <TouchableOpacity onPress={onPress}>
        <Text
        style={{
          fontSize: 18,
          color: 'black',
          marginLeft: 15,
        }}
        >취소</Text>
        </TouchableOpacity>
      );
    },
    headerRight: ()=> {
      return (
        <TouchableOpacity 
        onPress={ ()=> {
        // boardId 있으면 게시물 - 업로드 함수 호출, 장애물은 params 전달하며 이어서
        (route.params.boardId)? 
        uploadPost():
        navigation.navigate('SetBoard', {title: route.params.title, content: route.params.content, isEmer: route.params.isEmer, image: route.params.image, lat: route.params.lat, long: route.params.long, startDate: startDate, endDate: endDate});
        }}
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
          color: 'white',
        }}
        >다음</Text>
        </TouchableOpacity>
      );
    }
  })
});
  return (
    <Container>
      
      <StyledText>시작일</StyledText>
      {/* date picker */}
      <DatePicker
          style={{
            width: 200,
            marginTop: 20,
          }}
          date={startDate} //초기값
          mode="date" 
          placeholder="시작 날짜 선택"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2025"
          confirmBtnText="확인"
          cancelBtnText="취소"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(startDate) => {
            setStartDate(startDate);
          }}
        />
        <StyledText>종료일</StyledText>
        {/* date picker */}
        <DatePicker
          style={{
            width: 200,
            marginTop: 20,
          }}
          date={endDate} //초기값
          mode="date" 
          placeholder="시작 날짜 선택"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2025"
          confirmBtnText="확인"
          cancelBtnText="취소"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(endDate) => {
            setEndDate(endDate);
          }}
        />
      
    </Container>
  );
};

