import React, { useState, useEffect, useRef, useLayoutEffect, useContext  } from 'react';
import styled from 'styled-components';
import {Text, Button, View} from 'react-native';
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
  align-items: flex-start;
  padding: 10px 40px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  color: ${ ({theme}) => theme.d_btnBgColor};
  font-weight: bold;
  background-color: transparent;
  padding-vertical: 20px;
`;




//기간 설정 화면
export default function SetDay({navigation, route}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] =  useState('');


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
const uploadPost =  async (start, end)=>{
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
      startDate: start, 
      endDate: end,
    });

    await uploadImage(route.params.image, postId);

    // 전체 게시판
    if(route.params.boardId=='All'){
      navigation.navigate('AllBoard',{boardId: route.params.boardId, boardTitle: route.params.boardTitle, starUsers: route.params.starUsers});
    }
    // 건물 게시판
    else{
    // 해당 board로 다시 이동
    navigation.navigate('Board',{boardId: route.params.boardId, boardTitle: route.params.boardTitle, starUsers: route.params.starUsers});
    }
    
  }
    // 업로드 실패
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
    headerRight: ()=> {
      return (
        <TouchableOpacity 
        onPress={ ()=> {
        // boardId 있으면 게시물 - 업로드 함수 호출, 장애물은 params 전달하며 이어서
        (route.params.boardId)? 
        uploadPost(startDate, endDate):
        navigation.navigate('SetBoard', {
          title: route.params.title, 
          content: route.params.content, 
          isEmer: route.params.isEmer, 
          image: route.params.image, 
          lat: route.params.lat, 
          long: route.params.long, 
          startDate: startDate, 
          endDate: endDate});
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
            width: '100%',
            marginTop: 15,
            marginBottom: 30,
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
            width:'100%',
            marginTop: 15,
            marginBottom: 30,
          }}
          date={endDate} //초기값
          mode="date" 
          placeholder="종료 날짜 선택"
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
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={()=>{
              // 기간을 빈 문자열로 설정
              setStartDate('');
              setEndDate('');
              
              // 빈 문자열 설정하여 페이지 이동 
              (route.params.boardId)? 
              uploadPost('', ''):
              navigation.navigate('SetBoard', {
                title: route.params.title, 
                content: route.params.content, 
                isEmer: route.params.isEmer, 
                image: route.params.image, 
                lat: route.params.lat, 
                long: route.params.long, 
                startDate: '', 
                endDate: ''
              });
            }}
          >
            <StyledText
              style={{fontSize: 16, fontWeight: 'normal', textDecorationLine: 'underline',}}
            >&gt;&gt;  기간 설정 건너뛰기</StyledText>
          </TouchableOpacity>
        </View>
      
    </Container>
  );
};

