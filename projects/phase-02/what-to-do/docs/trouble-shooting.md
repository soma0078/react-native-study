# 트러블 슈팅

## 1. 위치 조회 실패 — Race Condition

### 에러

```
Error: Current location is unavailable. Make sure that location services are enabled
```

### 원인

`_layout.tsx`에서 권한을 요청하는 동안 `useLocation` 훅도 동시에 마운트되어 권한 상태를 확인함.
권한이 아직 `undetermined` 상태이면 `granted`가 아니므로 DENIED로 처리되고, 이후 재조회가 없어 위치 조회가 실패함

### 해결

`useLocation` 내부에서 `getForegroundPermissionsAsync` 대신 `requestForegroundPermissionsAsync`를 직접 호출.
`_layout.tsx`에서는 권한 요청 로직 제거

### 권한 흐름

**수정 전**

```
_layout.tsx                          useLocation.ts
─────────────────────────────────    ──────────────────────────────────
requestForegroundPermissionsAsync()  ← 동시에 마운트
        │                            getForegroundPermissionsAsync()
        │ (아직 진행 중)               → status: "undetermined"
        │                            → granted 아님 → DENIED ❌
        ↓
   권한 다이얼로그 표시
        ↓
   사용자 허용
        ↓
   SplashScreen.hideAsync()          (재조회 없음 → 위치 조회 실패)
```

**수정 후**

```
_layout.tsx                          useLocation.ts
─────────────────────────────────    ──────────────────────────────────
SplashScreen.hideAsync()             requestForegroundPermissionsAsync()
                                             │
                                      권한 다이얼로그 표시
                                             │
                                       사용자 허용/거부
                                             │
                                    granted ─┬─ denied
                                             │         └→ DENIED
                                   getCurrentPositionAsync()
                                             │
                                   reverseGeocodeAsync()
                                             │
                                          GRANTED ✅
```

---

## 2. 시뮬레이터/에뮬레이터 위치 미설정

### 원인

권한은 `granted`이지만 OS 레벨에서 위치를 제공하지 못해 발생함

### iOS Simulator

- 메뉴 `Features > Location > Custom Location...`
- 위도 `37.5665` / 경도 `126.9780` 입력

### Android Emulator

- 사이드바 `...` → `Location` 탭 → Seoul 검색 후 `SET LOCATION`
- 에뮬레이터 내부 `Settings > Location` 토글 ON 확인
- Google Maps 앱을 먼저 실행해 Fused Location Provider 워밍업 후 앱 재실행

---

## TIP

Metro 터미널에서 `r` 키를 눌러 강제 리로드
