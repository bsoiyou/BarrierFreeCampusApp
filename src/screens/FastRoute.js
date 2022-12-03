import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";
import SwiperWithChildren from "./SwiperWithChildren";

//빠른 길찾기 기본 화면

export default function FastRoute({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SwiperWithChildren />
      </View>

      {/* <View>
        <Text
          style={{
            position: "absolute",
            alignSelf: "center",
            top: "10%",
            fontSize: "15px",
          }}
        >
          swipe하여 상세 페이지를 확인할 수 있습니다.
        </Text>
      </View> */}
      <View
        style={{
          position: "absolute",
          bottom: "10%",
          alignSelf: "center",
          backgroundColor: "#D30000",
          borderRadius: 25,
        }}
      >
        <Button
          style={{}}
          title="지도로 돌아가기"
          onPress={() => navigation.navigate("Map")}
          color="#fff"
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  child: {
    height: "50%",
    //width: "100%",
    justifyContent: "center",
  },
});
