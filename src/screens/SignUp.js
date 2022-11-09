import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';
//import Button from './Button';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default function SignUp({navigation}) {

  return (
    <Container>
      <Button 
      title='회원가입 완료 - 인증' 
      onPress={()=> navigation.navigate('Verify')}/> 

      <Text>SignUp</Text>
      
    </Container>
  );
};

