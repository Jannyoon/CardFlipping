# 카드 뒤집기 게임 (Card Flip Game)
<img src="https://github.com/user-attachments/assets/ecdd86af-1dd5-4875-83bf-6ab4579e5555" width=500>

## FE STACK
- React, Next.js (App Router), TypeScript, TailwindCSS, SCSS
- 상태 관리: Context API, Zustand, TanStack Query

## 폴더 구조
```
├── app                    # 각 페이지 및 API Route 함수 관련 디렉토리
│   ├── (auth)             # 로그인 및 회원가입 페이지
│   ├── api                # API Route 함수 (예: result, user)
│   ├── game               # 게임 페이지 및 관련 컴포넌트
│   └── ranking            # 랭킹 페이지 및 관련 컴포넌트
│<br/>
├── common                 # 공통 컴포넌트, 리소스 및 서버-side 로직
│   ├── lib                # 서버-side 공통 기능 및 DB 연결 관리
│   ├── modal-component    # 모달 컴포넌트 및 웹 워커
│   ├── scss               # 전역 SCSS 파일
│   └── util               # 유틸리티 함수들 (시간 계산, 카드 셔플 등)
│
├── mocks                  # MSW (Mock Service Worker) 관련 설정
└── store                  # Zustand 상태 관리
```
  
## 프로젝트 소개
화면에 나타나는 카드들을 클릭하여 짝을 맞추는 방식으로 진행되는 카드 뒤집기 웹게임입니다. 
사용자 로그인 & 회원가입이 가능하며 비회원도 게임에 참여할 수 있습니다.
반응형 레이아웃 디자인으로 모바일 환경에선 메인 페이지가 다음과 같이 나타납니다.

<img src="https://github.com/user-attachments/assets/3869841b-9f1b-4097-bf04-bc3819749175" height=400>

## 기능
**로그인 & 회원가입** 
- Clerk 인증을 활용하여 유저 로그인 및 회원가입 기능을 구현하였습니다.
- 유저 정보는 Supabase DB에 저장되고, Prisma ORM을 통해 데이터 관리가 이루어집니다.
<br/>

**카드 뒤집기**
- 사용자는 게임에서 카드를 뒤집어 짝을 맞추는 방식으로 진행합니다.
- 레벨이 높아질수록 뒤집어야 하는 카드의 수가 늘어납니다.
<br/>

**타이머** 
- 게임 타이머 기능으로 사용자의 게임 진행 시간을 기록합니다.
<img src="https://github.com/user-attachments/assets/4634f82d-4d12-4ea4-b9a5-edb41bdf05be" width=600>
<br/>
<br/>

**게임 완료** 
- 모든 카드를 맞추면 게임이 종료됩니다.
- 이번 회차의 게임 진행 시간과 이전에 저장되어 있는 사용자의 최단 시간 기록을 보여줍니다. 기존의 기록보다 더 빠른 시간으로 게임을 완료하면 **신기록**으로 표시됩니다.
<img src="https://github.com/user-attachments/assets/6f3397f3-2a4b-462d-aede-0e89ae65f201" width=600>
<br/>
<br/>


**리셋 기능** 
- 사용자가 게임을 다시 시작할 수 있도록 리셋 기능을 제공합니다.
- 게임을 리셋하면 카드들이 다시 뒤집히며, 이전의 진행 상태가 초기화됩니다.
<br/>

**랭킹 페이지** 
- 유저들의 게임 기록과 레벨 별 순위를 확인할 수 있는 페이지입니다.
- 기록을 불러오는 동안 Skeleton UI와 로딩 중 피드백을 제공하여 사용자 경험을 개선하였습니다.
- 무한 스크롤(Lazy Loading) 방식으로 데이터를 불러옵니다.
<img src="https://github.com/user-attachments/assets/d5ab8d97-44b7-405f-b05e-a92c6b10601c" width=600>
<img src="https://github.com/user-attachments/assets/20dd41e2-a341-4848-a86b-f417e127a64c" width=600>
<br/>
<br/>

## 상세 구현 내용
### 이미지 처리 성능 최적화 (Web Worker 사용)
- 게임에서 카드 이미지를 처리할 때 **Web Worker**를 사용하여 메인 스레드에서의 부하를 줄였습니다.
- **OffscreenCanvas**를 사용하여 Worker 스레드에서 비동기 처리로 이미지 변환 작업을 실행하고 **Promise.all**을 활용하여 여러 이미지를 병렬 처리했습니다.
- 이미지 확장자를 **WebP로 변환** + **손실 압축**으로 기존 이미지의 용량을 약 36% 감소시켰습니다.
<img src="https://github.com/user-attachments/assets/85aaeae3-5461-456c-a51c-222f30deee73" width=600>
<br/>
<br/>


### 카드 셔플 
Fisher-Yates Shuffle 알고리즘을 사용하여 O(N)의 시간복잡도로 카드 무작위 섞기를 최적화했습니다.
<br/>
<br/>



### Zustand 상태 관리
Zustand에서 Selector Pattern과 Shallow 비교 함수를 사용하여, 필요한 State만 구독하고 해당 State가 변경될 때만 컴포넌트가 리렌더링되도록 최적화했습니다.
React Context API와 달리, Zustand는 선택적 구독이 가능해 불필요한 리렌더링을 방지할 수 있으며, 전역 상태를 간편하게 관리할 수 있는 장점이 있습니다.
다만 Zustand의 store는 메모리 기반이기 때문에 새로고침 시 데이터가 초기화되는 단점이 있습니다. 
이를 보완하기 위해 필요한 경우 localStorage를 연동하여 상태를 지속적으로 유지할 수 있도록 구현했습니다.
<br/>
<br/>


### Tanstack Query + Intersection Observer를 사용한 무한 스크롤
Tanstack Query Stale Time을 설정해서 데이터를 캐싱하여 서버 요청을 최소화했습니다.
Intersection Observer를 함께 활용하여 특정 영역이 Inview=true면 다음 페이지를 불러오는 방식입니다.
queryFn에 연결된 함수는 다음 페이지 데이터를 db에서 가져오는데 Server Action 기반으로 데이터를 전송받기 때문에 데이터의 신뢰성을 보장할 수 있습니다.
<br/>
<br/>


### 웹 성능 테스트 및 개선
Lighthouse를 사용하여 성능을 측정하고, FCP, LCP, CLS, TBT를 기준으로 최적화 작업을 진행했습니다. <br/>
코드 스플리팅 및 지연 로딩(Lazy Loading)을 적용하여 초기 로딩 시간을 최적화하고, ssr:false 옵션을 활용해 사용자 인터랙션 전에 필요한 리소스만 로드되도록 했습니다.<br/>
또한 페이지 전환 시 초기에 사용자에게 보여질 UI를 빈 태그가 아닌 의미있는 데이터(First Meaningful Paint)를 미리 지정하여 hydration 과정에서 생길 mismatch를 줄였습니다.<br/>
위 최적화 과정들을 거쳐 페이지 전환 딜레이 이슈를 해결하였고 성능 지표 점수를 향상시켰습니다.<br/>
- Lighthouse Performance : 70점 → 85점 → 96점
- TBT : 1380ms → 450ms → 0
- 이후 페이지 전환 시 사용자 체감 속도가 크게 향상됨.
<br/>
<br/>



