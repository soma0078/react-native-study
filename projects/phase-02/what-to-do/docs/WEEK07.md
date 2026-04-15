# 7주차 개발 노트 — "오늘 뭐하지?"

## 수행 내용 (Phase 0 ~ 3)

| Phase | 내용                                                                                            |
| ----- | ----------------------------------------------------------------------------------------------- |
| 0     | 패키지 설치 (`@tanstack/react-query`, `ky`, `expo-location`), QueryClient + GestureHandler 세팅 |
| 1     | 위치 권한 요청, 기상청 날씨 API 연동, 홈 화면 날씨 표시                                         |
| 2     | 서울 열린데이터광장 한강 수온 API 연동                                                          |
| 3     | 날씨 조건 기반 활동 추천 카드 UI + 상세 Bottom Sheet                                            |

---

## 폴더 구조

```
app/
  _layout.tsx       # QueryClientProvider + GestureHandlerRootView
  index.tsx         # /home으로 redirect (스플래시는 8주차)
  home.tsx          # 메인 화면
components/
  WeatherSection    # 날씨 정보 표시 (기온, 체감, 습도, 풍속, 수온)
  WeatherSkeleton   # 로딩 중 플레이스홀더
  ActivityCard      # 추천 활동 카드
  ActivityBottomSheet # 활동 상세 모달
hooks/
  useLocation       # 위치 권한 + 좌표
  useWeather        # 날씨 쿼리
  useHangang        # 한강 수온 쿼리
services/
  weather.ts        # 기상청 API 호출 + 파싱
  hangang.ts        # 서울 열린데이터광장 API 호출
lib/
  api.ts            # ky 인스턴스
  geoConverter.ts   # 위경도 → 기상청 격자 좌표 변환
constants/
  weatherCondition  # SKY/PTY 조건 분류, mood 메시지, 그라데이션 색상
  activities        # 조건별 추천 활동 데이터
types/
  weather / hangang / activity
```

---

## 주요 비즈니스 로직

### 1. 위경도 → 기상청 격자 좌표 변환 (`lib/geoConverter.ts`)

기상청 API는 위경도(GPS)가 아닌 고유한 격자 좌표(nx, ny)를 사용한다.
GPS 좌표를 **Lambert Conformal Conic 투영법**으로 변환해야 한다.

```
위경도 (37.5665, 126.978)  →  격자 좌표 (nx: 60, ny: 127)
```

기상청이 공개한 수학 공식을 그대로 구현. 상수값(기준점, 투영 위도 등)은 기상청 문서 기준.

---

### 2. 동네예보 base_date / base_time 계산 (`services/weather.ts`)

기상청 동네예보는 하루 8회 발표된다 (0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300).
발표 후 약 10분이 지나야 데이터가 제공되므로, **현재 시각 - 10분** 기준으로 가장 최근 발표 시각을 선택한다.

```
현재 시각 09:05 → 09:05 - 10분 = 08:55 → base_time: 0800
현재 시각 00:05 → 전날 23:55 → base_date: 전날, base_time: 2300
```

---

### 3. 날씨 상태 분류 (`constants/weatherCondition.ts`)

기상청 API는 날씨 상태를 두 가지 코드로 분리해서 제공한다.

| 코드  | 의미     | 값                                    |
| ----- | -------- | ------------------------------------- |
| `SKY` | 하늘상태 | 1=맑음, 3=구름많음, 4=흐림            |
| `PTY` | 강수형태 | 0=없음, 1=비, 2=비/눈, 3=눈, 4=소나기 |

이 둘을 조합해 앱 내부 조건(`WeatherCondition`)으로 변환한다.

```ts
if (pty !== 0)            → 'rainy'
if (sky === 3 || sky === 4) → 'cloudy'
if (temp >= 28)           → 'hot_sunny'
if (temp >= 20)           → 'warm_sunny'
else                      → 'cool_sunny'
```

이 조건 하나로 mood 메시지 / 배경 색상 / 추천 활동이 모두 결정된다.

---

### 4. 체감기온 계산 (`services/weather.ts`)

기상청 동네예보에는 체감기온 필드가 없어 클라이언트에서 직접 계산한다.

- **기온 ≥ 10°C** → 더위체감지수(Heat Index): 기온 + 습도 기반
- **기온 < 10°C** → 체감온도(Wind Chill): 기온 + 풍속 기반

---

## 주요 RN 패턴

### TanStack Query로 비동기 상태 관리

`useQuery`를 사용해 로딩 / 에러 / 성공 상태를 한 번에 처리한다.
`queryKey`는 `[도메인, 파라미터]` 형태로 작성해 좌표가 바뀌면 자동으로 재요청된다.

```ts
// hooks/useWeather.ts
useQuery({
  queryKey: ["weather", latitude, longitude], // 좌표 변경 시 자동 refetch
  queryFn: () => fetchWeather(latitude, longitude),
  staleTime: 1000 * 60 * 10, // 10분간 fresh 유지
  retry: 2,
});
```

화면에서는 구조분해로 상태를 꺼내 분기 렌더링만 하면 된다.

```tsx
// app/home.tsx
const { data: weather, isLoading, isError, refetch } = useWeather(lat, lon);

if (isLoading) return <WeatherSkeleton />;
if (isError) return <ErrorView onRetry={refetch} />;
return <WeatherSection weather={weather} />;
```

---

### expo-location 위치 권한 흐름

```ts
// hooks/useLocation.ts
const { status } = await Location.requestForegroundPermissionsAsync();

if (status !== "granted") {
  // 권한 거부 → fallback: 서울 시청 좌표로 날씨 요청
  setState({ coords: null, status: "denied" });
  return;
}

const { coords } = await Location.getCurrentPositionAsync();
```

권한 거부를 에러가 아닌 `'denied'` 상태로 처리해, 위치 없이도 앱이 동작하도록 했다.

---

### ky 인스턴스 설계 (`lib/api.ts`)

`ky.create()`로 베이스 URL과 공통 파라미터(API 키)를 한 번만 설정한다.
호출부에서는 엔드포인트와 추가 파라미터만 넘기면 된다.

```ts
export const weatherApi = ky.create({
  prefixUrl: "https://apis.data.go.kr/...",
  searchParams: { serviceKey: process.env.EXPO_PUBLIC_WEATHER_API_KEY! },
});

// 사용 시
weatherApi.get("getVilageFcst", {
  searchParams: { base_date, base_time, nx, ny },
});
```
