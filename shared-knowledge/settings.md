## 깃헙 라벨 설정

1. 프로젝트 루트에 `.github/labels.json` 파일 생성
2. `github-label-sync` 패키지를사용하여 라벨 동기화
   - 실행 커맨드 : `npx github-label-sync --access-token <GITHUB_ACCESS_TOKEN> --labels ./labels.json <깃헙계정명>/<레포지토리명>`
   - [라벨 설정 참고](https://dev-thinking.tistory.com/54)
