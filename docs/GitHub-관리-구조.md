# GitHub을 활용한 효과적인 스터디 관리 구조

이 문서는 React Native 스터디를 위한 GitHub 활용 전략을 다룹니다.

## 📁 Repository 구조

```
react-native-study/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── question.md          # 질문 템플릿
│   │   ├── assignment.md        # 과제 제출 템플릿
│   │   └── bug-report.md        # 버그 리포트
│   └── pull_request_template.md # PR 템플릿
│
├── docs/                        # 공식 학습 문서
│   ├── weekly-notes/            # 주차별 학습 자료
│   │   ├── week-01.md
│   │   ├── week-02.md
│   │   └── ...
│   ├── guides/                  # 가이드 문서
│   │   ├── 환경-설정-가이드.md
│   │   ├── Git-워크플로우.md
│   │   └── 코드-리뷰-가이드.md
│   └── troubleshooting/         # 문제 해결 모음
│
├── members/                     # 개인 학습 정리 공간
│   ├── seungyeon/               # 3년차 개발자
│   │   ├── README.md           # 학습 목표, 진행 상황
│   │   ├── week-01/
│   │   │   ├── notes.md        # 학습 노트
│   │   │   ├── code-snippets/  # 코드 스니펫
│   │   │   └── questions.md    # 궁금했던 점
│   │   ├── week-02/
│   │   └── til/                # Today I Learned
│   │       ├── 2026-02-10.md
│   │       └── 2026-02-15.md
│   │
│   ├── soma0078/                # 1년차 개발자
│   │   ├── README.md
│   │   ├── week-01/
│   │   ├── week-02/
│   │   └── til/
│   │
│   └── designer/                # 디자이너
│       ├── README.md
│       ├── week-01/
│       ├── week-02/
│       ├── til/
│       └── design-to-code/      # 디자인→코드 변환 연습
│           ├── practice-01/
│           └── practice-02/
│
├── projects/                    # 실습 프로젝트
│   ├── phase1-basics/
│   ├── phase2-features/
│   └── phase3-team-project/
│
├── shared-knowledge/            # 공동 지식 베이스
│   ├── patterns/                # 발견한 패턴, 베스트 프랙티스
│   ├── common-errors.md         # 자주 발생하는 에러
│   └── tips-and-tricks.md       # 팁 모음
│
└── resources/                   # 학습 자료, 참고 링크
    ├── articles.md
    ├── videos.md
    └── libraries.md
```

## 📚 Wiki 구조

### 1. Home (메인 페이지)

Wiki는 다음과 같은 구조로 구성됩니다:

```markdown
# React Native 스터디 Wiki

## 🎯 스터디 목표

## 📅 스터디 일정

## 👥 멤버 소개

## 📖 빠른 링크

- [주차별 커리큘럼](#)
- [환경 설정 가이드](#)
- [코드 리뷰 가이드](#)
- [Git 워크플로우](#)
```

### 2. 주요 Wiki 페이지

#### Setup & Guidelines

- `환경-설정-가이드`: Expo, Node.js, 에디터 설정
- `Git-워크플로우`: 브랜치 전략, 커밋 컨벤션
- `코드-리뷰-가이드`: 리뷰 체크리스트, 코멘트 방식
- `PR-작성-가이드`: PR 템플릿, 설명 작성법

#### Learning Path

- `Week-01-환경설정`: 학습 목표, 필수 자료, 과제
- `Week-02-React-기초`: 학습 목표, 필수 자료, 과제
- `Week-03-RN-컴포넌트`: 학습 목표, 필수 자료, 과제
- ... (주차별로 계속)

#### Knowledge Base

- `React-Native-기초-개념`: Component, Props, State 등
- `StyleSheet-가이드`: Flexbox, 레이아웃 패턴
- `Navigation-가이드`: React Navigation 사용법
- `상태관리-패턴`: Context, Zustand 등
- `API-연동-패턴`: fetch, React Query

#### Reference

- `추천-학습-자료`: 강의, 블로그, 문서 링크
- `유용한-라이브러리`: 추천 패키지 목록
- `디버깅-팁`: 자주 발생하는 에러 해결법
- `용어-사전`: 기술 용어 정리 (디자이너용)

#### Meeting Notes

