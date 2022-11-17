import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//장애물 위치 설정 화면
export default function CreateMarker({navigation}) {

  return (
    <Container>
      
      <Text>CreateMarker</Text>

    {/* 설정한 위치 인자 줘야 함 - 수정 */}
      <Button 
      title='다음' 
      onPress={()=> navigation.navigate('SetDay')}/>
      
    </Container>
  );
};

