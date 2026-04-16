# 8주차 개발 노트 — "오늘 뭐하지?" 애니메이션 레이어

## 수행 내용 (Phase 4 ~ 6)

| Phase | 내용 |
|-------|------|
| 4 | 스플래시 화면: 로고 fade-in + scale spring + 위치 권한 요청 → 홈 자동 전환 |
| 5 | 배경 색상 전환 / 물결 애니메이션 / 에러 shake / 카드 spring 탭 + 스와이프 / 체크리스트 순차 등장 |
| 6 | 네트워크 에러 분기 메시지, 위치 권한 거부 fallback, 재시도 버튼 |

---

## 신규 파일

```
app/index.tsx                         # 스플래시 화면 (기존 redirect → 풀 애니메이션 화면)
components/AnimatedGradientBackground # 날씨 조건별 배경 색상 전환
components/WaveAnimation              # 수온 영역 물결 애니메이션
```

## 수정 파일

```
components/ActivityCard               # Pressable → GestureDetector + spring 탭
components/ActivityBottomSheet        # Modal → absolute 포지셔닝 + 스와이프 닫기 + 체크리스트 순차 등장
app/home.tsx                          # 에러 shake, AnimatedGradientBackground 적용, WaveAnimation 삽입
```

---

## Reanimated 4 주요 개념

### 1. useSharedValue — 애니메이션 상태 저장소

`useState`와 달리 값이 바뀌어도 리렌더링이 발생하지 않는다. JS 스레드와 UI 스레드가 공유하는 값으로, 애니메이션을 UI 스레드에서 직접 실행해 프레임 드롭 없이 부드러운 애니메이션이 가능하다.

```ts
const scale = useSharedValue(1);    // 초기값 설정
scale.value = withSpring(0.9);      // .value로 읽고 쓴다
```

---

### 2. useAnimatedStyle — shared value를 스타일로 연결

컴포넌트의 `style` prop에 연결하면, `useSharedValue`가 변경될 때 UI 스레드에서 직접 스타일을 업데이트한다. 리렌더링 없이 애니메이션이 동작하는 핵심 메커니즘.

```ts
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
  opacity: opacity.value,
}));

return <Animated.View style={[styles.card, animatedStyle]} />;
```

---

### 3. withSpring / withTiming — 애니메이션 함수

`withTiming`: 지정한 시간 동안 선형/easing 보간. 정확한 타이밍이 필요할 때.
`withSpring`: 물리 기반 스프링. `damping`(감쇠)과 `stiffness`(강성)로 탄성 조절.

```ts
// 정밀한 시간 제어
opacity.value = withTiming(1, { duration: 600 });

// 물리적인 탄성감
scale.value = withSpring(1, { damping: 10, stiffness: 80 });

// 완료 콜백 (spring은 세 번째 인수)
scale.value = withSpring(1, {}, (finished) => {
  if (finished) runOnJS(navigate)();
});
```

---

### 4. withRepeat + withTiming — 반복 애니메이션 (물결)

```ts
// withRepeat(animation, 반복횟수, reverse)
// -1: 무한 반복 / true: 왕복 (A→B→A)
wave1X.value = withRepeat(
  withTiming(-40, { duration: 2400, easing: Easing.inOut(Easing.sin) }),
  -1,
  true
);
```

두 레이어를 서로 반대 방향으로 움직이면 자연스러운 파도 효과.
`Easing.inOut(Easing.sin)`: 사인 곡선 가속도로 부드러운 왕복.

**WaveAnimation 구조 원리:**
`overflow: hidden`인 컨테이너 안에 `borderRadius`가 큰 넓은 사각형을 배치. 사각형의 곡선 상단부분만 컨테이너 밖으로 잘려 보이며, 이것이 수평으로 이동하면 파도처럼 보임.

---

### 5. withSequence — 순차 실행 (에러 shake)

여러 애니메이션을 배열처럼 순서대로 실행한다.

```ts
shakeX.value = withSequence(
  withTiming(-10, { duration: 60 }),
  withTiming(10, { duration: 60 }),
  withTiming(-10, { duration: 60 }),
  withTiming(10, { duration: 60 }),
  withTiming(0, { duration: 60 }),
);
```

`useEffect`에서 `isError`가 true가 될 때 트리거.

---

### 6. withDelay — 지연 실행 (체크리스트 순차 등장)

다른 애니메이션 함수를 감싸서 실행을 지연시킨다.

