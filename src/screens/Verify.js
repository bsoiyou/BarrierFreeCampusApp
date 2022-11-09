import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';
//import Button from './Button';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default function Verify({navigation}) {

  return (
    <Container>
      <Button 
      title='인증 성공' 
      onPress={()=> navigation.navigate('Login')}/> 

      <Text>Verify</Text>
      
    </Container>
  );
};

