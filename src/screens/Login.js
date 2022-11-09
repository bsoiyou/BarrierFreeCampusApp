import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';
//import Button from './Button';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default function Login({navigation}) {

  return (
    <Container>
      

      <Text>Login</Text>

      <Button 
      title='인증 회원 로그인' 
      onPress={()=> navigation.navigate('Home')}/>
      <Button 
      title='미인증 회원 로그인' 
      onPress={()=> navigation.navigate('NotVerified')}/>
      <Button 
      title='회원가입' 
      onPress={()=> navigation.navigate('SignUp')}/>
      <Button 
      title='비밀번호 재설정' 
      onPress={()=> navigation.navigate('FindPw')}/>
      
    </Container>
  );
};