- `2026-02-15-스터디-노트`: 주간 미팅 기록
- `2026-02-22-스터디-노트`: 주간 미팅 기록
- ... (매주 작성)

## 📊 GitHub Projects 구조

### Project 1: "스터디 전체 로드맵"

**View 1: Board (칸반 보드)**

```
📋 Backlog | 🏃 In Progress | 👀 Review | ✅ Done
```

**커스텀 필드:**

- **Phase**: Phase 1 / Phase 2 / Phase 3
- **Assignee**: 3년차 / 1년차 / 디자이너 / 전체
- **Difficulty**: 쉬움 / 보통 / 어려움
- **Week**: Week 1-16

**카드 예시:**

- [ ] Week 1 환경 설정
- [ ] Week 2 React 기초 학습
- [ ] Week 5 Navigation 실습
- [ ] 중간 회고 미팅

### Project 2: "Phase 3 팀 프로젝트"

**View 1: Sprint Board**

```
📝 To Do | 🔨 In Progress | 🧪 Testing | ✅ Done
```

**View 2: By Assignee (담당자별)**

- 각 멤버가 맡은 태스크 한눈에 보기

**View 3: Timeline (간트 차트)**

- 프로젝트 일정 시각화

**커스텀 필드:**

- **Priority**: High / Medium / Low
- **Type**: Feature / Bug / Design / Docs
- **Estimate**: 1h / 3h / 1d / 3d
- **Status**: Todo / In Progress / Review / Done

## 🏷️ Labels 체계

### 타입별

- `type: question` 🙋 - 질문
- `type: assignment` 📝 - 과제 제출
- `type: bug` 🐛 - 버그
- `type: feature` ✨ - 새 기능
- `type: docs` 📚 - 문서 작업

### 주차별

- `week-01` ~ `week-16`

### 난이도별

- `difficulty: easy` 🟢
- `difficulty: medium` 🟡
- `difficulty: hard` 🔴

### 담당자별

- `for: 3년차`
- `for: 1년차`
- `for: 디자이너`
- `for: all`

### 상태별

- `status: help-wanted` - 도움 필요
- `status: good-first-issue` - 입문자용
- `status: in-progress` - 진행 중

## 💬 Issues 활용 방식

### Issue 종류

#### 1. 주차별 과제 Issue (매주 생성)

```markdown
Title: [Week 3] RN 기본 컴포넌트 실습
Labels: type: assignment, week-03, for: all

## 학습 목표

- View, Text, ScrollView 이해하기
- Flexbox 레이아웃 익히기

## 과제

1. 프로필 카드 UI 만들기
2. ScrollView로 리스트 구현하기

## 제출 방법

- PR 링크를 코멘트로 남기기
- 스크린샷 첨부

## 참고 자료

- [RN 공식 문서 - Core Components](...)

## 체크리스트

- [ ] 기본 컴포넌트 사용
- [ ] Flexbox 레이아웃 적용
- [ ] 코드 리뷰 완료
```

#### 2. 질문 Issue

```markdown
Title: [질문] Navigation에서 params 전달 방법
Labels: type: question, for: all

## 질문 내용

...

## 시도해본 것

...

## 환경

- Expo SDK: 50
- React Navigation: 6.x
```

#### 3. 스터디 자료 공유 Issue

```markdown
Title: [자료] React Native 성능 최적화 아티클
Labels: type: docs

좋은 자료 발견해서 공유합니다!
링크: ...
```

## 🗣️ Discussions 활용

### 카테고리 구성

**💡 Ideas**

- 프로젝트 아이디어 브레인스토밍
- 새로운 학습 방법 제안

**🎯 Show and Tell**

- 완성한 과제 자랑하기
- 배운 내용 공유하기

**❓ Q&A**

- 자유로운 질문 (Issue보다 가벼운 것들)
- 빠른 도움 요청

**📢 Announcements**

- 스터디 일정 공지
- 중요 변경사항 알림

**💬 General**

- 자유 주제 토론
- 잡담

## 🔄 운영 워크플로우

### 주간 루틴

**월요일**

1. 새로운 주차 Issue 생성 (과제, 학습 자료)
2. Projects에 해당 주 태스크 추가
3. Discussions에 주간 목표 공지

**수요일 (중간 체크)**

1. 진행 상황 댓글로 공유
2. 막히는 부분 Issue/Discussion에 질문

