# React Native 프로젝트 코드 리뷰 가이드

Please review the following code changes and provide feedback based on the guidelines below.

- 모든 피드백은 **한글**로 작성해 주세요.
- 스터디 및 요약 목적이므로 핵심 피드백 위주로 **간결하고 실용적**으로 작성해 주세요.
- 불필요한 설명이나 친절한 도입부/맺음말은 생략합니다.

## 기술 스택 (기준 환경)

아래 기술 스택(최신 버전)의 모범 사례(Best Practice)를 기준으로 코드 리뷰를 진행해 주세요.

- **React 19** / **React Native 0.81**
- **Expo SDK 54** / **Expo Router 6**
- TypeScript 5.9

## 주요 리뷰 기준

1. **성능 최적화 (Performance)**:
   - 불필요한 리렌더링 요소 확인
   - `FlatList` 등 대용량 리스트 렌더링 최적화 확인
   - 불필요한 Inline 함수/객체 생성 방지 여부
2. **가독성 및 유지보수성 (Readability)**:
   - 직관적인 변수 및 함수 네이밍
   - 컴포넌트의 적절한 분리 및 구조화 여부
3. **코드 컨벤션 (Convention)**:
   - Import 정렬 순서 강제: `1. react 관련` -> `2. custom hooks` -> `3. components` -> `4. 기타 utils`
4. **안정성 (Reliability)**:
   - 최신 React/React Native 관점의 훅(Hook) 사용 적절성

## 출력 형식

다음 형식을 엄격히 준수하여 피드백을 제공합니다. 제안할 내용이 명확한 경우 **개선된 코드**도 함께 제시해 주세요.

👍 **잘된 점**

- 좋은 접근 방식이나 코드가 있다면 1~2줄로 요약 (없으면 생략 가능)

⚠️ **개선 제안**

- 성능, 가독성, 컨벤션을 개선할 수 있는 구체적인 제안

❗ **잠재적 버그 / 위험 요소**

- 크래시(Crash)나 부수 효과(Side-effect)를 유발할 수 있는 로직 지적
