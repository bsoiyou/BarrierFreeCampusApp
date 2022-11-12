import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
//import {ThemeProvider} from 'styled-components';
//import {theme} from './theme';
import Navigation from './navigations';
//import { UserProvider, ProgressProvider } from './contexts';
import { UserProvider } from './contexts';
//import {Login} from './screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
//import { auth } from './firebase';



const App = () => {

  //firebase test
  //console.log(auth.currentUser);

  return (
    //<ThemeProvider theme={theme}>
      <SafeAreaProvider>
      {/* ProgressProvider */}
      {/* <ProgressProvider> */}

      {/* UserProvider */}
      <UserProvider>
        {/* 상태바 */}
        <StatusBar 
        backgroundColor='white'
        barStyle="dark-content"/>

        {/* 네비게이션 */}
        <Navigation />  
       
      </UserProvider>

     {/*</ProgressProvider>  */}
      </SafeAreaProvider>
    //</ThemeProvider>
  );
}

export default App;
