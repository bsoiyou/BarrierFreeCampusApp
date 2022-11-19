import {Text} from 'react-native';
import React, {useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { Button, ErrorMsg } from '../components';
import { ThemeContext } from 'styled-components';
import { TouchableOpacity, View, Alert, Platform, ScrollView, Dimensions} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';


const Container = styled.View`
  flex : 1;
  background-color: white;
  align-items: center;
  justify-content: center; 
  padding: 10px 20px;
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: black;
  background-color: white;
  padding: 20px;
  line-height: 30px;
`;

const StyledImg= styled.Image`
  background-color: ${({ theme }) => theme.imgBg};
  width: ${Dimensions.get('window').width-100}px;
  height: ${Dimensions.get('window').width-100}px;
  border-radius: 10px;
`;


// 사진 추가 화면
export default function AddImage({navigation, route}) {

  const theme=useContext(ThemeContext);

  const [errMsg, setErrMsg] =useState('');
  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState(null);

  // const {spinner} = useContext(ProgressContext);


   //사진 버튼 클릭 - 이미지 선택
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


    //버튼 활성화 여부 업데이트
    useEffect(()=> {
    setDisabled(!image);
    }, [image])



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
            navigation.navigate('SetDay', {boardId: route.params.boardId, title: route.params.title, content: route.params.content, isEmer: route.params.isEmer, image: image});}}
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
  <Container>
    {/* 에러 메시지 */}
    <ErrorMsg msg={errMsg}/>

    {/* 안내 문구 */}
    <StyledText>
      사진을 추가해 주세요.
    </StyledText>

    {/* 이미지 */}
    <StyledImg source={{ uri: image }} />

    <TouchableOpacity
      // 카메라 버튼으로 수정
      onPress={pickImage}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: theme.imgBtn,
        width: 100,
        padding: 10,
        marginTop: 0,
        borderRadius: 30,
        position: 'absolute',
        bottom: 40,
        left: (Dimensions.get('window').width / 2)-(100/2),
      }}>
    <Text style={{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    }}>사진 수정</Text>
    </TouchableOpacity>

  </Container>
);
} 

