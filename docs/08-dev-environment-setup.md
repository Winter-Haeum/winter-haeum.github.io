# 1단계: 개발환경 구축

## 🎯 학습 목적

AI 기반 웹 개발을 시작하기 위한 필수 도구(Git, Node.js, Claude Code, VSCode)를 운영체제별로 올바르게 설치하고, VSCode 터미널에서 Claude Code 인증까지 완료하여 AI 개발 환경을 완성한다.

---

## 📖 개념 설명

### 설치할 도구 개요

| 도구 | 역할 | 비고 |
| --- | --- | --- |
| **Git** | 코드 버전 관리 | Windows는 winget으로 설치, Mac은 기본 내장 |
| **Node.js** | JavaScript 실행 환경 | npm 포함 |
| **npm** | 패키지(라이브러리) 설치 관리자 | Node.js 설치 시 함께 제공 |
| **Claude Code** | AI 기반 개발 도구 | npm 전역 설치 후 네이티브 업그레이드 |
| **VSCode** | 코드 편집기 | Claude Code 터미널 실행 환경 |

> **초보자를 위한 보충 설명**
> - `winget`: Windows 10/11에 기본 내장된 패키지 관리자. 명령어 한 줄로 프로그램을 설치할 수 있어 복잡한 설치 과정이 필요 없습니다.
> - `Homebrew`: macOS 전용 패키지 관리자. Mac에는 기본 내장되어 있지 않아 별도 설치가 필요합니다.
> - `npm install -g`: `-g` 플래그는 "global"의 약자로, 특정 프로젝트가 아닌 시스템 전체에서 사용할 수 있도록 설치합니다.

---

## ⚙️ 동작 원리

### 설치 의존 관계

```
Node.js 설치
    └─ npm 자동 포함
           └─ npm install -g @anthropic-ai/claude-code
                    └─ claude install (네이티브 버전으로 업그레이드)
                             └─ claude (실행 및 인증)
```

Git과 Node.js는 독립적으로 설치되며, Claude Code는 Node.js의 npm을 통해 설치됩니다.
Claude Code 설치 후 `claude install`을 실행하면 npm 패키지보다 빠르고 안정적인 네이티브 실행 파일로 업그레이드됩니다.

---

## 💻 예제 코드

---

## 1. Windows 설치 가이드

> Windows 사용자는 PowerShell에서 `winget` 명령어를 사용하여 간편하게 설치할 수 있습니다.

---

### 1-1. winget이란?

```
winget은 Windows 10/11에 기본 내장된 패키지 관리자입니다.

복잡한 설치 과정 없이 명령어 한 줄로 프로그램을 설치할 수 있어요!
```

---

### 1-2. PowerShell 관리자 권한으로 실행

```
Windows 키를 누르고 "PowerShell"을 검색한 후,

"관리자 권한으로 실행"을 선택합니다.
```

---

### 1-3. Git 설치

다음 명령어를 실행하여 Git을 설치합니다.

```powershell
winget install Git.Git
```

---

### 1-4. Node.js 설치

다음 명령어를 실행하여 Node.js를 설치합니다.

```powershell
winget install OpenJS.NodeJS
```

### 설치 후 터미널 재시작 필요

```
Git과 Node.js 설치 후에는 반드시 PowerShell을 닫고 새로 열어야 명령어가 인식됩니다.
```

---

### 1-5. 설치 확인

Git과 Node.js 설치가 완료되었다면 현재 관리자 권한 PowerShell을 닫고 새 PowerShell을 일반 권한으로 실행합니다.

### 현재 PowerShell 창 닫기

```
현재 PowerShell 창을 닫습니다.
```

### 일반 PowerShell 실행

```
Windows 키
→ "powershell" 입력
→ 일반으로 실행
(관리자 권한 X)
```

### 설치 확인 명령어

```powershell
git --version
node --version
npm --version
```

### 정상 설치 시 출력 예시

```
git version 2.x.x

v20.x.x
(Node.js 버전)

10.x.x
(npm 버전)
```

---

### 1-6. npm 명령어 오류 발생 시 해결 방법

