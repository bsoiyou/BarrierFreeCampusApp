// import React, {useState, useEffect} from 'react';
// import MapView,{Marker} from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { collection, query, onSnapshot} from "firebase/firestore";
// import {DB} from '../firebase';


// const Item= React.memo(
  
//   ({item: {title, description, userName, createdAt, uid, image, isEmer, id}, onPress}) => {

//   return (
//     <ItemContainer onPress={()=> onPress({title, description, userName, createdAt, uid, image, isEmer, id})}>
//       <ItemTextContainer>
//         <ItemTitle>{title}</ItemTitle>
//       </ItemTextContainer>
//       <ItemTime>{TimeStamp(createdAt)}</ItemTime>
//       <ItemIcon />
//     </ItemContainer>
//   )
// });

// export default function Map({navigation}) {
//   const [marks, setMarks] = useState([]);

//   // markers collection에서 모든 문서 읽어오기
//   useEffect(()=> {
//     const q = query(collection(DB, "markers"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const list = [];
//       querySnapshot.forEach((doc) => {
//         list.push(doc.data());
//       });
//       setMarks(list);
//     });
//     return ()=> unsubscribe();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView 
//       style={styles.map} 
//       initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//       }}>
//         {console.log(marks)}
//         <Marker
//           coordinate={{latitude: 37.78825, longitude: -122.4324}}
//           title="this is a marker"
//           description="this is a marker example"
//         />
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
// });