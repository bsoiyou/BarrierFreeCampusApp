//email 유효성 검사
//이화인 메일 맞춰서 수정하기
export const validateEmail = email => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
  }
  
  //입력값 공백 방지 함수
  export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  };