## 깃헙 라벨 설정

1. 프로젝트 루트에 `.github/labels.json` 파일 생성
2. `github-label-sync` 패키지를사용하여 라벨 동기화
   - 실행 커맨드 : `npx github-label-sync --access-token <GITHUB_ACCESS_TOKEN> --labels ./labels.json <깃헙계정명>/<레포지토리명>`
   - [라벨 설정 참고](https://dev-thinking.tistory.com/54)

## GitHub Copilot 코드 리뷰 가이드 설정

1. 프로젝트 최상위 경로에 `.github/copilot-instructions.md` 파일 생성
2. 내용 작성 : 해당 파일에 코드 리뷰 시 준수해야 할 규칙 작성
   - [커스텀 지침 설정 참고](https://docs.github.com/ko/copilot/how-tos/configure-custom-instructions/add-repository-instructions)

## Slack Notification Bot 설정 (권장: GitHub 공식 앱)

1. **Slack에 GitHub 앱 통합**
   - Slack 워크스페이스에 공식 [GitHub 애플리케이션](https://slack.github.com/) 설치
2. **채널 연동 및 구독**
   - 알림을 받을 Slack 채널을 열고 봇 초대: `/invite @github`
   - 해당 채널에서 깃헙 레포지토리 알림 구독: `/github subscribe <깃헙계정명>/<레포지토리명>`
   - ⚠️ **주의**: 링크 전체를 넣지 말고 반드시 `계정명/레포지토리명` (예: `soma0078/react-native`) 형식만 입력해야 함
3. **알림 커스터마이징 (선택)**
   - PR, Issue 등의 특정 이벤트만 골라서 받고 싶다면 [커스텀 알림 설정 문서](https://docs.github.com/en/integrations/how-tos/slack/customize-notifications)를 참고하여 세부 설정을 진행할 수 있음

- **과거 방식 (이제 안 써도 됨)**: Slack에서 Webhook URL 생성 ➔ 복사 ➔ GitHub Repo에 붙여넣기 ([참고](https://wikidocs.net/304064))
- **현재 권장 방식 (초간단)**: Slack에 GitHub 공식 앱 설치 ➔ 채널에서 명령어 입력 끝!
