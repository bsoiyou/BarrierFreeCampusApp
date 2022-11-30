import React, { useState } from 'react';
import styled from 'styled-components';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, View, Text } from "react-native";
import { theme } from '../theme';

 const W_Container = styled.View`
   flex: 1;
   align-items: center;
   justify-content: flex-start;
   padding: 50px 0;
   background-color: white;
 `;

 const W_Text = styled.Text`
   font-size: 27px;
   text-align: center;
   margin-vertical: 20px;
   font-weight: bold;
   color: ${({ theme })=> theme.greenText};
 `;

 const W_Image = styled.Image`
   width: 85%;
   height: 70%;
   margin-top: 20px;
   margin-bottom: 40px;
   background-color: ${({ theme })=> theme.imgBg};
 `;


 const Walkthrough = ({navigation}) => {

   // const [showRealApp, setShowRealApp] = useState(false);

   const onDone = () => {
     // setShowRealApp(true);
     navigation.reset( { routes:[ {name: 'Login'} ] } );
   };

   const onSkip = () => {
     // setShowRealApp(true);
     navigation.reset( { routes:[ {name: 'Login'} ] } );
   };

   const RenderItem = ({ item }) => {
     return (
       <W_Container>
         <W_Text>{item.title}</W_Text>
         <W_Image source={item.image} />
       </W_Container>
     );
   };

   // 다음, 건너뛰기 버튼
   const _renderButton = (text) => {
    return (
      <Text
      style={{
        color: theme.greenText,
        fontSize: 19,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      >{text}</Text>
    );
  };

   return (
     <>
       {/* {showRealApp ? (
         <>
         {/* 내비게이션 
         <Navigation />
         </>
       ) : ( */}

       {/* Walkthrough */}
       <AppIntroSlider
         data={slides}
         renderItem={RenderItem}
         onDone={onDone}
         showSkipButton={true}
         onSkip={onSkip}
         renderNextButton={()=>_renderButton('다음')}
         renderSkipButton={()=>_renderButton('건너뛰기')}
         renderDoneButton={()=>_renderButton('완료')}
       />
     </>
   );
 }

 export default Walkthrough;



 const slides = [
   {
     key: 's1',
     title: '가이드라인',
     /* text: '', */
     image: {
       // 이미지 경로 바꾸기
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
     },
   },
   {
     key: 's2',
     title: '가이드라인',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
     },
   },
   {
     key: 's3',
     title: '가이드라인',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
     },

   },
   {
     key: 's4',
     title: '가이드라인',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
     },

   },
   {
     key: 's5',
     title: '가이드라인',
     text: 'Enjoy Travelling on Bus with flat 100% off',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
     },

   },
 ];