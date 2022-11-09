import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Alert, Dimensions, Text } from "react-native";

//import DrawerNav from "./DrawerNav";

import {
  Home,
  Map,
  Notice,
  EmerBoard,
} from "../screens";
import Navigation from ".";

const Stack = createStackNavigator();

//로그인 Yes 화면
const MainStack = () => {
  //const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
    // MainDrawer으로 수정
      initialRouteName="Home"
      screenOptions={{
        cardStyle: { 
            backgroundColor: 'white' 
        },
        headerShown: false,
      }}
    >
        
      {/* <Stack.Screen name="Main" component={DrawerNav} /> */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notice" component={Notice} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="EmerBoard" component={EmerBoard} />
     
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