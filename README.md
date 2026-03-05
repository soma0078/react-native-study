# React Native 스터디 📱

Frontend 개발자와 UX/UI 디자이너가 함께하는 React Native 학습 저장소입니다.

## 👥 스터디 멤버

- **Frontend 3년차**: RN 실무 활용 목표
- **Frontend 1년차**: RN 실무 활용 목표
- **UX/UI Designer**: 동작 원리 이해 및 간단한 코딩 목표

## 🎯 스터디 목표

### Frontend 개발자

- React Native로 독립적인 앱 개발 능력 확보
- 상태 관리, 네비게이션, API 연동 숙달
- 실제 배포 경험

### 디자이너

- React Native 컴포넌트 구조 이해
- 간단한 화면 독립 구현 가능
- 디자인 → 코드 변환 감각 습득

## 📁 저장소 구조

```
react-native-study/
├── .github/              # GitHub 설정 (Issue/PR 템플릿)
├── docs/                 # 공식 학습 문서
│   ├── weekly-notes/     # 주차별 학습 자료
│   ├── guides/           # 가이드 문서
│   └── troubleshooting/  # 문제 해결 모음
├── members/              # 개인 학습 정리 공간
│   ├── seungyeon/        # 3년차 개발자
│   ├── soma0078/         # 1년차 개발자
│   └── designer/         # 디자이너
├── projects/             # 실습 프로젝트
│   ├── phase1-basics/
│   ├── phase2-features/
│   └── phase3-team-project/
├── shared-knowledge/     # 공동 지식 베이스
└── resources/            # 학습 자료
```

## 🚀 Quick Start

### 1. 저장소 클론

```bash
git clone [repository-url]
cd react-native-study
```

### 2. 개인 학습 공간 설정

```bash
# 본인 디렉토리의 README.md 작성
# members/[본인이름]/README.md
```

### 3. 환경 설정

[환경 설정 가이드](docs/guides/환경-설정-가이드.md) 참고

## 📚 학습 방법

### 개인 학습

1. `members/[본인이름]/week-XX/` 에 학습 내용 정리
2. TIL(Today I Learned) 작성 (선택)
3. 궁금한 점은 Issues에 질문

### 과제 제출

1. 과제는 Issues에서 확인
2. 과제용 브랜치 생성: `git checkout -b feature/[이름]-week-XX-과제`
3. 코드 작성 및 커밋
4. PR 생성 및 리뷰 요청(reviewers 할당)

### 지식 공유

1. `shared-knowledge/` 에 공유할 내용 작성
2. PR 생성하여 팀원들과 토론
3. 승인 후 머지

## 🔗 주요 링크

- [Wiki 홈](../../wiki) - 전체 학습 자료
- [Projects](../../projects) - 진행 상황 트래킹
- [Issues](../../issues) - 질문 & 과제
- [Discussions](../../discussions) - 자유 토론

## 📖 필수 문서

- [스터디 커리큘럼](docs/스터디-커리큘럼.md) - 전체 10-14주 로드맵 및 주차별 학습 목표
- [GitHub 관리 구조](docs/GitHub-관리-구조.md) - 이슈/PR/브랜치 운영 방식
- [개인 학습 정리 가이드](docs/개인-학습-정리-가이드.md) - 학습 노트 작성 방법
- [환경 설정 가이드](docs/guides/환경-설정-가이드.md) - 개발 환경 세팅
- [Git 워크플로우](docs/guides/Git-워크플로우.md) - 브랜치 전략 및 커밋 컨벤션
- [코드 리뷰 가이드](docs/guides/코드-리뷰-가이드.md) - PR 리뷰 방법

## 📝 스터디 규칙

### 미팅

- 2주 1회 목요일 대면 (1시간)
- 전주 학습 내용 공유 & 코드 리뷰
- 다음 주 과제 논의

### 커밋 컨벤션

```
type: subject

- type: feat, fix, docs, style, refactor, test, chore
- subject: 간결한 설명
```

예시:

```
feat: Week 3 프로필 카드 컴포넌트 구현
docs: Navigation 가이드 추가
```

## 🏷️ Labels

- `type: question` - 질문
- `type: assignment` - 과제
- `type: bug` - 버그
- `type: feature` - 새 기능
- `type: docs` - 문서

- `week-01` ~ `week-14` - 주차별
- `difficulty: easy/medium/hard` - 난이도
- `for: 3년차/1년차/디자이너/all` - 대상

## 📚 추천 학습 자료

### 공통 필수

- [React Native 공식 문서](https://reactnative.dev/)
- [Expo 공식 문서](https://docs.expo.dev/)

### Frontend 개발자

- React Native - The Practical Guide (Udemy)
- [Infinite Red 블로그](https://infinite.red/blog)

### 디자이너

- [JavaScript for Beginners](https://www.freecodecamp.org/)
- [Expo Snack](https://snack.expo.dev/) - 브라우저에서 실습

## ⚙️ 기술 스택

- React Native
- TypeScript
- Expo
- React Navigation
- (추가 예정)

## 📞 문의

- Issues: 학습 관련 질문
- Discussions: 자유로운 의견 교환