npm 명령어가 인식되지 않거나 오류가 발생하는 경우 다음 단계를 따라주세요.

### 1) 오류가 발생한 PowerShell 창 닫기

```
현재 PowerShell 창을 닫습니다.
```

### 2) 관리자 권한 PowerShell 실행

```
Windows 키
→ "powershell" 입력
→ 관리자 권한으로 실행
```

### 3) 실행 정책 변경

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4) 실행 정책 변경 확인

```
실행 정책을 변경하시겠습니까?
```

아래 입력 후 Enter

```
A
```

### 5) 관리자 PowerShell 종료

```
현재 관리자 권한 PowerShell을 닫습니다.
```

### 6) 일반 PowerShell 실행

```
Windows 키
→ "powershell" 입력
→ 일반으로 실행
```

### 7) npm 정상 인식 확인

```powershell
npm --version
```

---

### 1-7. Claude Code 설치

npm을 사용하여 Claude Code를 전역으로 설치합니다.

```powershell
npm install -g @anthropic-ai/claude-code
```

---

### 1-8. Claude Code 설치 확인

설치가 완료되면 다음 명령어로 확인합니다.

```powershell
claude --version
```

---

### 1-9. Windows 설치 완료

```
Git, Node.js, Claude Code 설치가 모두 완료되었습니다.

아래의
"VSCode 설정 및 실행 확인"
섹션으로 진행하세요!
```

---

### Windows 핵심 정리

#### 설치 순서

```
1. PowerShell 관리자 권한 실행

2. Git 설치
winget install Git.Git

3. Node.js 설치
winget install OpenJS.NodeJS

4. PowerShell 재실행

5. 설치 확인
git --version
node --version
npm --version

6. Claude Code 설치
npm install -g @anthropic-ai/claude-code

7. 설치 확인
claude --version
```

#### 설치되는 도구

| 도구 | 설명 |
| --- | --- |
| Git | 코드 버전 관리 도구 |
| Node.js | JavaScript 실행 환경 |
| npm | 패키지 설치 도구 |
| Claude Code | AI 기반 개발 도구 |

---

## 2. Mac 설치 가이드

> macOS 사용자는 Homebrew를 사용하여 설치합니다.
>
> 터미널을 열고 다음 단계를 따라주세요.

---

### 2-1. 시스템 요구사항

```
macOS 10.15 이상

4GB 이상 RAM

인터넷 연결 필요
```

---

### 2-2. 터미널 실행

```
Finder에서 "터미널"을 검색하여 실행합니다.
```

---

### 2-3. Homebrew 설치

Mac에서 개발 도구를 쉽게 설치하기 위해 Homebrew를 먼저 설치합니다.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

### 2-4. Node.js 설치

Homebrew를 사용하여 Node.js를 설치합니다.

> Git은 macOS에 기본 포함되어 있습니다.

```bash
brew install node
```

---

### 2-5. 설치 확인

Node.js와 npm이 정상적으로 설치되었는지 확인합니다.

```bash
git --version
node --version
npm --version
```

---

### 2-6. Claude Code 설치

sudo 명령어를 사용하여 Claude Code를 전역으로 설치합니다.

```bash
sudo npm install -g @anthropic-ai/claude-code
```

---

### 2-7. Password 입력 안내

아래와 같이 표시되면

```
Password:
```

Mac 로그인 비밀번호를 입력합니다.

```
입력 시 화면에 표시되지 않지만

정상적으로 입력되고 있습니다.
```

---

### 2-8. 명령어 인식 문제 해결 (필요시)

Homebrew 환경에서 `claude` 명령어가 인식되지 않는 경우

### 1) 잘못된 심볼릭 링크 제거

```bash
rm /opt/homebrew/bin/claude
```

### 2) 올바른 심볼릭 링크 생성

```bash
ln -s $(npm root -g)/@anthropic-ai/claude-code/bin/claude /opt/homebrew/bin/claude
```

---

### 2-9. Claude Code 설치 확인

설치가 완료되면 다음 명령어로 확인합니다.

```bash
claude --version
```

