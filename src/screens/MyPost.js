import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import styled, { ThemeContext }  from 'styled-components';
import { TouchableOpacity, Text, FlatList, Dimensions, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, arrayRemove, arrayUnion, collectionGroup, where, getDocs } from "firebase/firestore";
import {getCurUser, DB} from '../firebase';
import { Button, TimeStamp } from '../components';


const Container = styled.View`
  flex: 1;
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
// 정보 컨테이너
const ItemInfo = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
`

// 시간
const ItemTime = styled.Text`
  font-size: 14px;
  color: 'black';
  margin-right: 10px;
`;

// 기간
const ItemDate = styled.Text`
  font-size: 11px;
  color: 'grey';
  margin-right: 10px;
  margin-top: 8px;
`;

// 아이콘
const ItemIcon = styled(Ionicons).attrs(({theme}) => ({
  name: 'chevron-forward-sharp',
  size: 22,
  color: 'black',
}))``;


//item 컴포넌트
const Item= React.memo(
  ({item: {title, content, createdAt, uid, isEmer, id, image, startDate, endDate, markerId}, onPress}) => {

  return (
    <ItemContainer onPress={()=> onPress({title, content, createdAt, uid, isEmer, id, image, startDate, endDate, markerId})}>
      <ItemTextContainer>
        <ItemTitle>{title}</ItemTitle>
      </ItemTextContainer>
      <ItemInfo>
      <ItemTime>{TimeStamp(createdAt)}</ItemTime>
      {/* 기간 미정인 경우 미정으로 표시 */}
      {(startDate!=='')
      ?<ItemDate>{startDate} ~ {endDate}</ItemDate>
      :<ItemDate>기간 미정</ItemDate>
      }
      </ItemInfo>
      <ItemIcon />
    </ItemContainer>
  )
});
// =-=- -=-=-


// 긴급 글만 보여주는 화면
export default function MyPost({navigation}) {

  const theme=useContext(ThemeContext);

  //user 불러오기
  const curUser=getCurUser();

  //항목 목록 배열 상태 변수
  const [posts, setPosts] = useState([]);

  // 마운트될 때 동작
  // 모든 post collection에서 uid=curUser.uid인 문서 읽어오기 - 날짜 내림차순
  useEffect(()=> {
    const q = query(collectionGroup(DB, 'posts'), where('uid', '==', curUser.uid), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setPosts(list);
      console.log(posts[0]);
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
    </Container>
  );
};



