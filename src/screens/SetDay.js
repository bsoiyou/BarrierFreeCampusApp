import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//기간 설정 화면
export default function SetDay({navigation, route}) {

  return (
    <Container>
      
      <Text>SetDay</Text>

      <Button 
      title='다음' 
      onPress={()=> {
        // param이 있으면 게시물 - 해당 board로 이동(완료), 장애물은 이어서
        (route.params!==undefined)?
        navigation.navigate('Board',route.params):
        navigation.navigate('SetBoard');
      }
      }/>
      
    </Container>
  );
};

