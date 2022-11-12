import React from 'react';
import styled from 'styled-components';
import {Text} from 'react-native';



const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default function Profile({navigation}) {

  return (
    <Container>

      <Text>Profile</Text>
      
    </Container>
  );
};

