import React, {useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {Button, Input, ErrorMsg} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from 'react-native';
import {validateEmail, removeWhitespace} from '../util';
//import {UserContext, ProgressContext} from '../contexts';
import {auth, createUser, getCurUser} from '../firebase';

import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';


//styled components
const Container = styled.View`
  flex : 1;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 30px;
`;

const RowContainer = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  margin: 3px 0;
`;

const StyledText = styled.Text`
  font-size: 17px;
  color: black;
  width:100px;
  margin-right: 10px;
`;


const SignUp = ({navigation})=>{
  
  const refPw=useRef(null);
  const refPwCheck=useRef(null);
  const refNickname=useRef(null);
  const refDidMount = useRef(null);
  

  // user 정보 업데이트 위해 불러옴
  //const {setUser} = useContext(UserContext);
  
  //const {spinner} = useContext(ProgressContext);


  //상태 변수
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [nickname, setNickName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(true);


  //버튼 활성화 여부 설정
  useEffect(() => {
    setDisabled(!(nickname && email && pw && pwCheck && !errorMsg));
  }, [nickname, email, pw, pwCheck, errorMsg]);


  //에러 메시지 변경
  useEffect(() => {
    if(refDidMount.current){
      let error = '';
      if(!email) {error = '이메일을 입력해주세요';}
      else if(!validateEmail(email)) {error='올바른 이메일을 입력해주세요';}
      else if(pw.length<6) {error = '비밀번호를 6자 이상 입력해주세요';}
      else if(pw!==pwCheck) {error = '비밀번호를 확인해주세요';}
      else if(!nickname) {error = '닉네임을 입력해주세요';}
      else {error='';}
      setErrorMsg(error);
    }
    else{
      refDidMount.current =true;
    }
  }, [nickname, email, pw, pwCheck]);



  //회원가입하는 함수
  const _handleSignupBtnPress = async () => {
    
    //회원가입 성공
    try{
      //spinner 실행
      //spinner.start();
  
      //Signup 함수
      const newUser = await createUserWithEmailAndPassword(auth, email, pw);
      
      //nickname 저장
      await updateProfile(auth.currentUser, {displayName: nickname});

      
      
      //여기 수정하기 - User context
      //user 업데이트
      //setUser(newUser.user);

      // user 불러오기
      const curUser=getCurUser();

      // DB - users에 저장
      await createUser({
        uid: curUser.uid, 
        nickname: curUser.displayName, 
      });

      setEmail('');
      setPw('');
      setPwCheck('');
      setNickName('');

      //임시
      navigation.navigate('Verify');
    }

    // 회원가입 실패
    catch(err){
      switch (err.code) {
        case 'auth/email-already-in-use':
          Alert.alert('이미 가입한 계정입니다');
          break;
        default:
          console.log(err.message);
          Alert.alert("회원가입 실패");
      }
    }
    finally{
      //spinner 중지
      //spinner.stop();
    }
  }

  return (
    <KeyboardAwareScrollView extraScrollHeight={20}>
    <Container>

      {/* 이메일 */}
      <RowContainer>
        <StyledText>이메일</StyledText>
        {/* 이메일 입력칸 */}
        <Input
        style={{flex:1}}
        placeholder='이메일'
        returnKeyType='next'
        value={email}
        onChangeText={setEmail} 
        onSubmitEditing={()=> refPw.current.focus()}
        onBlur={()=> setEmail(removeWhitespace(email))}
        />
      </RowContainer>

      {/* 패스워드 */}
      <RowContainer>
        <StyledText>비밀번호</StyledText>
        {/* 패스워드 입력칸 */}
        <Input
        ref={refPw}
        label='비밀번호 입력'
        placeholder='비밀번호'
        returnKeyType='next'
        value={pw}
        onChangeText={setPw}
        isPassword={true}
        onSubmitEditing={()=> refPwCheck.current.focus()}
        onBlur={()=> setPw(removeWhitespace(pw))}
        />
      </RowContainer>

      {/* 패스워드 확인 */}
      <RowContainer>
        <StyledText>비밀번호 확인</StyledText>
        {/* 패스워드 확인 입력칸 */}
        <Input
        ref={refPwCheck}
        label='비밀번호 확인'
        placeholder='비밀번호 확인'
        returnKeyType='next'
        value={pwCheck}
        onChangeText={setPwCheck}
        isPassword={true}
        onSubmitEditing={()=>refNickname.current.focus()}
        onBlur={()=> setPwCheck(removeWhitespace(pwCheck))}
        />
      </RowContainer>

      {/* 닉네임 */}
      <RowContainer>
        <StyledText>닉네임</StyledText>
        {/* 닉네임 입력칸 */}
        <Input
        ref={refNickname}
        label='닉네임 입력'
        placeholder='닉네임'
        returnKeyType='done'
        value={nickname}
        onChangeText={setNickName} 
        onSubmitEditing={_handleSignupBtnPress}
        onBlur={()=> setNickName(nickname.trim())}
        maxLength={10}
        />
      </RowContainer>

      {/* 에러 메시지 */}
      <ErrorMsg msg={errorMsg}/>
      {/* 회원가입 버튼 */}
      <Button 
      title="회원가입" 
      onPress={_handleSignupBtnPress}
      disabled={disabled}
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
    </KeyboardAwareScrollView>
  );  
}

export default SignUp;

