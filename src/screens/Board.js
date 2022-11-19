import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { TimeStamp } from '../components';
import { TouchableOpacity, Text, FlatList, Dimensions, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DB} from '../firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Container = styled.View`
  flex : 1;
  background-color: white;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: black;
`;


//=-=- post item -=-=
// 컨테이너
const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${ ({theme}) => theme.lstBorder};
  padding: 20px 25px;
  padding-right: 15px;
`;
// 제목과 내용을 감싸는 컨테이너
const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
// 제목
const ItemTitle =styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

// 시간
const ItemTime = styled.Text`
  font-size: 14px;
  color: 'black';
  margin-right: 10px;
`;
// 아이콘
const ItemIcon = styled(Ionicons).attrs(({theme}) => ({
  name: 'chevron-forward-sharp',
  size: 22,
  color: 'black',
}))``;


//item 컴포넌트
const Item= React.memo(
  ({item: {title, content, createdAt, uid, isEmer, id, image}, onPress}) => {

  return (
    <ItemContainer onPress={()=> onPress({title, content, createdAt, uid, isEmer, id, image})}>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
      </ItemTextContainer>
      <ItemTime>{TimeStamp(createdAt)}</ItemTime>
      <ItemIcon />
    </ItemContainer>
  )
});
// =-=- -=-=-



const Board = ({navigation, route})=> {
  const theme=useContext(ThemeContext);

  //항목 목록 배열 상태 변수
  const [posts, setPosts] = useState([]);

  //header
  useLayoutEffect(()=>{
    navigation.setOptions({
      // board의 title을 전달받아 header title로 지정
      headerTitle : route.params.title,
      headerLeft: ({onPress}) => {
        return (
          <Ionicons 
          name="chevron-back-outline" 
          size={30}
          style={{marginLeft:5,}}
          onPress={onPress}
          color={theme.headerTitle}/> 
        );
      },
    })
  });

  
  // 마운트될 때 동작
  // 해당 board(인자로 받은 id)의 post collection에서 모든 문서 읽어오기
  useEffect(()=> {
    const q = query(collection(DB, "boards", `${route.params.id}/posts`), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setPosts(list);
    });
    return ()=> unsubscribe();
  }, []);

  return (
    <Container>
      <FlatList 
      data={posts}
      renderItem={({item})=> 
      <Item 
      item={item} 
      onPress={params=>{
        navigation.navigate('Post', params);
      }}
      />}
      keyExtractor={item=>item['id']}
      windowSize={5}
      />

      <TouchableOpacity
      // 글 쓰기 버튼
      onPress={()=> {
        // 글 쓰기 버튼 누르면 뜨는 선택 창 - 게시물이면 board id 전달 / 장애물이면 전달 x
        Alert.alert(
          "종류 선택",
          "게시물 / 장애물",
          [
            {
              text: "게시물",
              onPress: () => {navigation.navigate('CreatePost', route.params)},
            },
            { text: "장애물", onPress: () => navigation.navigate('CreatePost') }
          ],
        );
        }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.d_btnBgColor,
        width: 130,
        padding: 15,
        marginTop: 0,
        borderRadius: 30,
        position: 'absolute',
        bottom: 30,
        left: (Dimensions.get('window').width / 2)-(130/2),
      }}
      >
      <Text style={{
        fontSize: 20,
        color: 'white',
      }}>글 쓰기</Text>

      </TouchableOpacity>
    </Container>
  );
} 

export default Board;