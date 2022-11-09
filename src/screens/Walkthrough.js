import React, { useState } from 'react';
 import styled from 'styled-components';
 import AppIntroSlider from 'react-native-app-intro-slider';


 const W_Container = styled.View`
   flex: 1;
   align-items: center;
   justify-content: flex-start;
   padding: 50px 0;
   background-color: green;
 `;

 const W_Text = styled.Text`
   font-size: 25px;
   text-align: center;
   margin-bottom: 10px;
   font-weight: bold;
   color: white;
 `;

 const W_Image = styled.Image`
   width: 90%;
   height: 80%;
   margin-top: 20px;
   margin-bottom: 40px;
   background-color: 'white';
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
       />
     </>
   );
 }

 export default Walkthrough;



 const slides = [
   {
     key: 's1',
     title: 'Slide 1',
     /* text: '', */
     image: {
       // 이미지 경로 바꾸기
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
     },
     // backgroundColor: '#00462a',
   },
   {
     key: 's2',
     title: 'Slide 2',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
     },

   },
   {
     key: 's3',
     title: 'Slide 3',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
     },

   },
   {
     key: 's4',
     title: 'Slide 4',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
     },

   },
   {
     key: 's5',
     title: 'Slide 5',
     text: 'Enjoy Travelling on Bus with flat 100% off',
     image: {
       uri:
         'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
     },

   },
 ];