**주말 (미팅 전)**

1. 과제 PR 제출
2. 다른 멤버 PR 리뷰

**일요일 (스터디 미팅 후)**

1. Wiki에 Meeting Note 작성
2. 배운 내용 정리하여 Wiki 업데이트
3. Projects 보드 정리 (Done으로 이동)

## 💡 운영 팁

### 1. Wiki는 지속적으로 업데이트

- 새로 배운 내용, 트러블슈팅은 바로 기록
- 멤버 누구나 편집 가능하게
- 문서는 살아있는 것, 완벽하지 않아도 OK

### 2. Projects는 시각적 진행 상황 파악용

- 매주 미팅 때 함께 보면서 진도 체크
- 막히는 부분 빠르게 파악
- 성취감 느끼기 (Done으로 이동할 때!)

### 3. Issues는 가볍게 활용

- 완벽한 문서보다는 빠른 소통
- 해결되면 Close하고 Wiki로 정리
- 과제, 질문, 버그 등 명확한 용도로 사용

### 4. Discussions는 편하게

- Issue보다 부담 없는 소통 공간
- 아이디어, 고민, 자랑 등 자유롭게
- 커뮤니티 느낌 만들기

### 5. README는 항상 최신 상태로

- 새로운 멤버가 봐도 이해할 수 있게
- Quick Start 가이드 명확하게
- 주요 링크 항상 업데이트

## 📁 개인 학습 정리 활용법

### members/ 폴더 규칙

**자유롭게 푸시**

- PR 없이 본인 폴더는 직접 push 가능
- 형식 자유: 마크다운, 코드, 이미지 뭐든지 OK
- 서로 구경하기: 다른 멤버 폴더 읽기는 자유, 배울 점 많음
- 피드백 환영: Issue나 Discussion으로 질문

### 주차별 노트 작성 예시

```markdown
# Week 1 학습 노트

## 📚 학습한 내용

### Expo 환경 설정

- Expo Go 앱으로 빠른 테스트 가능
- expo-cli vs npx expo start 차이점

## 💡 인사이트

- 웹과 다르게 CSS 속성이 제한적
- Flexbox가 기본 레이아웃

## ❓ 궁금한 점

- [ ] StyleSheet vs inline style 성능 차이?
- [x] Image 컴포넌트 require vs uri 차이 (해결)

## 🔗 참고 자료

- [Expo 공식 문서](...)

## ⏰ 학습 시간

- 이론: 3시간
- 실습: 4시간
```

### TIL (Today I Learned) 활용

```markdown
# 2026-02-10 TIL

## 오늘 배운 것

- JavaScript `map()` 함수 이해
- 리스트 렌더링할 때 key prop 필요

## 오늘 작성한 코드

[코드 스니펫]

## 어려웠던 점

- map 함수 개념 처음에 헷갈림

## 내일 할 것

- FlatList 컴포넌트 실습
```

## 🎨 디자이너 특화 구조

```
members/designer/
├── README.md
├── javascript-basics/       # JS 기초 따로 정리
│   ├── variables.md
│   ├── functions.md
│   └── array-methods.md
├── design-to-code/          # 디자인→코드 연습
│   ├── button-components/
│   │   ├── design.fig
│   │   ├── button.tsx
│   │   └── notes.md
└── ui-library/              # 만든 UI 컴포넌트 모음
    ├── Button.tsx
    └── README.md
```

## 🚀 시작하기

### 1. Labels 생성

GitHub Repository → Issues → Labels에서 위에 정의한 Labels 생성

### 2. Projects 생성

GitHub Repository → Projects → New project → Board 템플릿 선택

### 3. Wiki 활성화

GitHub Repository → Settings → Features → Wiki 체크

### 4. Discussions 활성화

GitHub Repository → Settings → Features → Discussions 체크

### 5. 첫 Issue 생성

"[Week 1] 환경 설정" Issue를 assignment 템플릿으로 생성

### 6. 개인 폴더 세팅

각자 `members/본인이름/README.md` 작성

## 참고 자료

- [GitHub Projects 공식 문서](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Wiki 가이드](https://docs.github.com/en/communities/documenting-your-project-with-wikis)
- [GitHub Discussions 가이드](https://docs.github.com/en/discussions)

---
