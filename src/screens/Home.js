import React, { useState } from 'react';
import styled from 'styled-components';
import {Text, Button} from 'react-native';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;


export default function Home({navigation}) {

  return (
    <Container>
      
      <Text>Home</Text>

      <Button 
      title='공지사항' 
      onPress={()=> navigation.navigate('Notice')}/>
      <Button 
      title='지도' 
      onPress={()=> navigation.navigate('Map')}/>
      <Button 
      title='게시판 목록' 
      onPress={()=> navigation.navigate('BoardList')}/>
      <Button 
      title='긴급 게시판' 
      onPress={()=> navigation.navigate('EmerBoard')}/>
      <Button 
      title='게시판' 
      onPress={()=> navigation.navigate('Board','Art')}/>
      
    </Container>
  );
};

