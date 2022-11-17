import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//장애물 게시판(건물) 설정 화면
export default function SetBoard({navigation, route}) {

  return (
    <Container>

      <Text>SetBoard</Text>

      <Button 
      title='완료' 
      onPress={()=> 
        // 완료되면 Map으로 이동
        navigation.navigate('Map')
      }/>
      
    </Container>
  );
};

