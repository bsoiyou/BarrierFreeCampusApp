import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Text, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex : 1;
  background-color: white;
`;


const Board = ({navigation, route})=> {
  const theme=useContext(ThemeContext);

  //header
  useLayoutEffect(()=>{
    navigation.setOptions({
      // board의 title을 전달받아 header title로 지정
      headerTitle : route.params.title,
      headerLeft: () => {
        return (
          // 뒤로 가기 버튼
          <Ionicons 
          name="chevron-back-outline" 
          size={30}
          style={{marginLeft:5,}}
          onPress={()=> navigation.goBack()}
          color='black'/> 
        );
      },
    })
  });


  return (
    <Container>
      {/* board id 출력 */}
      <Text>{route.params.id}</Text>
      <Button 
      title='글 쓰기' 
      onPress={()=> {
        // 글 쓰기 버튼 누르면 뜨는 선택 창 - 게시물이면 board id 전달 / 장애물이면 전달 x
        Alert.alert(
          "종류 선택",
          "게시물 / 장애물",
          [
            {
              text: "게시물",
              onPress: () => {navigation.navigate('CreatePost', route.params)},
            },
            { text: "장애물", onPress: () => navigation.navigate('CreatePost') }
          ],
        );
       }}
      />
    </Container>
  );
} 

export default Board;