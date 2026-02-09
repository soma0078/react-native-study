# Week 1 학습 노트

> 환경 설정 & React Native 기초

## 📚 학습한 내용

### Expo vs React Native CLI
- Expo: 빠른 시작, 쉬운 설정, 많은 기본 기능 제공
- React Native CLI: 완전한 제어, 네이티브 모듈 자유 사용
- 스터디에서는 Expo 사용 결정

### 프로젝트 구조
```
my-app/
├── app/              # 앱 진입점
├── components/       # 재사용 컴포넌트
├── assets/          # 이미지, 폰트
└── package.json
```

### 첫 컴포넌트 작성
```tsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello React Native!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

## 💡 인사이트
- 웹 React와 매우 유사하지만 `<div>` 대신 `<View>` 사용
- Hot Reload가 정말 빠름 - 개발 경험 좋음
- TypeScript 지원이 잘 되어 있음

## ❓ 궁금한 점
- [ ] Expo의 제약사항은 실무에서 어느 정도 영향?
- [ ] 네이티브 모듈이 필요한 경우는 어떻게?

## 🔗 참고 자료
- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native Core Components](https://reactnative.dev/docs/components-and-apis)

## ⏰ 학습 시간
- 환경 설정: 1시간
- 이론 학습: 2시간
- 실습: 2시간
- **Total**: 5시간

## 📝 다음 주 계획
- 기본 컴포넌트 깊게 학습
- StyleSheet 패턴 연구
- 성능 최적화 방법 미리 알아보기
