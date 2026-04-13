# CLAUDE.md

## 앱 개요

날씨 + 한강 수온 확인 및 날씨 기반 활동 추천 앱

## 기술 스택

Expo SDK 54, expo-router, TanStack Query, ky, Reanimated 4, expo-location

## 폴더 구조

```
app/           # 스크린 (expo-router)
components/    # UI 컴포넌트
hooks/         # 커스텀 훅
services/      # API 호출 함수
lib/           # 공통 설정 (ky 인스턴스 등)
constants/     # 정적 데이터 및 조건 매핑
types/         # 타입 정의
```

## 컨벤션

- 임포트 경로는 `@/*` alias를 사용한다. 상대경로(`../`)는 쓰지 않는다.
- API 키는 `.env`의 `EXPO_PUBLIC_*` 형식으로 저장한다.
- `queryKey`는 `[도메인, 파라미터]` 형태로 작성한다.
