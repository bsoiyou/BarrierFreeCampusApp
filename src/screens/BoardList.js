import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Button } from '../components';
import { TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DB, getCurUser} from '../firebase';
import { collection, getDoc, orderBy, onSnapshot, query, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";


const {width} = Dimensions.get('window');

//--item--
// item container
const ItemContainer = styled.TouchableOpacity`
  width: ${width-20}px;
  height: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
`;
// item text

const ItemBoardText =styled.Text`
  font-size: 19px;
  color: ${({theme})=>theme.greenText};
  font-weight: bold;
  padding-left: 20px;
  padding-right: 10px;
  flex: 4;
`;

const ItemPostText =styled.Text`
  font-size: 17px;
  color: ${({theme})=>theme.lstContent};
  flex: 5;
  padding-right: 15px;
`;

const ItemIconText =styled.Text`
  font-size: 19px;
  color: ${({theme})=>theme.errText};
  font-weight: bold;
  flex: 1;
`;


//item 컴포넌트
// posts를 인자로 받아서 boardId마다 content를 출력 (undefined는 빈 칸)
const Item= React.memo( 
  ({item: {boardId, title, starUsers}, onPress}) => {
  const theme=useContext(ThemeContext);
  const curUser=getCurUser();

  return (
    <ItemContainer
    onPress={()=> onPress({boardId, title, starUsers})}
    >
      <ItemBoardText>{title}</ItemBoardText>
      <ItemPostText>s</ItemPostText>
      <ItemIconText>N</ItemIconText>
    </ItemContainer>
  )
});


//--main--
const Container = styled.View`
  flex : 1;
  background-color: white;
  padding-vertical: 30px;
`;


const BoardList = ({navigation})=> {
  const theme=useContext(ThemeContext);


  //게시판 목록 배열 상태변수
  const [boards, setBoards] =useState([]);
  const [posts, setPosts] = useState({});


  // 마운트 될 때 동작
  // board collection 모든 문서 불러오기 
  useEffect(()=>{
    
    let post_list={};

    const q = query(collection(DB, "boards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const board_list = [];

      querySnapshot.forEach((doc) => {
          board_list.push(doc.data());
      });
      //boards 변수 업데이트
      setBoards(board_list);
      
      boards.map((item)=> {
        const q2 = query(collection(DB, "boards", `${item.boardId}/posts`), orderBy('createdAt', 'desc'));
        onSnapshot(q2, (querySnapshot) => {
          const lst=[];
          querySnapshot.forEach((doc) => {
            lst.push(doc.data().title);
          });
          post_list[item.boardId]=lst[0];
        });
      });

      setPosts(post_list);
      //console.log(posts);
      // 목록 잘 출력됨
    });
    
    return ()=> unsubscribe();
  }, []);

  console.log(posts);
  //출력 안됨 - 해결하기!!

  return (
    <Container>
      <FlatList 
      data={boards}
      renderItem={({item})=> 
        <Item 
        item={item} 
        //클릭하면 params(id,title) 주면서 Board로 이동
        onPress={params=>{
          navigation.navigate('Board', {boardId: params.boardId, boardTitle: params.title, starUsers: params.starUsers});
        }}
        />
      }
      keyExtractor={item=>item['boardId']}
      windowSize={5}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      />
    </Container>
  );
} 

export default BoardList;