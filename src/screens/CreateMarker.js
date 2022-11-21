import { StyleSheet, Text, TouchableOpacity, Dimensions, View} from 'react-native';
import React, {useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';
import MapView, {Marker} from 'react-native-maps';
import { addDoc, collection, query, onSnapshot, GeoPoint, getGeoPoint} from "firebase/firestore";
import {DB} from '../firebase';


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



//장애물 위치 설정 화면
export default function CreateMarker({navigation, route}) {

  const theme=useContext(ThemeContext);
  // 사용자가 설정한 위치로 setLoc하는 코드 추가하기
  const [loc, setLoc] = useState({lat: 37.561025, long: 126.946540});

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
          onPress={()=> 
            navigation.navigate('SetDay', {title: route.params.title, content: route.params.content, isEmer: route.params.isEmer, image: route.params.image, lat: loc['lat'], long: loc['long']})
          }
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
      <StyledText>
      {
        `❕지도에 있는 핀을 움직여 가장 정확한 위치를 설정해 주시기 바랍니다. 
❕정확한 위치를 모르시는 분은 제일 가깝다고 생각하는 건물에 핀을 설정해 주시기 바랍니다.`
      }
    </StyledText>
    <MapView
      style={styles.map}
      initialRegion={{
          latitude: 37.561025,
          longitude: 126.946540,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
      }}></MapView>

    </Container>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width-40,
    height: Dimensions.get('window').width-40,
  },
});
