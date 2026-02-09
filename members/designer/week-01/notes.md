# Week 1 학습 노트

> JavaScript 기초 & 개발 환경 설정

## 📚 학습한 내용

### JavaScript 기초

#### 변수 선언
```javascript
const name = 'Kim';      // 변경 불가 (추천)
let age = 25;            // 변경 가능
```

#### 함수
```javascript
// 함수 선언
function greet(name) {
  return 'Hello ' + name;
}

// 화살표 함수 (자주 사용)
const greet = (name) => {
  return 'Hello ' + name;
};
```

### React Native 첫 경험

#### 컴포넌트란?
- Figma의 Component와 비슷한 개념
- 재사용 가능한 UI 조각
- 코드로 작성

#### 첫 컴포넌트
```tsx
import { View, Text } from 'react-native';

function HelloWorld() {
  return (
    <View>
      <Text>안녕하세요!</Text>
    </View>
  );
}
```

### 개발 환경
- VS Code 설치 완료
- Expo Go 앱으로 실기기에서 바로 확인 가능
- QR 코드 스캔하면 앱이 실행됨 - 신기함!

## 💡 인사이트
- 코딩이 생각보다 디자인과 비슷함
  - 컴포넌트 = Figma의 Component
  - Props = Component Properties
  - Style = Auto Layout 같은 느낌

- `<View>`는 Figma의 Frame 같은 것
- `<Text>`는 Text Layer

## ❓ 궁금한 점
- [x] JavaScript와 TypeScript 차이?
  → TypeScript는 타입을 명시해서 더 안전

- [ ] 함수를 만드는 방법이 여러 개인데 차이점?
- [ ] const와 let을 언제 써야 할지 아직 헷갈림

## 😓 어려웠던 점
- 프로그래밍 용어가 많아서 처음엔 당황
- 중괄호 `{}`, 괄호 `()` 언제 쓰는지 헷갈림
- 에러 메시지 읽는 게 어려움

## 🎉 잘한 점
- 첫 앱 실행 성공!
- JavaScript 기초 강의 완강
- 매일 조금씩 학습

## 🔗 참고 자료
- [JavaScript 기초 강의](https://www.freecodecamp.org/)
- [React Native 공식 튜토리얼](https://reactnative.dev/docs/tutorial)

## ⏰ 학습 시간
- JavaScript 기초 강의: 4시간
- 환경 설정: 2시간
- React Native 기초: 3시간
- 복습: 1시간
- **Total**: 10시간

## 📝 다음 주 계획
- JavaScript 배열, 객체 개념 더 공부
- React 기초 개념 학습
- 간단한 UI 컴포넌트 만들어보기

## 💪 자기 격려
첫 주치고 잘했다! 코딩이 처음이라 어렵지만 재미있음.
Figma 디자인을 직접 코드로 만들 수 있다는 게 신기하고 뿌듯함. 💪
