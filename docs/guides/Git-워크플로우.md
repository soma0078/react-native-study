# Git 워크플로우

## 브랜치 전략

```
main (배포 브랜치)
  └── develop (개발 브랜치)
       ├── feature/[이름]-[기능명]
       ├── fix/[이름]-[버그명]
       └── docs/[문서명]
```

## 브랜치 네이밍 규칙

### Feature 브랜치

```bash
feature/[이름]-week-[주차]-[과제명]
# 예: feature/junior-week-03-profile-card
```

### Fix 브랜치

```bash
fix/[이름]-[버그명]
# 예: fix/seungyeon-navigation-error
```

### Docs 브랜치

```bash
docs/[문서명]
# 예: docs/navigation-guide
```

## 커밋 메시지 컨벤션

### 기본 형식

```
type: subject

body (선택)
```

### Type 종류

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드, 설정 파일 수정

### 예시

```bash
feat: Week 3 프로필 카드 컴포넌트 구현

- ScrollView로 리스트 렌더링
- Flexbox 레이아웃 적용
- 이미지 컴포넌트 추가
```

```bash
docs: Navigation 가이드 문서 추가
```

```bash
fix: TextInput 키보드 가림 현상 해결
```

## 작업 플로우

### 1. 과제 작업 시작

```bash
# 최신 코드 받기
git checkout main
git pull origin main

# 새 브랜치 생성
git checkout -b feature/[이름]-week-XX-[과제명]
```

### 2. 작업 및 커밋

```bash
# 작업 진행
# ...

# 변경사항 확인
git status
git diff

# 스테이징
git add .

# 커밋
git commit -m "feat: 프로필 카드 구현"
```

### 3. 원격 저장소에 푸시

```bash
git push origin feature/[이름]-week-XX-[과제명]
```

### 4. PR 생성

1. GitHub에서 Pull Request 생성
2. 템플릿에 따라 내용 작성
3. 리뷰어 지정
4. Labels 추가

### 5. 코드 리뷰

- 리뷰어는 코멘트 남기기
- 수정 요청 시 같은 브랜치에서 추가 커밋
- 승인 받으면 머지

### 6. 브랜치 정리

```bash
# 로컬 브랜치 삭제
git branch -d feature/[이름]-week-XX-[과제명]

# 원격 브랜치 삭제 (GitHub에서 자동 삭제 가능)
git push origin --delete feature/[이름]-week-XX-[과제명]
```

## 개인 학습 정리

### members/ 폴더는 직접 푸시 가능

```bash
# 개인 학습 노트 작성 후
git add members/[본인이름]/
git commit -m "docs: Week 3 학습 노트 추가"
git push origin main
```

개인 폴더는 PR 없이 바로 main에 푸시해도 됩니다!

## 충돌 해결

### 충돌 발생 시

```bash
# main 브랜치의 최신 변경사항 가져오기
git checkout main
git pull origin main

# 작업 브랜치로 돌아가기
git checkout feature/[브랜치명]

# main의 변경사항 병합
git merge main

# 충돌 파일 수정
# ...

# 충돌 해결 후 커밋
git add .
git commit -m "merge: main 브랜치와 충돌 해결"
git push origin feature/[브랜치명]
```

## 유용한 Git 명령어

### 브랜치 관련

```bash
# 현재 브랜치 확인
git branch

# 모든 브랜치 확인 (원격 포함)
git branch -a

# 브랜치 전환
git checkout [브랜치명]

# 브랜치 생성 및 전환
git checkout -b [새브랜치명]
```

### 커밋 관련

```bash
# 마지막 커밋 메시지 수정
git commit --amend

# 특정 파일만 스테이징
git add [파일명]

# 변경사항 임시 저장
git stash

# 임시 저장한 내용 복원
git stash pop
```

### 히스토리 확인

```bash
# 커밋 로그 보기
git log

# 간단한 로그
git log --oneline

# 그래프로 보기
git log --graph --oneline --all
```

## 주의사항

1. **main 브랜치에서 직접 작업 금지** (개인 폴더 제외)
2. **큰 파일(이미지, 동영상)은 주의해서 커밋**
3. **민감한 정보(.env, API 키 등) 절대 커밋 금지**
4. **커밋은 작은 단위로 자주**
5. **의미 있는 커밋 메시지 작성**

## 트러블슈팅

### 실수로 main에 커밋한 경우

```bash
# 커밋 취소 (변경사항은 유지)
git reset HEAD^

# 새 브랜치 생성 및 전환
git checkout -b feature/[브랜치명]

# 다시 커밋
git add .
git commit -m "커밋 메시지"
```

### 푸시 후 커밋 메시지 수정하고 싶은 경우

```bash
# 마지막 커밋 메시지 수정
git commit --amend

# 강제 푸시 (주의: 협업 시 팀원과 상의 필요)
git push origin [브랜치명] --force
```

## 도움이 필요하면

- GitHub Issues에 질문 올리기
- 스터디 미팅에서 같이 해결하기
- [Git 공식 문서](https://git-scm.com/doc) 참고
