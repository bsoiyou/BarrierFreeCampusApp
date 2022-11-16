import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Text } from 'react-native';
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
          <Ionicons 
          name="chevron-back-outline" 
          size={30}
          style={{marginLeft:5,}}
          onPress={()=> navigation.navigate('BoardList')}
          color='black'/> 
        );
      },
    })
  });


  return (
    <Container>
      {/* board id 출력 */}
      <Text>{route.params.id}</Text>
    </Container>
  );
} 

export default Board;