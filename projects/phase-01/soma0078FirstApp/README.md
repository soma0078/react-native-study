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

```
app/
├── _layout.tsx        # Root Stack Navigator
├── +not-found.tsx     # 404 페이지
└── (tabs)/
    ├── _layout.tsx    # Bottom Tab Navigator
    ├── index.tsx      # Home
    ├── about.tsx      # About
    └── profile.tsx    # Profile
```

## todo

- [ ] `Home`, `About` 화면 UI 구현
- [ ] Expo SDK 주요 라이브러리 연동 (Camera, ImagePicker 등)
- [ ] React Native 애니메이션 적용 (`Reanimated`)
- [ ] 전역 상태 관리 및 테마 설정 (`Appearance`, `Context API`)
- [ ] 제스처 인터랙션 구현 (`Gesture Handler`)
