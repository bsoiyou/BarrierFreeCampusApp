import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { auth } from './firebase';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';


export default function App() {
  //firebase test
  //console.log(auth.currentUser);

  return (
    <View style={styles.container}>
      
      <MapView
        style={styles.map}
        region={{
            latitude: 51.5078788,
            longitude: -0.0877321,
            latitudeDelta: 0.001663,
            longitudeDelta: 0.002001,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
        coordinate={{latitude: 51.5078788, longitude: -0.0877321}}
        >
        </Marker>
      </MapView>
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
