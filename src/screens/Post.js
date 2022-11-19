import React, {useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, View, Alert, Dimensions, Text, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { TimeStamp } from '../components';
import {getCurUser} from '../firebase';



const Container = styled.View`
  flex : 1;
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

const StyledImg= styled.Image`
  width: ${Dimensions.get('window').width-50}px;
  height: ${Dimensions.get('window').width-50}px;
  border-radius: 10px;
  margin: 20px;
  margin-bottom: 100px;
`;

const HeaderText=styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 40px;
  padding: 0 10px;
`;


const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 40px;
  margin-top: 20px;
`;


const Post = ({navigation,route})=> {
  const theme=useContext(ThemeContext);
  
  //header
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle : route.params.title,
      // 뒤로 가기
      headerLeft: ({onPress}) => {
        return (
          <Ionicons 
          name="chevron-back-outline" 
          size={30}
          style={{marginLeft:5,}}
          onPress={onPress}
          color={theme.headerTitle}/> 
        );
      },
    })
  })

  //user 불러오기
  const curUser=getCurUser();

  // 삭제 버튼 함수
  //   const _handleDeleteBtnPress = async () => {
  //     Alert.alert(
  //         "글 삭제",
  //         "정말로 삭제하시겠습니까?",
  //         [
  //           {
  //             text: "취소",
  //             onPress: () => {},
  //             style: "cancel"
  //           },
  //           { text: "삭제", onPress: async () => {
  //             // 컬렉션 그룹 - id 지정해서 삭제하기
  //             const q = query(collectionGroup(DB, 'posts'), where('id', '==', route.params.id));
  //             const data=await getDocs(q);  
  //             await deleteDoc(data.docs[0].ref);
  //             // 화면 이동
  //             navigation.goBack();
  //           }}
  //         ],
  //       );  
  //   }

  return (

    <ScrollView>
    <Container>
      {/* 헤더 */}
      <HeaderText>
        <StyledText>익명의 이화인</StyledText>
        <StyledText style={{
          fontWeight: 'normal',
          fontSize: 15,
        }}>
          {TimeStamp(route.params.createdAt)}
          </StyledText>
      </HeaderText>
      
      {/* 제목 */}
      <StyledInput 
      label='title' 
      value={route.params.title}
      editable={false}
      />

      {/* 내용 */}
      <StyledInput 
      label='desc' 
      value={route.params.content} 
      multiline={true}
      style={{
        height: 300,
        maxHeight: 300,
        textAlignVertical: 'top',
      }}
      editable={false}
      />

      {/* 기간 추가하기 */}

      <Footer>
        {/* 긴급 체크 버튼 */} 
        <View style={{ 
          width: 60,
          height: 35,
          flexDirection: 'row', 
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: 5,
          }}>
          <Checkbox
            value={route.params.isEmer}
            disabled={true}
          />
          <Text style={{
            marginLeft: 12, 
            fontSize: 18, 
            color: theme.errText, 
            textAlign:'center', 
            fontWeight: 'bold'}}>긴급</Text>
        </View>
      </Footer>

      {/* 이미지 */}
      <StyledImg source={{ uri: route.params.image }} /> 
      
      {/* 
      { 
      ((route.params.uid) == (curUser.uid)) &&
        <TouchableOpacity
        // 삭제 버튼
        onPress={_handleDeleteBtnPress}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.bgColor,
          width: 100,
          padding: 10,
          marginTop: 0,
          position: 'absolute',
          bottom: 40,
          left: (Dimensions.get('window').width / 2)-(100/2),
        }}
        >
        <Text style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.mainRed,
        }}>글 삭제</Text>
        </TouchableOpacity> } */}
      
    </Container>
    </ScrollView>
  );
} 

export default Post;