---

### 2-10. 설치 상태 진단

```bash
claude doctor
```

### claude doctor

```
claude doctor 명령어는

설치 상태를 자동으로 진단하고

문제가 있는 경우
해결 방법을 안내합니다.
```

---

### 2-11. Mac 설치 완료

```
Git, Node.js, Claude Code 설치가 모두 완료되었습니다.

아래의
"VSCode 설정 및 실행 확인"
섹션으로 진행하세요!
```

---

### Mac 핵심 정리

#### 설치 순서

```
1. 터미널 실행

2. Homebrew 설치

3. Node.js 설치

4. 설치 확인
git --version
node --version
npm --version

5. Claude Code 설치
sudo npm install -g @anthropic-ai/claude-code

6. 설치 확인
claude --version

7. 설치 상태 진단
claude doctor
```

#### 설치되는 도구

| 도구 | 설명 |
| --- | --- |
| Git | 코드 버전 관리 도구 (macOS 기본 포함) |
| Node.js | JavaScript 실행 환경 |
| npm | 패키지 설치 도구 |
| Claude Code | AI 기반 개발 도구 |
| Homebrew | Mac 패키지 관리자 |

---

## 3. VSCode 설정 및 실행 확인

> VSCode를 설치하고 터미널 환경을 최적화한 후, Claude Code를 실행하여 인증을 완료합니다.

---

### 3-1. VSCode 설치

VSCode가 설치되어 있지 않다면 아래 사이트에서 다운로드하세요.

```
https://code.visualstudio.com
```

---

### 3-2. 작업 폴더 생성 및 열기

### 1) 작업 폴더 생성

```
바탕화면 또는 원하는 위치에

my_ai_web

폴더를 생성합니다.
```

### 2) VSCode 실행

```
VSCode를 실행합니다.
```

### 3) 폴더 열기

```
File
→ Open Folder
→ my_ai_web 폴더 선택
```

---

### 3-3. 터미널 패널 우측 이동 (권장)

터미널을 우측으로 이동하면 코드 편집 공간이 넓어지고 작업이 편리해집니다.

### 1) 터미널 열기

```
Terminal
→ New Terminal
```

### 2) 터미널 패널의 "Terminal" 탭 우클릭

```
Terminal 탭 우클릭
```

### 3) 우측 이동

```
Move Panel Right
```

선택

---

### 3-4. 터미널 분할 (선택)

여러 터미널을 동시에 사용하려면

```
Split Terminal
```

버튼(분할 아이콘)을 클릭합니다.

### 터미널 분할의 장점

```
터미널을 분할하면

한쪽에서 Claude Code를 실행하고

다른 쪽에서 명령어를 테스트할 수 있어요.
```

---

### 3-5. Claude Code 버전 확인

VSCode 터미널에서 Claude Code가 정상 인식되는지 확인합니다.

```powershell
claude --version
```

### 정상 설치

```
버전 번호가 출력되면 정상입니다.
```

### 인식되지 않는 경우

```
아래 "명령어 인식 문제 해결" 항목을 먼저 진행하세요.
```

---

### 3-6. 네이티브 설치 업데이트

npm 버전에서 성능이 더 좋은 네이티브(Native) 버전으로 업데이트합니다.

```powershell
claude install
```

### 네이티브 설치란?

```
claude install은 npm 패키지 버전보다

빠르고 안정적인 네이티브 실행 파일로 업데이트합니다.

설치 후 ~/.local/bin/ 에 배치되며

성능이 향상됩니다.
```

---

### 3-7. Claude Code 실행

업데이트가 완료되면 Claude Code를 실행합니다.

```powershell
claude
```

---

### 3-8. 명령어 인식 문제 해결 (Windows)

VSCode 터미널에서

```
claude
```

또는

```
npm
```

이 인식되지 않는 경우 아래 PowerShell 스크립트를 실행하면 PATH 환경 변수를 자동으로 설정합니다.

---

### Windows PATH 자동 설정 스크립트

