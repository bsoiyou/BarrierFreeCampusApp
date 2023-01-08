import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from '../firebase.json';
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  setDoc,
  doc,
  GeoPoint,
  addDoc,
  updateDoc,
  collection,
} from "firebase/firestore";

const app = initializeApp(config);

export const auth = getAuth(app);
export const DB = getFirestore(app);
export const storage = getStorage(app);

//--현재 사용자 정보 가져오는 함수--
export const getCurUser = () => {
  const { uid, displayName, email } = auth.currentUser;
  return { uid, displayName, email };
};

//--user 생성 함수--
export const createUser = async ({ uid }) => {
  try {
    //'users' collection에 document 생성
    // id 지정해서 올리기 (uid로)
    await setDoc(doc(DB, "users", `${uid}`), {
      id: uid,
      myBoard: [],
      // 가장 최신 글의 id
      lastPost: "",
    });
    // uid 반환
    return uid;
  } catch (e) {
    console.error(e.message);
  }
};

//--marker 생성 함수--
export const createMarker = async (lat, long) => {
  try {
    //'markers' collection에 document 생성
    // id 자동 지정 (addDoc)
    const docRef = await addDoc(collection(DB, "markers"), {
      loc: new GeoPoint(lat, long),
    });

    //자동 지정된 id로 id 필드 업데이트
    const curDocRef = doc(DB, "markers", `${docRef.id}`);
    await updateDoc(curDocRef, {
      markerId: docRef.id,
    });

    //markerId 반환
    return docRef.id;
  } catch (e) {
    console.error(e.message);
  }
};

//--일반 post 생성 함수--
export const createPost = async ({
  boardId,
  title,
  content,
  isEmer,
  image,
  uid,
  startDate,
  endDate,
}) => {
  try {
    //받은 boardId의 'posts' collection에 document 생성

    // id 자동 지정 (addDoc)
    const docRef = await addDoc(collection(DB, "boards", `${boardId}/posts`), {
      uid: uid,
      title: title,
      content: content,
      createdAt: Date.now(),
      isEmer: isEmer,
      image: image,
      id: "",
      startDate: startDate,
      endDate: endDate,
    });

    //자동 지정된 id로 id 필드 업데이트
    const curDocRef = doc(DB, "boards", `${boardId}/posts/${docRef.id}`);
    await updateDoc(curDocRef, {
      id: docRef.id,
    });

    // 긴급 글인 경우 user의 lastPost 업데이트
    if (isEmer == true) {
      const lastPostRef = doc(DB, "users", `${uid}`);
      updateDoc(lastPostRef, {
        lastPost: docRef.id,
      });
    }

    return docRef.id;
  } catch (e) {
    console.error(e.message);
  }
};

//--장애물 post 생성 함수--
export const createBarrierPost = async ({
  boardId,
  title,
  content,
  isEmer,
  image,
  uid,
  startDate,
  endDate,
  lat,
  long,
  markerId,
}) => {
  try {
    //받은 boardId의 'posts' collection에 document 생성

    // id 자동 지정 (addDoc)
    const docRef = await addDoc(collection(DB, "boards", `${boardId}/posts`), {
      uid: uid,
      title: title,
      content: content,
      createdAt: Date.now(),
      isEmer: isEmer,
      image: image,
      id: "",
      startDate: startDate,
      endDate: endDate,
      lat: lat,
      long: long,
      markerId: markerId,
    });

    //자동 지정된 id로 id 필드 업데이트
    const curDocRef = doc(DB, "boards", `${boardId}/posts/${docRef.id}`);
    await updateDoc(curDocRef, {
      id: docRef.id,
    });

    // 긴급 글인 경우 user의 lastPost 업데이트
    if (isEmer == true) {
      const lastPostRef = doc(DB, "users", `${uid}`);
      updateDoc(lastPostRef, {
        lastPost: docRef.id,
      });
    }

    return docRef.id;
  } catch (e) {
    console.error(e.message);
  }
};
