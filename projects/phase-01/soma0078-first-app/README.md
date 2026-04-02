# soma0078-first-app

React Native core components와 expo 라이브러리를 활용한 실습 프로젝트

## 기술 스택

- React Native 0.81 / React 19
- Expo SDK 54 / Expo Router
- TypeScript

## 실행 방법

```bash
npm install
npm start
```

## 구현 사항

- [x] 프로필 화면
  - 프로필 정보 (닉네임 / 이름 / 직무)
  - Interests 섹션 (chip UI, Pressable)
  - Skills 섹션 (SectionList + 2열 카드 그리드)
- [x] 레이아웃 패턴
  - 배경 이미지 + 프로필 이미지 오버랩 (ImageBackground, Image)
  - 카드 (infoCard)
  - 칩 (chip)
  - 그리드 (2열 카드)

## 프로젝트 구조

```text
src/app
 ├── _layout.tsx                          # 최상위 Stack 네비게이터
 ├── +not-found.tsx                       # 404 페이지
 │
 └── (drawer)                             # Drawer (사이드바) 네비게이터
      ├── _layout.tsx                     # Drawer 구성 및 설정
      │
      ├── (tabs)                          # Bottom Tabs 네비게이터
      │    ├── _layout.tsx                # 하단 탭바 설정 (Home, Recipes, Profile)
      │    ├── index.tsx                  # Home 탭
      │    ├── profile.tsx                # Profile 탭
      │    │
      │    └── recipes                    # Recipes 관련 화면 (Stack)
      │         ├── _layout.tsx           # Stack 네비게이터
      │         ├── index.tsx             # 레시피 목록 화면
      │         └── [id].tsx              # 특정 레시피 상세 화면 (동적 라우트)
      │
      └── settings                        # Settings 화면
           ├── _layout.tsx                # Stack 네비게이터
           └── index.tsx                  # 설정 메인 화면
```

## todo

- [ ] `Home`, `About` 화면 UI 구현
- [ ] Expo SDK 주요 라이브러리 연동 (Camera, ImagePicker 등)
- [ ] React Native 애니메이션 적용 (`Reanimated`)
- [ ] 전역 상태 관리 및 테마 설정 (`Appearance`, `Context API`)
- [ ] 제스처 인터랙션 구현 (`Gesture Handler`)
