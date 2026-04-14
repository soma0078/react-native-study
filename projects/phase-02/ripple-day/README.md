# Ripple Day

현재 날씨를 기반으로 오늘 하루의 최적 활동을 추천해주는 React Native 앱입니다.

## 주요 기능

- **실시간 날씨 조회**: 기상청 단기예보 API를 통해 현재 기온, 습도, 풍속, 강수확률, 하늘 상태를 표시
- **한강 수질 정보**: 서울시 한강 수질 API를 통해 한강대교 기준 수온 표시
- **날씨 기반 활동 추천**: 기온과 강수확률을 분석하여 적합도 순으로 활동 목록 제공
- **활동 상세 & 체크리스트**: 각 활동별 준비물 체크리스트를 Bottom Sheet로 확인
- **동적 배경 그라디언트**: 하늘 상태(맑음/구름/흐림/비)와 시간대(새벽/낮/노을/밤)에 따라 배경색 변화
- **커스텀 스플래시 스크린**: 데이터 로딩 완료 후 자연스러운 페이드인 전환

## 추천 활동 목록

| 활동          | 카테고리 | 적정 온도 |
| ------------- | -------- | --------- |
| 한강 자전거   | 야외     | 10~28°C   |
| 한강 피크닉   | 레저     | 15~30°C   |
| 조깅          | 운동     | 5~25°C    |
| 수영          | 수상     | 25°C 이상 |
| 카페 독서     | 실내     | 전 날씨   |
| 실내 클라이밍 | 실내     | 전 날씨   |

## 기술 스택

- **Framework**: React Native + Expo (SDK 53)
- **Router**: Expo Router (파일 기반 라우팅)
- **Language**: TypeScript
- **주요 라이브러리**:
  - `expo-linear-gradient` — 동적 배경 그라디언트
  - `expo-location` — 위치 권한 관리
  - `expo-splash-screen` — 스플래시 스크린 제어

## 프로젝트 구조

```
ripple-day/
├── app/
│   ├── _layout.tsx        # 루트 레이아웃
│   ├── index.tsx          # 메인 홈 화면
│   └── permission.tsx     # 위치 권한 온보딩
├── components/
│   ├── activity/
│   │   ├── ActivityBottomSheet.tsx  # 활동 상세 시트
│   │   ├── ActivityCard.tsx         # 활동 카드
│   │   └── ActivityList.tsx         # 활동 목록
│   ├── weather/
│   │   └── WeatherSection.tsx       # 날씨 정보 섹션
│   └── ui/
│       ├── NumberTicker.tsx         # 숫자 카운트업 애니메이션
│       ├── SplashScreenView.tsx     # 커스텀 스플래시
│       └── WaveEffect.tsx           # 하단 웨이브 효과
├── hooks/
│   ├── useWeather.ts      # 날씨 & 수질 데이터 페칭
│   └── useLocation.ts     # 위치 권한 상태 관리
├── constants/
│   ├── activities.ts      # 활동 목록 & 추천 로직
│   ├── gradient.ts        # 날씨/시간대별 그라디언트 설정
│   └── mood.ts            # 기온별 메시지 설정
└── types/
    ├── weather.ts          # 날씨 관련 타입
    └── activity.ts         # 활동 관련 타입
```

## 환경 설정

`.env.local` 파일을 프로젝트 루트에 생성하고 기상청 API 키를 설정합니다.

```env
EXPO_PUBLIC_WEATHER_SERVICE_API_KEY=your_api_key_here
```

기상청 API 키는 [공공데이터포털](https://www.data.go.kr)에서 **기상청\_단기예보 ((구)동네예보) 조회서비스**를 신청하여 발급받을 수 있습니다.

## 실행 방법

```bash
# 의존성 설치
npm install

# Expo 개발 서버 실행
npx expo start

# iOS 시뮬레이터
npx expo run:ios

# Android 에뮬레이터
npx expo run:android
```

## API 출처

- [기상청 단기예보 조회서비스](https://www.data.go.kr/data/15084084/openapi.do) — 날씨 데이터
