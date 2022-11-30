import React, {useContext} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import styled, { ThemeContext } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Image, Button } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Text} from 'react-native';
import {
  Home, 
  Notice,  
  Profile, 
  MyPoint, 
  Settings, 
  FindPw,
  MyPost
} from '../screens';

const Drawer = createDrawerNavigator();


export default function MainDrawer() {
  const theme=useContext(ThemeContext);
  return (
    <Drawer.Navigator 
    initialRouteName='Home'
    backBehavior='order'

    
    screenOptions={{
      //header 설정
      headerTitleStyle: {
        fontSize: 20,
        color: theme.headerTitle,
        fontWeight: 'bold',
      },
      headerTintColor: theme.headerGrey,
      headerTitleAlign: 'left',
      headerBackTitleVisible: false,
      headerShadowVisible: true,

      //메뉴 설정
      drawerActiveTintColor: theme.headerTitle,
      drawerActiveBackgroundColor :'white',  
      drawerInactiveTintColor: 'black',
      drawerLabelStyle: {fontSize: 20, marginLeft: 5, fontWeight: 'bold'}
    }}>
        
    {/* screens */}
      <Drawer.Screen 
      name='Home' 
      component={Home} 
      options={({navigation})=>({
        drawerLabel: '홈',
        title: 'BF campus',
        headerTitleStyle: {
          fontSize: 22,
          color: theme.headerTitle,
          fontWeight: 'bold',
        },
        // 포인트 버튼
        headerRight: ()=> (
          <TouchableOpacity
          style={{
            backgroundColor: '#EDEDED', 
            width: 35, 
            height: 35, 
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: '50%',
            marginRight: 20,
          }}
          onPress={()=> navigation.navigate('MyPoint')}
          >
            <Text style={{
              fontSize: 20, 
              fontWeight: 'bold',
              textAlign: 'center',
              color: theme.headerTitle
            }}>P</Text>
          </TouchableOpacity>
        )
      })}
     />
      <Drawer.Screen 
      name='Notice' 
      component={Notice} 
      options={{
        drawerLabel: '공지사항',
        title: '공지사항',
      }}/>
      <Drawer.Screen 
      name='Profile' 
      component={Profile} 
      options={{
        drawerLabel: '내 정보',
        title: '내 정보',
      }}/>
      <Drawer.Screen 
      name='MyPost' 
      component={MyPost} 
      options={{
        drawerLabel: '내가 쓴 글',
        title: '내가 쓴 글',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/>
      <Drawer.Screen 
      name='MyPoint' 
      component={MyPoint} 
      options={{
        drawerLabel: '포인트 현황',
        title: '포인트 현황',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/>
      <Drawer.Screen 
      name='Settings' 
      component={Settings} 
      options={{
        drawerLabel: '환경 설정',
        title: '환경 설정',
        drawerLabelStyle: {fontSize: 17, marginLeft: 10},
      }}/>
      <Drawer.Screen 
      name='FindPw' 
      component={FindPw} 
      options={{
        title: '비밀번호 재설정',
        drawerItemStyle: { height: 0 },
        headerShown: true
      }}/>
    </Drawer.Navigator>
  );
}