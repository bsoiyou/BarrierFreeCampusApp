import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Alert, Dimensions, Text } from "react-native";
import { ThemeContext } from 'styled-components';

import {
  Map,
  Notice,
  BoardList,
  EmerBoard,
  Board,
  CreatePost,
  AddImage,
  CreateMarker,
  SetBoard,
  SetDay,
  Post,
  MyPoint,
} from "../screens";
import MainDrawer from "./MainDrawer";


const Stack = createStackNavigator();

//로그인 Yes 화면
const MainStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="MainDrawer"
      screenOptions={{
        headerTintColor: theme.headerTitle,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerShadowVisible: true,
        headerLeft: ({onPress}) => (
          <TouchableOpacity 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onPress}>
          <Ionicons 
            name="chevron-back-outline" 
            size={28}
            style={{
              marginHorizontal:5, 
              color: theme.headerTitle,
            }}
            /> 
          <Text style={{
            fontSize: 16, 
            alignSelf: 'center',
            color: theme.headerTitle,
          }}>뒤로 가기</Text>
          </TouchableOpacity>
        ),
      }}
    >
      {/* 화면 1 */}
      <Stack.Screen name="MainDrawer" 
      component={MainDrawer} 
      options={{headerShown: false}}/>

      {/* 화면 2 */}
      <Stack.Screen name="Notice" component={Notice}/>

      {/* 화면 3 */}
      <Stack.Screen name="Map" component={Map} 
      // Map은 무조건 뒤로가기하면 Home으로
      options={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          // Map은 무조건 뒤로가기하면 Home으로 
          onPress={()=> navigation.navigate('Home')}>
            <Ionicons 
              name="chevron-back-outline" 
              size={28}
              style={{
                marginHorizontal:5, 
                color: theme.headerTitle,
              }}
              /> 
            <Text style={{
              fontSize: 16, 
              alignSelf: 'center',
              color: theme.headerTitle,
            }}>뒤로 가기</Text>
          </TouchableOpacity>
        ),
      })}
      />

      {/* 화면 4 */}
      <Stack.Screen name="EmerBoard" 
      component={EmerBoard} 
      options={{
        headerTitle: '긴급 게시판',
      }}
      />

      {/* 화면 5 */}
      <Stack.Screen name="BoardList" 
      component={BoardList} 
      options={{
        headerTitle: '전체 게시판',
      }}/>

      {/* --- */}
      <Stack.Screen name="MyPoint" 
      component={MyPoint}
      />

      <Stack.Screen name="Board" 
      component={Board} 
      />
      <Stack.Screen name="CreatePost" 
      component={CreatePost} 
      options={{
        headerTitle: '글 쓰기',
      }}
      />
      <Stack.Screen name="AddImage" 
      component={AddImage} 
      options={{
        headerTitle: '사진 추가',
      }}/>
      <Stack.Screen name="CreateMarker" 
      component={CreateMarker} 
      options={{
        headerTitle: '위치 설정',
      }}/>
      <Stack.Screen name="SetBoard" 
      component={SetBoard} 
      options={{
        headerTitle: '게시판 설정',
      }}
      />
      <Stack.Screen name="SetDay" 
      component={SetDay} 
      options={{
        headerTitle: '기간 설정',
      }}
      />
      <Stack.Screen name="Post" component={Post} />
      
      {/* <Stack.Screen
        name="Board"
        component={Board}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="PostCreation"
        component={PostCreation}
        options={{
          headerTitle: "글 쓰기",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerShown: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold",
          },
          headerTintColor: theme.ewha_green,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
    /> */}

    </Stack.Navigator>
  );
};

export default MainStack;