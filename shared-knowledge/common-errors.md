# 자주 발생하는 에러 해결법

스터디 진행하면서 자주 만나는 에러들과 해결 방법을 정리합니다.

## 환경 설정 관련

### Error: EADDRINUSE: address already in use :::19000

**원인**: 포트 19000이 이미 사용 중

**해결**:

```bash
# 방법 1: 다른 포트 사용
expo start --port 19001

# 방법 2: 프로세스 종료 (macOS/Linux)
lsof -ti:19000 | xargs kill -9

# 방법 2: 프로세스 종료 (Windows)
netstat -ano | findstr :19000
taskkill /PID [프로세스ID] /F
```

---

### Metro Bundler가 느릴 때

**원인**: 캐시 문제

**해결**:

```bash
# 캐시 클리어하고 재시작
expo start -c
```

---

### Expo Go 앱에서 연결 안 될 때

**원인**: 네트워크 문제

**해결**:

1. 컴퓨터와 모바일 기기가 같은 Wi-Fi인지 확인
2. 방화벽 설정 확인
3. Tunnel 모드 사용:

```bash
expo start --tunnel
```

---

## 코드 관련 에러

### Text strings must be rendered within a <Text> component

**에러 예시**:

```tsx
<View>Hello World {/* ❌ 에러! */}</View>
```

**해결**:

```tsx
<View>
  <Text>Hello World</Text> {/* ✅ OK */}
</View>
```

---

### Cannot read property 'map' of undefined

**원인**: 데이터가 아직 로드되지 않았음

**에러 코드**:

```tsx
const MyComponent = () => {
  const [items, setItems] = useState(); // undefined!

  return (
    <View>
      {items.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};
```

**해결**:

```tsx
const MyComponent = () => {
  const [items, setItems] = useState([]); // ✅ 빈 배열로 초기화

  return (
    <View>
      {items.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};
```

---

### Each child in a list should have a unique "key" prop

**에러 코드**:

```tsx
{items.map(item => (
  <Text>{item.name}</Text>  {/* ❌ key 없음 */}
))}
```

**해결**:

```tsx
{items.map(item => (
  <Text key={item.id}>{item.name}</Text>  {/* ✅ key 추가 */}
))}
```

---

### Invalid prop `fontSize` of type `string` supplied to `Text`

**에러 코드**:

```tsx
<Text style={{ fontSize: '16px' }}>  {/* ❌ */}
```

**해결**:

```tsx
<Text style={{ fontSize: 16 }}>  {/* ✅ 숫자만 */}
```

React Native에서는 단위 없이 숫자만 사용합니다!

---

### Objects are not valid as a React child

**에러 코드**:

```tsx
const user = { name: 'Kim', age: 25 };

<Text>{user}</Text>  {/* ❌ 객체를 직접 렌더링 불가 */}
```

**해결**:

```tsx
<Text>{user.name}</Text>  {/* ✅ 속성 값 사용 */}
<Text>{JSON.stringify(user)}</Text>  {/* ✅ 문자열로 변환 */}
```

---

## TypeScript 관련

### Type 'X' is not assignable to type 'Y'

**원인**: 타입이 맞지 않음

**예시**:

```tsx
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Kim",
  age: "25", // ❌ string이 number에 할당 불가
};
```

**해결**:

```tsx
const user: User = {
  name: "Kim",
  age: 25, // ✅ number로 수정
};
```

---

### Property 'X' does not exist on type 'Y'

**원인**: 타입 정의에 해당 속성이 없음

**해결**:

```tsx
// 타입 정의에 속성 추가
interface User {
  name: string;
  age: number;
  email: string; // 추가
}
```

---

## Performance 관련

### Warning: Cannot update a component while rendering

**원인**: 렌더링 중에 state 변경

**에러 코드**:

```tsx
const MyComponent = () => {
  const [count, setCount] = useState(0);

  setCount(count + 1); // ❌ 렌더링 중 state 변경

  return <Text>{count}</Text>;
};
```

**해결**:

```tsx
const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // ✅ useEffect에서 변경
  }, []);

  return <Text>{count}</Text>;
};
```

---

### Warning: VirtualizedList should never be nested

**원인**: FlatList 안에 FlatList를 중첩

**해결**:

```tsx
// ❌ 중첩 FlatList
<FlatList
  data={items}
  renderItem={() => (
    <FlatList data={subItems} />
  )}
/>

// ✅ 대안 1: ScrollView 사용
<FlatList
  data={items}
  renderItem={() => (
    <ScrollView>
      {subItems.map(item => <Item key={item.id} />)}
    </ScrollView>
  )}
/>

// ✅ 대안 2: nestedScrollEnabled
<FlatList
  data={items}
  renderItem={() => (
    <FlatList data={subItems} nestedScrollEnabled />
  )}
/>
```

---

## Git 관련

### fatal: not a git repository

**원인**: Git이 초기화되지 않은 디렉토리

**해결**:

```bash
git init
```

---

### Merge conflict

**해결 순서**:

1. 충돌 파일 열기
2. `<<<<<<<`, `=======`, `>>>>>>>` 표시 확인
3. 필요한 코드만 남기고 표시 삭제
4. 저장 후 커밋

```bash
git add .
git commit -m "merge: 충돌 해결"
```

---

## 도움 요청하기

에러를 해결할 수 없을 때:

1. **에러 메시지 전체 복사**
2. **어떤 상황에서 발생했는지 설명**
3. **시도해본 방법 공유**
4. **GitHub Issue로 질문**

### Issue 예시

```markdown
## 에러 내용

[에러 메시지 전체 붙여넣기]

## 발생 상황

Button 컴포넌트를 만들다가 발생했습니다.

## 시도해본 것

- 캐시 클리어
- 재시작

## 코드

[관련 코드]
```

---

**이 문서는 계속 업데이트됩니다. 좋은 팁 발견하면 추가해주세요!** 🚀