```powershell
# 1. 추가할 경로 리스트 초기화
$pathsToAdd = @()

# 2. Node.js & Git 기본 경로 탐색
$basePaths = @("C:\Program Files\nodejs", "C:\Program Files\Git\cmd")
foreach ($bp in $basePaths) {
    if (Test-Path $bp) { $pathsToAdd += $bp }
}

# 3. Claude Code 네이티브 설치 경로 (핵심)
$claudeNativePath = Join-Path $env:USERPROFILE ".local\bin"
$claudeAppDataPath = "$env:LOCALAPPDATA\Programs\claude-code"

if (Test-Path $claudeNativePath) { $pathsToAdd += $claudeNativePath }
if (Test-Path $claudeAppDataPath) { $pathsToAdd += $claudeAppDataPath }

# 4. npm 관련 경로 (Global Prefix)
try {
    $npmPrefix = (npm config get prefix).Trim()
    if ($npmPrefix -and (Test-Path $npmPrefix)) { $pathsToAdd += $npmPrefix }
} catch {}

$defaultNpmPath = "$env:APPDATA\npm"
if (Test-Path $defaultNpmPath) { $pathsToAdd += $defaultNpmPath }

# --- 경로 등록 로직 (중복 제거 및 영구 적용) ---
$pathsToAdd = $pathsToAdd | Select-Object -Unique

$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$currentUserPaths = $userPath.Split(';', [System.StringSplitOptions]::RemoveEmptyEntries)

$newPaths = $pathsToAdd | Where-Object { $currentUserPaths -notcontains $_ }

if ($newPaths.Count -gt 0) {
    $updatedPath = (($currentUserPaths + $newPaths) | Select-Object -Unique) -join ';'
    [Environment]::SetEnvironmentVariable("Path", $updatedPath, "User")
    Write-Host "PATH 환경 변수에 저장 완료:" -ForegroundColor Green
    $newPaths | ForEach-Object { Write-Host " - $_" }
} else {
    Write-Host "모든 경로가 이미 등록되어 있습니다." -ForegroundColor Gray
}

# --- 현재 터미널 세션에 즉시 반영 ---
$currentSessionPaths = $env:Path.Split(';', [System.StringSplitOptions]::RemoveEmptyEntries)
$env:Path = (($currentSessionPaths + $pathsToAdd) | Select-Object -Unique) -join ';'

# --- 검증 및 경로 분석 로직 ---
Write-Host "
[설치 상태 및 버전 확인]" -ForegroundColor Cyan
Write-Host "--------------------------------"

$claudeCheck = where.exe claude 2>$null
if ($claudeCheck) {
    $firstClaude = ($claudeCheck | Select-Object -First 1)
    Write-Host "Claude 실행 위치: $firstClaude"
    if ($firstClaude -like "*.localin*") {
        Write-Host "현재 '네이티브(Native)' 버전 사용 중" -ForegroundColor Yellow
    } else {
        Write-Host "현재 'npm' 패키지 버전 사용 중" -ForegroundColor Gray
    }
    try {
        $version = claude --version
        Write-Host "Claude 버전: $version"
    } catch {}
} else {
    Write-Host "Claude를 찾을 수 없습니다." -ForegroundColor Red
}

Write-Host "--------------------------------"
Write-Host "Node.js: $(try{node -v}catch{'N/A'})"
Write-Host "npm:     $(try{npm -v}catch{'N/A'})"
Write-Host "Git:     $(try{git --version}catch{'N/A'})"
Write-Host "--------------------------------"
```

---

### 3-9. Windows 스크립트 실행 후

```
스크립트 실행 후

Claude / Node.js / npm 버전이 출력되면 정상입니다.

"Claude를 찾을 수 없습니다."

가 나오면 VSCode를 완전히 닫고 다시 열어서 재시도하세요.
```

---

### 3-10. 명령어 인식 문제 해결 (Mac)

Mac 사용자는 아래 bash 스크립트를 VSCode 터미널에 복사하여 실행하세요.

---

### Mac PATH 자동 설정 스크립트

