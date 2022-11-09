import React, {useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
//import {UserContext, ProgressContext} from '../contexts';
//import {Spinner} from '../components';



const Navigation = () => {
  //user 설정
  //const {user} = useContext(UserContext);
  
  //const {inProgress} = useContext(ProgressContext);

  return (
    //Navigation Container
    <NavigationContainer>

      {/* 로그인 여부에 따라 다른 화면 렌더링 */}
      {/* {user.uid ? <Main/> : <Auth />}   */}
      <AuthStack/>
      {/* <MainStack/> */}
      
      

      {/* 진행중이면 spinner 렌더링 */}
      {/* {inProgress && <Spinner/>} */}
    </NavigationContainer>
  );
}

export default Navigation;