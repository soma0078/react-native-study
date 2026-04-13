# seungyeon-diary

React Native(Expo)로 만든 감정 일기 앱입니다.  
날씨·기분을 기록하고, 하루를 글로 남길 수 있습니다.

---

## 화면 구성

| 화면 | 경로 | 설명 |
|------|------|------|
| 일기 목록 | `/` | 작성한 일기 카드 리스트, FAB 버튼으로 작성 시작 |
| 작성 1단계 | `/write/step1` | 날짜 · 날씨 · 기분 선택 |
| 작성 2단계 | `/write/step2` | 제목 · 본문 입력 후 저장 |
| 일기 상세 | `/detail/[id]` | 일기 조회 · 수정 · 삭제 |

---

## 주요 기능

- **2단계 작성 흐름** — 기본 정보(날씨·기분) → 본문 작성 순서로 진행
- **일기 수정** — 상세 화면에서 모든 필드 인라인 편집
- **일기 삭제** — 목록 카드 스와이프 or 상세 화면에서 삭제
- **로컬 저장** — `AsyncStorage`로 기기에 영구 저장
- **햅틱 피드백** — 주요 인터랙션에 진동 피드백
- **완료 모달** — 저장 후 목록/상세로 이동 선택

---

## 프로젝트 구조

```
app/
├── _layout.tsx          # 루트 스택 레이아웃
├── index.tsx            # 일기 목록 (홈)
├── write/
│   ├── _layout.tsx      # 작성 폼 Context Provider
│   ├── step1.tsx        # 날짜·날씨·기분 선택
│   └── step2.tsx        # 제목·본문 입력
└── detail/
    └── [id].tsx         # 일기 상세·수정·삭제

components/
├── DiaryCard.tsx        # 목록 카드
├── EmptyState.tsx       # 일기 없을 때 빈 화면
├── MoodSelector.tsx     # 기분 선택 (1~5)
├── WeatherSelector.tsx  # 날씨 선택
├── DatePickerField.tsx  # 날짜 선택
├── ProgressBar.tsx      # 작성 단계 진행 표시
└── CompletionModal.tsx  # 저장 완료 모달

hooks/
└── useDiaries.ts        # 일기 CRUD + AsyncStorage

types/
└── diary.ts             # DiaryEntry, WriteFormState 타입 정의

constants/
└── theme.ts             # 색상, 간격, 날씨·기분 옵션 상수
```

---

## 데이터 타입

```ts
type Weather = "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
type Mood = 1 | 2 | 3 | 4 | 5;

interface DiaryEntry {
  id: string;
  date: string;       // 'YYYY-MM-DD'
  weather: Weather;
  mood: Mood;
  title: string;
  content: string;
  createdAt: number;  // Date.now()
}
```

---

## 시작하기

```bash
npm install
npx expo start
```

---

## 기술 스택

- **React Native** 0.81 / **React** 19
- **Expo** ~54 / **Expo Router** ~6
- **TypeScript** ~5.9
- **AsyncStorage** — 로컬 데이터 영구 저장
- **expo-haptics** — 햅틱 피드백
- **@react-native-community/datetimepicker** — 날짜 선택