```bash
#!/bin/bash

# 1. 추가할 경로 리스트 초기화
paths_to_add=()

# 2. Homebrew 경로 탐색
if [ -d "/opt/homebrew/bin" ]; then
    paths_to_add+=("/opt/homebrew/bin")
fi
if [ -d "/usr/local/bin" ]; then
    paths_to_add+=("/usr/local/bin")
fi

# 3. Claude Code 네이티브 설치 경로 (핵심)
claude_native_path="$HOME/.local/bin"
claude_npm_path="$HOME/.npm-global/bin"

if [ -d "$claude_native_path" ]; then
    paths_to_add+=("$claude_native_path")
fi
if [ -d "$claude_npm_path" ]; then
    paths_to_add+=("$claude_npm_path")
fi

# 4. npm 관련 경로 (Global Prefix)
if command -v npm &>/dev/null; then
    npm_prefix=$(npm config get prefix 2>/dev/null)
    if [ -n "$npm_prefix" ] && [ -d "$npm_prefix/bin" ]; then
        paths_to_add+=("$npm_prefix/bin")
    fi
fi

npm_global_default="$HOME/.npm-global/bin"
if [ -d "$npm_global_default" ]; then
    paths_to_add+=("$npm_global_default")
fi

# --- 경로 등록 로직 (중복 제거 및 영구 적용) ---
shell_rc="$HOME/.zshrc"
if [ ! -f "$shell_rc" ]; then
    shell_rc="$HOME/.bashrc"
fi

added_count=0
for p in "${paths_to_add[@]}"; do
    if [[ ":$PATH:" != *":$p:"* ]]; then
        export PATH="$p:$PATH"
        if ! grep -qF "$p" "$shell_rc" 2>/dev/null; then
            echo "export PATH=\"$p:\$PATH\"" >> "$shell_rc"
            echo "  + $p (영구 등록)"
            added_count=$((added_count + 1))
        fi
    fi
done

if [ $added_count -eq 0 ]; then
    echo "모든 경로가 이미 등록되어 있습니다."
fi

# --- Claude 심볼릭 링크 복구 (Homebrew 환경) ---
if ! command -v claude &>/dev/null; then
    npm_root=$(npm root -g 2>/dev/null)
    claude_bin="$npm_root/@anthropic-ai/claude-code/bin/claude"
    if [ -f "$claude_bin" ]; then
        brew_bin="/opt/homebrew/bin"
        if [ -d "$brew_bin" ]; then
            rm -f "$brew_bin/claude"
            ln -s "$claude_bin" "$brew_bin/claude"
            echo "Claude 심볼릭 링크 복구 완료: $brew_bin/claude"
        fi
    fi
fi

# --- 검증 및 경로 분석 로직 ---
echo ""
echo "[설치 상태 및 버전 확인]"
echo "--------------------------------"

claude_path=$(which claude 2>/dev/null)
if [ -n "$claude_path" ]; then
    echo "Claude 실행 위치: $claude_path"
    if [[ "$claude_path" == *".local/bin"* ]]; then
        echo "현재 '네이티브(Native)' 버전 사용 중"
    else
        echo "현재 'npm' 패키지 버전 사용 중"
    fi
    claude --version 2>/dev/null || true
else
    echo "Claude를 찾을 수 없습니다."
    echo "VSCode를 완전히 닫고 다시 열어서 재시도하세요."
fi

echo "--------------------------------"
echo "Node.js: $(node -v 2>/dev/null || echo 'N/A')"
echo "npm:     $(npm -v 2>/dev/null || echo 'N/A')"
echo "Git:     $(git --version 2>/dev/null || echo 'N/A')"
echo "--------------------------------"
```

---

### 3-11. Mac 스크립트 실행 후

```
스크립트 실행 후 터미널을 닫고

VSCode를 재시작하면 PATH 설정이 완전히 적용됩니다.

Homebrew 환경에서 심볼릭 링크도 자동 복구됩니다.
```

---

### 3-12. 인증 과정

Claude Code 최초 실행 시 다음 단계를 순서대로 진행하세요.

### 1) 로그인 옵션 선택

```
Log in with subscription
```

선택

---

### 2) 인증 링크 열기