```ts
// index * 80ms 딜레이로 항목을 순차적으로 등장시킴
opacity.value = withDelay(index * 80, withTiming(1, { duration: 250 }));
ty.value = withDelay(index * 80, withSpring(0, { damping: 15 }));
```

`key={activity.id + index}` 패턴으로 활동이 바뀔 때 컴포넌트가 재마운트 → `useEffect` 재실행 → 애니메이션 초기화.

---

### 7. interpolateColor — 색상 보간 (배경 전환)

숫자 범위를 색상 범위에 매핑해 부드럽게 색상을 전환한다.

```ts
const COLORS = ['#FF6B35', '#2196F3', '#1565C0', '#546E7A', '#263238'];

const animatedStyle = useAnimatedStyle(() => ({
  backgroundColor: interpolateColor(
    progress.value,  // 0~4 사이 숫자
    [0, 1, 2, 3, 4], // 입력 범위
    COLORS           // 출력 범위 (색상)
  ),
}));
```

날씨 조건이 바뀌면 `withTiming`으로 `progress`를 새 인덱스로 이동 → 색상이 800ms 동안 자연스럽게 전환.

---

### 8. Gesture Handler — runOnJS (스레드 간 콜백)

Gesture Handler의 콜백은 UI 스레드(worklet)에서 실행된다. React state 업데이트 등 JS 함수를 호출하려면 `runOnJS`로 감싸야 한다.

```ts
const tapGesture = Gesture.Tap()
  .onBegin(() => {
    scale.value = withSpring(0.93);   // UI 스레드에서 직접 실행 ✓
  })
  .onEnd(() => {
    runOnJS(onPress)(activity);        // JS 스레드로 전달 ✓
  })
  .onFinalize(() => {
    scale.value = withSpring(1);
  });
```

| 콜백 | 시점 |
|------|------|
| `onBegin` | 손가락이 닿는 순간 |
| `onEnd` | 탭 성공 (손가락을 뗄 때, 취소 아님) |
| `onFinalize` | 성공/취소 무관하게 제스처 종료 시 |

---

### 9. Gesture.Pan() — 바텀 시트 스와이프 닫기

`onChange`로 이동량을 추적하고, `onEnd`에서 속도/거리 임계값으로 닫을지 판단.

```ts
const panGesture = Gesture.Pan()
  .onChange((e) => {
    // 아래 방향 드래그만 허용 (위로는 막음)
    if (e.translationY > 0) translateY.value = e.translationY;
  })
  .onEnd((e) => {
    const shouldClose = e.translationY > 120 || e.velocityY > 800;
    if (shouldClose) {
      translateY.value = withSpring(CLOSED_Y, {}, () => runOnJS(onClose)());
    } else {
      translateY.value = withSpring(0); // 원위치 복귀
    }
  });
```

**바텀 시트를 Modal 대신 absolute 포지셔닝으로 구현한 이유:**
Android에서 `Modal` + `GestureHandler` 조합 시 Pan 제스처가 정상 동작하지 않는 알려진 이슈가 있다. absolute View 방식은 플랫폼 무관하게 안정적으로 동작한다.

---

### 10. 스플래시 흐름 — runOnJS로 비동기 함수 호출

spring 완료 콜백은 worklet 컨텍스트이므로 `async` 함수를 직접 호출할 수 없다. `runOnJS`로 감싸서 JS 스레드에서 실행한다.

```ts
// 스플래시 흐름
opacity.value = withTiming(1, { duration: 600 });
scale.value = withSpring(1, { damping: 10, stiffness: 80 }, (finished) => {
  if (finished) runOnJS(requestAndNavigate)();  // spring 완료 후 실행
});

// JS 스레드에서 실행
const requestAndNavigate = async () => {
  await Location.requestForegroundPermissionsAsync();
  router.replace('/home');
};
```

---

## Phase 6 — 엣지 케이스 처리 요약

| 상황 | 처리 방식 |
|------|----------|
| 위치 권한 거부 | 서울 시청 좌표로 fallback, 배너 안내 |
| 네트워크 에러 | `TypeError` 타입 체크 → 전용 메시지 표시 |
| API 에러 (5xx 등) | 일반 에러 메시지 + 재시도 버튼 |
| 데이터 페칭 중 | Skeleton UI로 레이아웃 흔들림 방지 |
| 한강 수온 실패 | 수온 항목만 숨김 (날씨 데이터는 정상 표시) |
