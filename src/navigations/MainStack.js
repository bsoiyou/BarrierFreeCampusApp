import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Alert, Dimensions, Text } from "react-native";

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
  Post
} from "../screens";
import MainDrawer from "./MainDrawer";


const Stack = createStackNavigator();

//로그인 Yes 화면
const MainStack = () => {
  //const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="MainDrawer"
      screenOptions={{
        cardStyle: { 
            backgroundColor: 'white' 
        },
      }}
    >
        
      <Stack.Screen name="MainDrawer" 
      component={MainDrawer} 
      options={{headerShown: false}}/>
      <Stack.Screen name="Notice" component={Notice}/>
      <Stack.Screen name="Map" component={Map} 
      // Map은 무조건 뒤로가기하면 Home으로
      options={({ navigation }) => ({
        headerLeft: () => (
          <Ionicons 
            name="chevron-back-outline" 
            size={30}
            style={{marginLeft:5,}}
            onPress={()=> navigation.navigate('Home')}/> 
        ),
      })}
      />
      <Stack.Screen name="EmerBoard" component={EmerBoard} />
      <Stack.Screen name="BoardList" component={BoardList} />
      <Stack.Screen name="Board" component={Board} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="AddImage" component={AddImage} />
      <Stack.Screen name="CreateMarker" component={CreateMarker} />
      <Stack.Screen name="SetBoard" component={SetBoard} />
      <Stack.Screen name="SetDay" component={SetDay} />
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