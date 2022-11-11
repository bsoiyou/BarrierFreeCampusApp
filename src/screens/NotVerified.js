import React, {useContext} from 'react';
import styled from 'styled-components';
import { Button } from '../components';
import { auth } from '../firebase';
import { sendEmailVerification } from "firebase/auth";
import {Alert} from 'react-native';
import {UserContext} from '../contexts';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: 25px;
  margin: 20px;
  padding: 10px;
`;


export default function NotVerified({navigation}) {

  // user 정보 업데이트 위해 불러옴
  const {setUser} = useContext(UserContext);
  
  //인증 메일 전송 
  const sendEmail = () => {
    sendEmailVerification(auth.currentUser);
    Alert.alert("이메일을 전송했습니다.");
  };

  //인증 여부 확인
  const isVerify = () => {
    auth.currentUser.reload();
    if(auth.currentUser.emailVerified) {
      Alert.alert("인증되었습니다.");
      setUser(userInfo.user);
      // 지우기
      console.log(auth.currentUser);
      //setUser로 수정  
      //navigation.navigate('Login');
    }
    else{
      Alert.alert("미인증 상태입니다. 메일을 전송했다면 버튼을 다시 한 번 눌러주세요.");
    }
  }

  return (
    <Container>
      <StyledText>아직 인증되지 않은 계정입니다.</StyledText>
      <Button 
      title='이메일 전송' 
      onPress={sendEmail}
      containerStyle={{
        padding: 15,
        marginTop: 0,
        marginBottom: 25,
        borderRadius: 30,
      }}
      textStyle={{
        fontSize: 20,
        fontWeight: '600',
      }}
      />
      <Button 
      title='인증 완료' 
      onPress={isVerify}
      containerStyle={{
        padding: 15,
        marginTop: 0,
        marginBottom: 25,
        borderRadius: 30,
      }}
      textStyle={{
        fontSize: 20,
        fontWeight: '600',
      }}
      />
    </Container>
  );
}