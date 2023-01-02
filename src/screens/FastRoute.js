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
//import ImageViewer from "react-native-image-zoom-viewer";
import {
  ArtAud,
  ArtBus,
  ArtCul,
  ArtEcc,
  ArtEdu,
  ArtEng,
  ArtLib,
  ArtMus,
  ArtPos,
  ArtSci,
} from "../../assets/images";
import ImageViewer from "react-native-image-zoom-viewer";

//빠른 길찾기 기본 화면

const { width, height } = Dimensions.get("window");

export default function FastRoute({ navigation, route }) {
  const { params } = route;
  const pathIndex = params ? params.pathIndex : null;
  const [selectedImages, setSelectedImages] = useState();
  useEffect(() => {
    switch (pathIndex) {
      case 1:
        return setSelectedImages(ArtAud);
      case 2:
        return setSelectedImages(ArtBus);
      case 3:
        return setSelectedImages(ArtCul);
      case 4:
        return setSelectedImages(ArtEcc);
      case 5:
        return setSelectedImages(ArtEdu);
      case 6:
        return setSelectedImages(ArtEng);
      case 7:
        return setSelectedImages(ArtLib);
      case 8:
        return setSelectedImages(ArtMus);
      case 9:
        return setSelectedImages(ArtPos);
      case 10:
        return setSelectedImages(ArtSci);
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
          backgroundColor="#D30000"
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
