import React, { useState, useEffect, useRef, useLayoutEffect, useContext  } from 'react';
import styled from 'styled-components';
import {Text, Button, View,} from 'react-native';
import {createPost, getCurUser} from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage, DB} from "../firebase";
import { getFirestore, collection, addDoc, setDoc, doc,updateDoc  } from "firebase/firestore";
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, Alert, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] =  useState(new Date());
  // 모달 노출 여부 상태 변수
  const [visible, setVisible] = useState(false); 
  const mode='date';
  const [selectedDate, setSelectedDate] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const onPressDate = () => { // 날짜 클릭 시
    setVisible(true); // 모달 open
  };

  const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택 시
    setVisible(false); // 모달 close
    setStartDate(selectedDate); // 선택한 날짜 변경
  };

  const onCancel = () => { // 취소 시
    setVisible(false); // 모달 close
  };


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
    // <Container>
      
    //   <StyledText>시작일</StyledText>
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
      <Text>{`Date:  ${selectedDate? moment(selectedDate).format("MM/DD/YYYY"):"Please select date"}`}</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      </View>);
      {/* <TouchableOpacity
      onPress={onPressDate}
      >
        <Text>{new Date(startDate).toString()} </Text>
      </TouchableOpacity>
      
        {/* {visible && Platform.OS === 'ios' ?  
                    <DateTimePicker
                    style={{width: 320, backgroundColor: "white"}}
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={setStartDate}
                    testID="dateTimePicker"
                    // onConfirm={onConfirm}
                    // onCancel={onCancel}
                    date={startDate}
                    visible={visible}
                    /> */}
        {/* //             :
        //             // <DateTimePickerModal  */}
        {/* //             //   isVisible={visible}
        //             //   mode={mode}
        //             //   onConfirm={onConfirm}
        //             //   onCancel={onCancel}
        //             //   is24Hour={true}
        //             //   display="default"
        //             //   date={startDate} />
        // } */}
        
       
        <StyledText>종료일</StyledText>
        {/* date picker */}
        {/* <DateTimePicker
          style={{
            width:'100%',
            marginTop: 15,
            marginBottom: 30,
          }}
          value={endDate} //초기값
          mode="date" 
          dateFormat='day month'
          // minimumDate={new Date(2022, 12, 1)}
          // maximumDate={new Date(2025, 12, 31)}
          // placeholder="시작 날짜 선택"
          // format="DD-MM-YYYY"
          // confirmBtnText="확인"
          // cancelBtnText="취소"
          // customStyles={{
          //   dateIcon: {
          //     //display: 'none',
          //     position: 'absolute',
          //     left: 0,
          //     top: 4,
          //     marginLeft: 0,
          //   },
          //   dateInput: {
          //     marginLeft: 36,
          //   },
          // }}
          onChange={(endDate) => {
            setEndDate(endDate);
          }}
        /> */}
    //     <View style={{width: '100%'}}>
    //       <TouchableOpacity
    //         style={{alignItems: 'flex-end'}}
    //         onPress={()=>{
    //           // 기간을 빈 문자열로 설정
    //           setStartDate('');
    //           setEndDate('');
              
    //           // 빈 문자열 설정하여 페이지 이동 
    //           (route.params.boardId)? 
    //           uploadPost('', ''):
    //           navigation.navigate('SetBoard', {
    //             title: route.params.title, 
    //             content: route.params.content, 
    //             isEmer: route.params.isEmer, 
    //             image: route.params.image, 
    //             lat: route.params.lat, 
    //             long: route.params.long, 
    //             startDate: '', 
    //             endDate: ''
    //           });
    //         }}
    //       >
    //         <StyledText
    //           style={{fontSize: 16, fontWeight: 'normal', textDecorationLine: 'underline',}}
    //         >&gt;&gt;  기간 설정 건너뛰기</StyledText>
    //       </TouchableOpacity>
    //     </View>
      
    // </Container>
};

