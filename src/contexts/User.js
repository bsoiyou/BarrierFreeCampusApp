import React, {useState, createContext} from 'react';

//context 생성
const UserContext  = createContext({
//****** 여기에 verified도 포함 *******
  user: {uid: null, emailVerified: false}, //user 객체 - uid 값으로 로그인 되었는지 판단
  setUser: () => {}
});

const UserProvider = ({children}) => {
  const [user, setUserInfo]=useState({});
    //****** 인증 화면에서 성공하면 setVerified 사용하여 변경하도록
  const setUser= ({uid, emailVerified}) => {
    setUserInfo({uid, emailVerified});
  };
  const value={user, setUser};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export {UserContext, UserProvider};