```
터미널에 표시되는 링크를

Ctrl + 클릭
```

---

### 3) 브라우저 인증

```
Anthropic 계정으로 로그인
```

---

### 4) 인증 코드 복사

```
브라우저에서 생성된 코드를 복사
```

---

### 5) 코드 입력

```
터미널로 돌아가서

코드를 붙여넣고 Enter
```

---

### 3-13. 인증 코드 주의사항

```
인증 코드는 제한 시간이 있으므로 빠르게 진행하세요.

시간이 초과되면 다시

claude

명령어를 실행하세요.
```

---

### 3-14. 개발환경 구축 완료

```
축하합니다!

Git, Node.js, Claude Code 설치와

VSCode 설정이 모두 완료되었습니다.

이제 AI와 함께 웹 개발을 시작할 준비가 되었어요!
```

---

### VSCode 핵심 정리

#### VSCode 설정 순서

```
1. VSCode 설치

2. my_ai_web 폴더 생성

3. VSCode에서 폴더 열기

4. 터미널 우측 이동

5. 터미널 분할 (선택)

6. Claude 버전 확인

7. claude install

8. claude 실행

9. 로그인 인증

10. 개발 시작
```

#### 이번 단계 목표

```
VSCode 안에서

Claude Code를 실행하고

인증까지 완료하여

AI 개발 환경을 완성한다.
```

---

## ⚠️ 주의사항

### 공통

- Git과 Node.js 설치 후 반드시 터미널을 닫고 새로 열어야 명령어가 인식됩니다.
- 인증 코드는 제한 시간이 있으므로 빠르게 진행해야 합니다. 시간 초과 시 `claude` 명령어를 다시 실행하세요.

### Windows

- `Set-ExecutionPolicy` 변경은 관리자 권한 PowerShell에서만 가능합니다.
- PATH 설정 스크립트 실행 후 `"Claude를 찾을 수 없습니다."`가 나오면 VSCode를 완전히 닫고 재시작하세요.
- `claude install` 실행 후 PATH 설정이 자동 변경되므로 VSCode 터미널 재시작이 필요할 수 있습니다.

### Mac

- `sudo npm install` 시 비밀번호 입력 화면에서는 타이핑해도 화면에 표시되지 않습니다. 정상적으로 입력되고 있으니 입력 후 Enter를 누르세요.
- Homebrew 환경에서 `claude` 명령어가 인식되지 않으면 심볼릭 링크가 깨진 것이므로 2-8항의 링크 재생성 단계를 진행하세요.
- Mac PATH 설정 스크립트 실행 후 VSCode를 재시작해야 변경사항이 완전히 적용됩니다.

---

## 📝 핵심 정리

### 전체 설치 흐름 비교

| 단계 | Windows | Mac |
| --- | --- | --- |
| 패키지 관리자 | winget (기본 내장) | Homebrew (별도 설치 필요) |
| Git | `winget install Git.Git` | 기본 내장 |
| Node.js | `winget install OpenJS.NodeJS` | `brew install node` |
| Claude Code | `npm install -g @anthropic-ai/claude-code` | `sudo npm install -g @anthropic-ai/claude-code` |
| 설치 확인 | `claude --version` | `claude --version` / `claude doctor` |
| 네이티브 업그레이드 | `claude install` | `claude install` |

### 문제 발생 시 체크리스트

```
1. 터미널을 닫고 새로 열었는가?
2. VSCode를 완전히 닫고 재시작했는가?
3. PATH 설정 스크립트를 실행했는가?
4. Windows: 실행 정책(ExecutionPolicy)을 변경했는가?
5. Mac: 심볼릭 링크가 올바르게 연결되어 있는가?
```

---

## 🔗 참고 자료

- [VSCode 공식 다운로드](https://code.visualstudio.com)
- [Node.js 공식 사이트](https://nodejs.org)
- [Homebrew 공식 사이트](https://brew.sh)
- [Claude Code 공식 문서](https://docs.anthropic.com/claude-code)

---

> **다음 문서**: 2단계 — 통합 세팅 및 첫 수업 준비
