import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';
//import Button from './Button';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default function MyPoint({navigation}) {

  return (
    <Container>
      {/* <Button 
      title='Sign up' 
      onPress={()=> navigation.navigate('Signup')}/> */}

      <Text>MyPoint</Text>
      
    </Container>
  );
};

