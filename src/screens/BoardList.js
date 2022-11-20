import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { Button } from '../components';
import { TouchableOpacity, Text, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {DB, getCurUser} from '../firebase';
import { collection, getDoc, onSnapshot, query, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";


const {width} = Dimensions.get('window');

//--item--
// item container
const ItemContainer = styled.TouchableOpacity`
  width: ${width-30}px;
  height: 55px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: green;
  border-radius: 10px;
  margin: 0 10px;
  margin-top:20px;
`;
// item text
const ItemTitle =styled.Text`
  font-size: 18px;
  color: white;
  padding: 0 20px;
`;


//item 컴포넌트
const Item= React.memo( 
  ({item: {boardId, title, starUsers}, onPress}) => {
  const theme=useContext(ThemeContext);
  const curUser=getCurUser();

  return (
    <ItemContainer
    onPress={()=> onPress({boardId, title})}
    >
      {/* 해당 board의 starUsers에 가서 확인하고 uid 있으면 진한 하트 렌더링 */}
      {
        ((starUsers.indexOf(curUser.uid))!=(-1))?
        <Ionicons 
        name="heart" 
        size={25}
        style={{
          marginLeft: 20,
          marginRight: 10,
        }}
        color='white'
        onPress={ () => {
          // 해당 board의 starUsers 배열에 가서 uid 삭제
          const arrRef = doc(DB, 'boards', `${boardId}`);
          updateDoc(arrRef, {
            starUsers: arrayRemove(`${curUser.uid}`)
          });
        }}/>
        :
        <Ionicons 
        name="heart-dislike-outline" 
        size={25}
        style={{
          marginLeft: 20,
          marginRight: 10,
        }}
        color='white'
        onPress={ () => {
          // 해당 board의 starUsers 배열에 가서 uid 추가
          const arrRef = doc(DB, 'boards', `${boardId}`);
          updateDoc(arrRef, {
            starUsers: arrayUnion(`${curUser.uid}`)
          });
        }}/> 
      }
      <ItemTitle>{title}</ItemTitle>
      <Ionicons 
        name='chevron-forward-outline'
        size={23}
        style={{
          marginHorizontal: 15
        }}
        color='white'
      />
    </ItemContainer>
  )
});


//--main--
const Container = styled.View`
  flex : 1;
  background-color: white;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: black;
`;


const BoardList = ({navigation})=> {
  const theme=useContext(ThemeContext);


  //게시판 목록 배열 상태변수
  const [boards, setBoards] =useState([]);


  // 마운트 될 때 동작
  // board collection 모든 문서 불러오기 
  useEffect(()=>{
    const q = query(collection(DB, "boards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
          list.push(doc.data());
      });
      //boards 변수 업데이트
      setBoards(list);
    });
    
    return ()=> unsubscribe();
  }, []);

  return (
    <Container>
      <FlatList 
      data={boards}
      renderItem={({item})=> 
        <Item 
        item={item} 
        //클릭하면 params(id,title) 주면서 Board로 이동
        onPress={params=>{
          navigation.navigate('Board', {boardId: params.boardId, boardTitle: params.title});
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