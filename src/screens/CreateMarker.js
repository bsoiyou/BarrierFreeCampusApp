import { StyleSheet, Text, TouchableOpacity, Dimensions, View} from 'react-native';
import React, {useState, useEffect, useRef, useLayoutEffect, useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import {ProgressContext} from '../contexts';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  GeoPoint,
  getGeoPoint,
  getString,
} from "firebase/firestore";
import { DB } from "../firebase";

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
  padding: 30px 10px;
  line-height: 30px;
`;



//장애물 위치 설정 화면
export default function CreateMarker({navigation, route}) {

  const theme=useContext(ThemeContext);
  
  // 사용자 설정 위치
  const [region, setRegion] = useState({
    latitude: 37.561025, 
    longitude: 126.946540,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003
  });


  // 건물 마커 불러오기
  const [bulMarks, setBulMarks] = useState([]);
  //boards collection에서 모든 문서 읽어와서 bulMarks 배열에 저장
  useEffect(() => {
    const q = query(collection(DB, "boards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        // title과 위치를 배열에 저장
        list.push({
          title: doc.data().title,
          loc: new GeoPoint(doc.data().loc.latitude, doc.data().loc.longitude),
        });
      });
      setBulMarks(list);
    });
    return () => unsubscribe();
  }, []);

  //header
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerRight: ()=> {
        return (
          <TouchableOpacity 
          onPress={()=> 
            navigation.navigate('SetDay', {title: route.params.title, content: route.params.content, isEmer: route.params.isEmer, image: route.params.image, lat: region.latitude, long: region.longitude})
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

  // 현재 위치로 이동하는 버튼 추가하기!! 

  return (
    <Container>
      <StyledText>
      {
        `❕지도를 움직여 장애물이 위치하는 곳에 핀을 설정해 주시기 바랍니다. 
❕정확한 위치를 모르신다면 제일 가깝다고 생각하는 건물에 핀을 설정해 주시기 바랍니다.`
      }
    </StyledText>
    <MapView
      style={styles.map}
      initialRegion={{
          latitude: 37.561025,
          longitude: 126.946540,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
      }}
      onRegionChangeComplete={(region) => setRegion(region)}
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      >
        {/* 건물 마커 찍기 */}
        {bulMarks.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: item.loc.latitude,
                longitude: item.loc.longitude,
              }}
              title={item.title}
            />
          );
        })}
        {/* 중앙 위치 나타내는 빨간색 박스 */}
        <View style={{
          width: 100,
          height: 100,
          position: 'absolute',
          transform: [
            {translateX: Dimensions.get('window').width/2-70}, 
            {translateY: Dimensions.get('window').width/2-70}
          ],
          zIndex: 3,
          backgroundColor: 'red',
          opacity: 0.2
        }}>
        </View>
        <Marker
        coordinate={region}
        title="Location"
        style={{width: 26, height: 40}}
        resizeMode='contain'
      />
      </MapView>

    </Container>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width-40,
    height: Dimensions.get('window').width-40,
    marginVertical: 20,
  },
});
