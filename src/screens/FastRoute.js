import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";
//import SwiperWithChildren from "./SwiperWithChildren";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import ImageViewer from "react-native-image-zoom-viewer";
import A1 from "../../assets/images/A1.jpg";
import A2 from "../../assets/images/A2.jpg";

//빠른 길찾기 기본 화면

const { width, height } = Dimensions.get("window");

const images = [
  {
    name: "A-1",
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4A-1.png?alt=media&token=b2461a8f-0e89-4c11-8dca-77e3e8e7cf8f",
  },
  {
    name: "A-2",
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4A-2.png?alt=media&token=600f41c5-11df-4251-9038-8eb29b962fdc",
  },
  {
    name: "B-1",
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4B-1.png?alt=media&token=47ad46b2-4f33-4093-9605-eefa445087ae",
  },
  {
    name: "B-2",
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4B-2.png?alt=media&token=4e0f6cfb-2a55-4365-b527-9319e027c26f",
  },
];

export default function FastRoute({ navigation, route }) {
  const { params } = route;
  const pathIndex = params ? params.pathIndex : null;
  const [selectedImages, setSelectedImages] = useState();
  useEffect(() => {
    if (pathIndex == 0) {
      setSelectedImages(
        A1
        //     "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4A-1.png?alt=media&token=b2461a8f-0e89-4c11-8dca-77e3e8e7cf8f",
        //     "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4A-2.png?alt=media&token=600f41c5-11df-4251-9038-8eb29b962fdc",
      );
    } else {
      setSelectedImages(
        A2
        //     "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4B-1.png?alt=media&token=47ad46b2-4f33-4093-9605-eefa445087ae",
        //     "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4B-2.png?alt=media&token=4e0f6cfb-2a55-4365-b527-9319e027c26f",
      );
    }
  }, []);

  const scrollRef = React.useRef(null);
  const onChangeIndex = ({ index, prevIndex }) => {
    console.log({ index, prevIndex });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <SwiperFlatList
          showPagination
          ref={scrollRef}
          onChangeIndex={onChangeIndex}
        >
          <SafeAreaView style={[styles.child]}>
            <Image //imageUrls={images}
              style={styles.image}
              source={selectedImages}
              renderIndicator={() => null}
            />
          </SafeAreaView>
        </SwiperFlatList>
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
    height: height * 0.75,
    width,
    justifyContent: "center",
  },
  text: {
    fontSize: width * 0.1,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 500,
  },
});
