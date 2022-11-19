import {Text} from 'react-native';
import React, {useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { Button, ErrorMsg } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, View, Alert, ScrollView, Dimensions} from 'react-native';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';


const Container = styled.View`
  flex : 1;
  background-color: white;
  align-items: center;
  justify-content: flex-start; 
  padding: 10px 20px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: black;
  background-color: white;
  padding: 20px;
  line-height: 30px;
`;

const StyledInput = styled.TextInput`
  background-color: white;
  color: black;
  padding: 13px;
  font-size: 18px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 40px;
  margin-top: 20px;
`;


// 내용 작성 화면
export default function CreatePost({navigation, route}) {

  const theme=useContext(ThemeContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errMsg, setErrMsg] =useState('');
  const [disabled, setDisabled] = useState(true);
  const [isEmer, setIsEmer] = useState(false);

  const refContent = useRef(null);

  // const {spinner} = useContext(ProgressContext);

    //title 변경
    const _handleTitleChange = title => {
      setTitle(title);
      //빈 경우
      setErrMsg(title.trim() ? '' : '제목을 입력해주세요.')
    }
  
  
    //Content 변경
    const _handleContentChange = content => {
      setContent(content);
      //빈 경우
      setErrMsg(content.trim() ? '' : '내용을 입력해주세요.')
    }

    //사진 권한 요청 함수
    const photoPermission = async ()=> {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
          Alert.alert(
          'Photo Permission',
          'Please turn on the camera permission.'
          );
          navigation.goBack();
      }
    }


    //사진 접근 권한 요청하기
    useEffect(() => {
      photoPermission();
    }, []);

    //버튼 활성화 여부 업데이트
    useEffect(()=> {
      setDisabled(!(title && content&& !errMsg));
    }, [title, content, errMsg])


    //header
    useLayoutEffect(()=>{
      navigation.setOptions({
        headerLeft: ({onPress}) => {
          return (
            <TouchableOpacity onPress={onPress}>
            <Text
            style={{
              fontSize: 18,
              color: theme.text,
              marginLeft: 15,
            }}
            >취소</Text>
            </TouchableOpacity>
          );
        },
        headerRight: ()=> {
          return (
            <TouchableOpacity 
            onPress={ ()=> {
              // param이 없으면 장애물 - 화면 다르게 이동
              (route.params!==undefined)?
              navigation.navigate('AddImage', {boardId: route.params.id, title: title, content: content, isEmer: isEmer}):
              navigation.navigate('CreateMarker', {title: title, content: content, isEmer: isEmer});
            }}
            disabled={disabled}
            style={{
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 8,
              backgroundColor: theme.errText,
              marginRight: 10,
            }}
            >
            <Text
            style={{
              fontSize: 17,
              color: 'white',
            }}
            >다음</Text>
            </TouchableOpacity>
          );
        }
      })
    });


return (
  <ScrollView>
  <KeyboardAwareScrollView 
  contentContainerStyle={{flex: 1}}
  extraScrollHeight={20}>
  <Container>
    {/* 에러 메시지 */}
    <ErrorMsg msg={errMsg}/>

    {/* 안내 문구 */}
    <StyledText>
      {
`❕이용자님의 게시글은 누군가에게 매우 중요한 정보입니다. 모두에게 공개되는 만큼 게시글을 신중하게 작성하여 주시기 바랍니다. 
❕상황에 맞는 사진을 올려 주시면 더 유용하고 자세한 정보를 제공할 수 있습니다.`}
    </StyledText>

    {/* 제목 입력 */}
    <StyledInput 
    label='title' 
    value={title}
    onChangeText={_handleTitleChange}
    onSubmitEditing={()=>refContent.current.focus()}
    placeholder='제목 입력'
    returnKeyType='next'
    onBlur={()=> setTitle(title.trim())}
    maxLength={30}
    />

    {/* 내용 입력 */}
    <StyledInput 
    label='content' 
    value={content} 
    ref={refContent}
    onChangeText={_handleContentChange}
    placeholder='내용 입력'
    returnKeyType='done'
    onBlur={()=> setContent(content.trim())}
    multiline={true}
    style={{
      height: 200,
      maxHeight: 200,
      textAlignVertical: 'top',
    }}/>

    <Footer>
      {/* 긴급 체크 버튼 */} 
      <View style={{ 
        width: 60,
        height: 35,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 5,
        }}>
        <Checkbox
          value={isEmer}
          onValueChange={setIsEmer}
        />
        <Text style={{
          marginLeft: 12, 
          fontSize: 18, 
          color: theme.errText, 
          textAlign:'center', 
          fontWeight: 'bold'}}>긴급</Text>
      </View>
    </Footer>

  </Container>
  </KeyboardAwareScrollView>
  </ScrollView>
);
} 

