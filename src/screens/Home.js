import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Image, Button } from '../components';
import { TouchableOpacity, View, Dimensions, Modal, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DB, getCurUser } from '../firebase';
import { collectionGroup, query, where, getDocs, onSnapshot, orderBy, limit, getDoc, doc, updateDoc } from "firebase/firestore";

const Container = styled.SafeAreaView`
  flex : 1;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: black;
`;

const compoWidth = Dimensions.get('window').width - 20 * 3;

const StyledCompo_w = styled.View`
  background-color: white;
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  width: ${compoWidth}px;
  height: 110px;
`;

const StyledCompo_g = styled.View`
background-color: #EDEDED;
border-radius: 5px;
width: ${compoWidth}px;
height: 100px;
`;

const CompoHeader = styled.View`
  height: 30px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: ${({ theme }) => theme.errText};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`;


const Home = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const curUser = getCurUser();
  
  // 마운트될 때 동작 
  // useEffect(() => {

  // }, []);


  return (
    <Container>

      {/* 공지사항 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Notice')}
        activeOpacity={0.8}>
        <StyledCompo_g style={{ borderColor: theme.ewha_green }}>
          <CompoHeader style={{ backgroundColor: theme.d_btnBgColor }}>
            <StyledText style={{ color: 'white', flex: 6, fontSize: 17, fontWeight: 'bold' }}>공지사항</StyledText>
          </CompoHeader>
          {/* 내용 */}
          <View style={{  }}></View>
        </StyledCompo_g>
      </TouchableOpacity>
      

      {/* 지도 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Map')}
        activeOpacity={0.8}
        style={{
          backgroundColor: 'transparent',
          // 그림자
          //iOS
          shadowColor: "#000000", 
          shadowOpacity: 0.1,
          shadowRadius: 7,
          shadowOffset: { width: 2, height: 2 }, 
          //Android
          elevation: 5,
        }}
        >
        <Image
          url='https://i.imgur.com/thtIImL.jpg'
          containerStyle={{
            width: (Dimensions.get('window').width) - 20 * 3,
            height: 160,
            resizeMode: 'stretch',
            borderRadius: 5,
            opacity: 0.7,
          }} />
        <TouchableOpacity
          // 지도 보기 버튼
          onPress={ ()=>
            navigation.navigate('Map')
          }
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.d_btnBgColor,
            width: 110,
            padding: 8,
            marginTop: 0,
            borderRadius: 5,
            position: 'absolute',
            bottom: 10,
            left: (((Dimensions.get('window').width) - 20 * 3) / 2)-(120/2),
          }}
          >
          <Text style={{
            fontSize: 17,
            color: 'white',
            fontWeight: '600',
          }}>캠퍼스 지도</Text>
          </TouchableOpacity>
      </TouchableOpacity>

      {/*긴급 게시판*/}
      <TouchableOpacity
        onPress={() => navigation.navigate('EmerBoard')}
        activeOpacity={0.8}>
        <StyledCompo_w>
          <CompoHeader>
            <StyledText style={{ color: 'white', flex: 6, fontSize: 17, fontWeight: 'bold' }}>긴급 게시판</StyledText> 
          </CompoHeader>
           {/* 내용 */}
           <View style={{  }}></View>
        </StyledCompo_w>
      </TouchableOpacity>

      {/*즐겨찾기 게시판*/}
      <TouchableOpacity
        onPress={() => {navigation.navigate('BoardList')}}
        activeOpacity={0.8}>
        <StyledCompo_w style={{height: 160}}>
          <CompoHeader style={{ backgroundColor: theme.d_btnBgColor }}>
            <StyledText style={{ color: 'white', flex: 6, fontSize: 17, fontWeight: 'bold' }}>즐겨찾는 게시판</StyledText>
          </CompoHeader>
          {/* 내용 */}
          <View style={{  }}></View>
        </StyledCompo_w>
      </TouchableOpacity>
    </Container>
  );
}


export default Home;