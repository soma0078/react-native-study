# soma0078-instagram

React Native + Expo로 인스타그램 프로필 화면을 클론한 학습 프로젝트

## 기술 스택

- React Native 0.81.5 / React 19.1.0
- Expo SDK 54 / Expo Router 6.x
- Typescript 5.9.2

## 실행 방법

```bash
npm install
npx start
```

## 구현 화면

### 프로필 탭

- 프로필 헤더 (아바타, 게시물/팔로워/팔로잉 통계, 액션 버튼)
- 하이라이트 가로 스크롤
- 탭 바 (그리드 / 릴스 / 태그됨) — 스와이프 연동 indicator 포함
- 3열 포스트 그리드
  - 탭 → 포스트 상세 이동
  - 롱프레스 → 프리뷰 + 공유/링크복사/보관 액션

### 포스트 상세

- 해당 포스트부터 시작하는 피드 뷰 (FlatList + initialScrollIndex)
- 좋아요 토글 / 더블탭 토글 / 북마크 토글

## 핵심 학습 내용

**SafeAreaView — 노치를 피하지 않으면 텍스트가 가림**

- ⚠️ iOS 노치, 다이나믹 아일랜드, 상태바가 콘텐츠를 덮음
- 💡 안전 영역을 자동으로 계산해서 패딩을 적용

```tsx
// 헤더에만 상단 여백 적용 (하단은 탭 네비게이터가 처리)
<SafeAreaView edges={["top"]}>{/* 헤더 + 콘텐츠 */}</SafeAreaView>
```

---

**그리드 레이아웃 — numColumns로 자동 배열**

- ⚠️ 포스트 목록 3열 그리드 구현
- 💡 FlatList의 `numColumns` 속성으로 자동 생성

```tsx
const ITEM_SIZE = Dimensions.get("window").width / 3;

<FlatList
  data={posts}
  numColumns={3} // 3열 그리드
  scrollEnabled={false} // 부모 ScrollView가 스크롤 담당
  renderItem={({ item }) => (
    <View style={{ width: ITEM_SIZE, height: ITEM_SIZE }}>
      <Image source={{ uri: item.imageUrl }} style={{ flex: 1 }} />
    </View>
  )}
/>;
```

---

**특정 항목부터 시작 — 포스트 상세에서 해당 포스트로 스크롤**

- ⚠️ 포스트 상세 화면에 들어왔는데 맨 처음부터 스크롤됨
- 💡 `initialScrollIndex`로 해당 포스트 위치에서 시작

```tsx
const ITEM_HEIGHT = 400;

<FlatList
  initialScrollIndex={currentPostIndex} // 해당 포스트부터 시작
  getItemLayout={(_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>;
```

`getItemLayout`이 없으면 동작 안 함. 각 항목의 높이를 미리 계산해야 정확히 스크롤 가능

---

**Expo Router — 파일 경로 = URL**

파일 구조가 곧 라우팅 구조 (Next.js App Router와 동일함)

```tsx
// src/app/post/[id].tsx 파일이 /post/g1, /post/g2 등으로 라우팅됨
const { id } = useLocalSearchParams<{ id: string }>();

// 포스트 탭했을 때 상세 화면으로 이동
router.push(`/post/${postId}`);
```

---

**PagerView vs ScrollView + pagingEnabled**

- 🎯 그리드와 릴스 탭을 스와이프로 전환
- 💡 PagerView와 ScrollView 두 가지 방식이 있음

```tsx
// ✅ PagerView: 네이티브 처리 (더 부드러움)
import PagerView from 'react-native-pager-view';

<PagerView
  initialPage={0}
  onPageSelected={e => setActiveIndex(e.nativeEvent.position)}
>
  <View key="page1">{/* 그리드 */}</View>
  <View key="page2">{/* 릴스 */}</View>
</PagerView>

// 대안: ScrollView (추가 패키지 불필요)
<ScrollView horizontal pagingEnabled>
  <View style={{ width: screenWidth }}>...</View>
  <View style={{ width: screenWidth }}>...</View>
</ScrollView>
```

선택 기준: 저사양 Android 지원 필요 → PagerView / 가벼운 콘텐츠 → ScrollView

---

**Modal — 네이티브 다이얼로그 띄우기**

OS 네이티브 모달 (AlertDialog / UIViewController). `visible` prop으로 표시/숨김

```tsx
import { Modal } from "react-native";

const [visible, setVisible] = useState(false);

<Modal
  visible={visible} // true이면 표시, false이면 숨김
  transparent // 배경을 투명하게
  animationType="fade" // 애니메이션 타입('none' | 'slide' | 'fade' )
>
  {/* 모달 콘텐츠 */}
</Modal>;
```

---

**Long Press 프리뷰 — Modal + BlurView**

- 🎯 인스타그램처럼 포스트를 롱프레스했을 때 미리보기와 공유 옵션을 띄워야 함
- 💡 Modal에 BlurView로 배경을 흐리게 하고 콘텐츠 위에 표시

```tsx
import { Modal } from "react-native";
import { BlurView } from "expo-blur";

<Modal visible={preview !== null} transparent animationType="fade">
  {/* 배경 흐림 + 탭하면 닫기 */}
  <TouchableOpacity onPress={close}>
    {/* intensity : 블러 효과 강도 */}
    <BlurView intensity={10} tint="dark" />
  </TouchableOpacity>

  {/* pointerEvents="box-none": 배경 탭도 동작, 버튼 탭도 동작 */}
  <View pointerEvents="box-none">
    <Image source={{ uri: preview.imageUrl }} />
    <View>{/* 공유/링크복사/보관 버튼 */}</View>
  </View>
</Modal>;
```

---

**RefreshControl — Pull to Refresh**

```tsx
const [refreshing, setRefreshing] = useState(false);

const onRefresh = useCallback(() => {
  setRefreshing(true);
  fetchData().finally(() => setRefreshing(false)); // 요청 완료 후 스피너 숨김
}, []);

<FlatList
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>;
```

---

**Share API — OS 네이티브 공유**

```tsx
import { Share } from "react-native";

await Share.share({
  message: "https://instagram.com/p/abc123",
  title: "게시물 공유",
  url: "https://instagram.com/p/abc123", // iOS only
});
```

## 디렉토리 구조

```
src/
├── app/
│   ├── _layout.tsx          # Root Stack (SafeAreaProvider)
│   ├── (tabs)/
│   │   ├── _layout.tsx      # 하단 탭 네비게이터
│   │   └── index.tsx        # 프로필 화면 (진입점)
│   └── post/
│       └── [id].tsx         # 포스트 상세
├── components/
│   ├── ProfileHeader.tsx    # 아바타 + 통계 + 액션 버튼
│   ├── HighlightList.tsx    # 하이라이트 가로 스크롤
│   ├── ProfileTabs.tsx      # 탭 바 + PagerView
│   ├── PostGrid.tsx         # 3열 그리드 + 롱프레스 프리뷰
│   └── PostCard.tsx         # 피드 카드 (좋아요/북마크/더블탭)
├── data/
│   └── mockProfile.ts       # 프로필/하이라이트/그리드 mock 데이터
└── types/
    └── index.ts             # 공유 타입 정의
```
