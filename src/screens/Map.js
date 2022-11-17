import React, {useState, useEffect} from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { addDoc, collection, query, onSnapshot, GeoPoint, getGeoPoint} from "firebase/firestore";
import {DB} from '../firebase';



export default function Map({navigation}) {
  const [marks, setMarks] = useState([]);

  //markers collection에서 모든 문서 읽어와서 marks 배열에 저장
  useEffect(()=> {
    const q = query(collection(DB, "markers"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(new GeoPoint(doc.data().loc.latitude, doc.data().loc.longitude));
      });
      setMarks(list);
    });
    return ()=> unsubscribe();
  }, []);


  return (
    
    <View style={styles.container}>
      <MapView 
      style={styles.map} 
      initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}>
        {/* marks 배열에서 하나씩 꺼내서 marker 찍기 */}
        {marks.map(
          (item,index)=> {
           return (
            <Marker
              key={index}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              title={`${index}`}
              description="this is a marker example"
            />
           );
          }
        )}
      </MapView> 

      {/* 장애물 제보 버튼 */}
      <View
          style={{
            position: 'absolute',
            bottom: '20%', 
            alignSelf: 'center' 
          }}>
        <Button 
          title='장애물 제보' 
          onPress={()=> navigation.navigate('CreatePost')}/>
        </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});