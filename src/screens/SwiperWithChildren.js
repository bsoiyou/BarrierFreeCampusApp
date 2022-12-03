import React from "react";
import {
  Alert,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import ImageViewer from "react-native-image-zoom-viewer";

const images = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4A.png?alt=media&token=f68ed468-0bc5-47b9-acdc-49770a8bc727",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/firstexpo-eb101.appspot.com/o/route%2F%EA%B8%B8%EC%B0%BE%EA%B8%B0%20%ED%99%94%EB%A9%B4B.png?alt=media&token=5ae834bb-77f3-4402-adb3-1e1639934cac",
  },
];

const { width, height } = Dimensions.get("window");

export default () => {
  const scrollRef = React.useRef(null);
  const goToLastIndex = () => {
    scrollRef.current.goToLastIndex();
  };
  const goToFirstIndex = () => {
    scrollRef.current.goToFirstIndex();
  };
  const goToSecondIndex = () => {
    scrollRef.current.scrollToIndex({ index: 1 });
  };
  const getCurrentIndex = () => {
    const currentIndex = scrollRef.current.getCurrentIndex();
    console.log(`the current index is ${currentIndex}`);
    Alert.alert(`the current index is ${currentIndex}`);
  };
  const getPrevIndex = () => {
    const prevIndex = scrollRef.current.getPrevIndex();
    console.log(`the previous index is ${prevIndex}`);
    Alert.alert(`the previous index is ${prevIndex}`);
  };
  const onChangeIndex = ({ index, prevIndex }) => {
    console.log({ index, prevIndex });
  };
  return (
    <SwiperFlatList
      showPagination
      ref={scrollRef}
      onChangeIndex={onChangeIndex}
    >
      <TouchableOpacity onPress={goToLastIndex}>
        <ImageViewer imageUrls={images} renderIndicator={() => null} />
      </TouchableOpacity>
    </SwiperFlatList>
  );
};

const styles = StyleSheet.create({
  child: {
    height: height * 0.5,
    width,
    justifyContent: "center",
  },
  text: {
    fontSize: width * 0.1,
    textAlign: "center",
  },
});
