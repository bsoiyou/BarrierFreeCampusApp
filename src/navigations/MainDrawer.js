import React, {useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Home, Notice, Map, EmerBoard, Board, Profile, MyPoint, Settings} from '../screens'; 
import styled, { ThemeContext } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Image, Button } from '../components';

const Drawer = createDrawerNavigator();


export default function MainDrawer() {
  const theme=useContext(ThemeContext);
  return (
    <Drawer.Navigator 
    initialRouteName='Home'
    backBehavior='order'
    
    screenOptions={{
      //배경색 지정
      cardStyle: {
        backgroundColor: theme.bgColor
      },
      
      //header 설정
      headerShadowVisible: false,
      headerTitleStyle: {
        fontSize: 20,
        color: theme.ewha_green,
      },
      headerTintColor: theme.ewha_green,
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,

      //메뉴 설정
      drawerActiveTintColor: theme.activeMenuText,
      drawerActiveBackgroundColor :theme.activeMenuBg,  
      drawerInactiveTintColor: theme.menuText,
      drawerLabelStyle: {fontSize: 20, marginLeft: 5, fontWeight: 'bold'}
    }}>
        
    {/* screens */}
      <Drawer.Screen 
      name='Home' 
      component={Home} 
      options={{
        drawerLabel: '홈',
        headerTitle:()=> {
          return (
            <Image
            url='https://i.imgur.com/qcXJOHK.png'
            containerStyle={{
              width: 200,
              height: 30,
              resizeMode: 'cover',
              // borderRadius: 15,
            }} />
          )
        }
      }}/>
      <Drawer.Screen 
      name='Notice' 
      component={Notice} 
      options={{
        drawerLabel: '공지사항',
        title: '공지사항',
      }}/>
      <Drawer.Screen 
      name='Map' 
      component={Map} 
      options={{
        drawerLabel: '지도',
        title: '지도',
      }}/>
      {/* <Drawer.Screen 
      name='BoardsList' 
      component={BoardsList} 
      options={{
        drawerLabel: '게시판',
        title: '게시판 목록'
      }}/> */}
      {/* <Drawer.Screen 
      name='MainBoard' 
      component={MainBoard} 
      options={{
        drawerLabel: '전체 글',
        title: '전체 글',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/> */}
      <Drawer.Screen 
      name='EmerBoard' 
      component={EmerBoard} 
      options={{
        drawerLabel: '긴급 게시판',
        title: '긴급 게시판',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/>
      <Drawer.Screen 
      name='Board' 
      component={Board} 
      options={{
        drawerLabel: '즐겨찾는 게시판 이름',
        title: '즐겨찾는 게시판 이름',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/>
      <Drawer.Screen 
      name='Profile' 
      component={Profile} 
      options={{
        drawerLabel: '내 정보',
        title: '내 정보'
      }}/>
      {/* <Drawer.Screen 
      name='MyPosts' 
      component={MyPosts} 
      options={{
        drawerLabel: '내가 쓴 글',
        title: '내가 쓴 글',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/> */}
      <Drawer.Screen 
      name='MyPoint' 
      component={MyPoint} 
      options={{
        drawerLabel: '포인트 현황',
        title: '포인트 현황'
      }}/>
      <Drawer.Screen 
      name='Settings' 
      component={Settings} 
      options={{
        drawerLabel: '환경 설정',
        title: '환경 설정'
      }}/>
    </Drawer.Navigator>
  );
}