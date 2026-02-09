# 팁 & 트릭 모음

스터디하면서 발견한 유용한 팁들을 공유합니다.

## 개발 환경

### VS Code 단축키

**필수 단축키**

- `Cmd/Ctrl + P`: 파일 빠르게 열기
- `Cmd/Ctrl + Shift + P`: 명령 팔레트
- `Cmd/Ctrl + D`: 같은 단어 선택
- `Alt + ↑/↓`: 라인 이동
- `Cmd/Ctrl + /`: 주석 토글

**코드 정리**

- `Shift + Alt + F`: 코드 포맷팅
- `Cmd/Ctrl + K, Cmd/Ctrl + F`: 선택 영역 포맷팅

### Expo 개발 서버

**빠른 재시작**

- `R` 키: 앱 리로드
- `r` 키: 전체 재시작
- `m` 키: 메뉴 토글
- `i` 키: iOS 시뮬레이터 열기
- `a` 키: Android 에뮬레이터 열기

**성능 향상**

```bash
# 프로덕션 모드로 실행 (느리지만 최적화됨)
expo start --no-dev

# 캐시 클리어
expo start -c
```

---

## React Native 코딩 팁

### 1. StyleSheet 재사용

**❌ 비효율적**

```tsx
<View style={{ flex: 1, padding: 20 }}>
<View style={{ flex: 1, padding: 20 }}>
```

**✅ 효율적**

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

<View style={styles.container}>
<View style={styles.container}>
```

### 2. 조건부 스타일

```tsx
<View style={[
  styles.button,
  isActive && styles.activeButton,
  disabled && styles.disabledButton,
]}>
```

### 3. Platform별 코드

```tsx
import { Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

### 4. 안전한 화면 영역

```tsx
import { SafeAreaView } from "react-native-safe-area-context";

<SafeAreaView style={styles.container}>
  {/* 노치, 상태바 피하기 */}
</SafeAreaView>;
```

### 5. 키보드 피하기

```tsx
import { KeyboardAvoidingView, Platform } from "react-native";

<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.container}
>
  <TextInput />
</KeyboardAvoidingView>;
```

---

## TypeScript 팁

### 1. 컴포넌트 Props 타입

```tsx
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean; // 선택적
  variant?: "primary" | "secondary"; // 제한된 값
}

const Button = ({ title, onPress, disabled = false }: ButtonProps) => {
  // ...
};
```

### 2. State 타입

```tsx
// 단순 타입
const [count, setCount] = useState<number>(0);

// 객체 타입
interface User {
  name: string;
  age: number;
}
const [user, setUser] = useState<User | null>(null);

// 배열 타입
const [items, setItems] = useState<string[]>([]);
```

### 3. Event Handler 타입

```tsx
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  console.log(e.nativeEvent.text);
};

// 또는 간단하게
const handlePress = () => {
  // ...
};
```

---

## 성능 최적화

### 1. FlatList 최적화

```tsx
<FlatList
  data={items}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  // 성능 최적화
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  updateCellsBatchingPeriod={50}
  initialNumToRender={10}
  windowSize={10}
/>
```

### 2. 불필요한 리렌더링 방지

```tsx
import { memo } from "react";

// memo로 컴포넌트 감싸기
const ListItem = memo(({ item }) => {
  return <Text>{item.name}</Text>;
});

// useCallback으로 함수 메모이제이션
const handlePress = useCallback(() => {
  // ...
}, [dependency]);
```

### 3. 이미지 최적화

```tsx
<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode="cover"
  // 크기 명시
  defaultSource={require("./placeholder.png")}
/>
```

---

## 디버깅 팁

### 1. Console.log 대신 debugger

```tsx
const handlePress = () => {
  debugger; // 여기서 중단점
  // ...
};
```

### 2. React Developer Tools

```bash
# 설치
npm install -g react-devtools

# 실행
react-devtools
```

### 3. 네트워크 요청 확인

```tsx
// Flipper 또는 Reactotron 사용
// expo start 후 DevTools에서 Network 탭
```

### 4. 레이아웃 디버깅

```tsx
// 모든 View에 border 추가
<View style={{ borderWidth: 1, borderColor: 'red' }}>
```

---

## Git 팁

### 1. 자주 사용하는 명령어 별칭

```bash
# ~/.gitconfig에 추가
[alias]
  st = status
  co = checkout
  br = branch
  cm = commit -m
  lg = log --oneline --graph
```

### 2. 유용한 Git 명령어

```bash
# 마지막 커밋 취소 (변경사항 유지)
git reset HEAD^

# 특정 파일만 이전 커밋으로
git checkout HEAD -- filename

# 변경사항 임시 저장
git stash
git stash pop

# 브랜치 간 파일 가져오기
git checkout other-branch -- filename
```

---

## 학습 팁

### 1. 효과적인 검색

**좋은 검색 키워드**

```
react native [문제] site:stackoverflow.com
expo [문제] 2024
react native [에러메시지]
```

**나쁜 검색**

```
react native 안됨
에러남
```

### 2. 공식 문서 활용

1. 먼저 공식 문서 확인
2. 예제 코드 따라하기
3. API 레퍼런스 읽기
4. 안 되면 Stack Overflow

### 3. 코드 이해하기

```tsx
// 1. 모르는 코드 만나면
// 2. console.log로 출력해보기
console.log("items:", items);
console.log("type:", typeof items);

// 3. 한 줄씩 주석 처리하면서 테스트
// 4. 작동 원리 이해
```

---

## 디자이너를 위한 팁

### 1. Figma → Code 변환 치트시트

| Figma                    | React Native             |
| ------------------------ | ------------------------ |
| Frame                    | View                     |
| Text                     | Text                     |
| Auto Layout (Horizontal) | flexDirection: 'row'     |
| Auto Layout (Vertical)   | flexDirection: 'column'  |
| Padding                  | padding                  |
| Gap                      | gap                      |
| Align Left               | alignItems: 'flex-start' |
| Align Center             | alignItems: 'center'     |
| Fill Container           | flex: 1                  |

### 2. 디자인 토큰을 코드로

```tsx
// constants/theme.ts
export const COLORS = {
  primary: "#007AFF",
  secondary: "#5856D6",
  background: "#FFFFFF",
  text: "#000000",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: "bold" },
  h2: { fontSize: 24, fontWeight: "bold" },
  body: { fontSize: 16, fontWeight: "normal" },
};
```

### 3. 컴포넌트 먼저 만들기

1. Figma에서 컴포넌트 디자인
2. Props 정의 (variant, size 등)
3. 코드로 구현
4. Storybook으로 문서화

---

## 자주 쓰는 코드 스니펫

### 1. 기본 컴포넌트 템플릿

```tsx
import { View, Text, StyleSheet } from "react-native";

interface MyComponentProps {
  // props 정의
}

export const MyComponent = ({}: MyComponentProps) => {
  return (
    <View style={styles.container}>
      <Text>MyComponent</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
```

### 2. 데이터 Fetch 훅

```tsx
const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

---

## 추천 VS Code Extensions

- **ESLint**: 코드 품질 체크
- **Prettier**: 자동 포맷팅
- **React Native Tools**: RN 개발 도구
- **Auto Rename Tag**: 태그 자동 이름 변경
- **ES7+ Snippets**: React 코드 스니펫
- **GitLens**: Git 히스토리
- **Error Lens**: 에러 인라인 표시

---

**이 문서는 계속 업데이트됩니다. 좋은 팁 발견하면 추가해주세요!** 🚀
