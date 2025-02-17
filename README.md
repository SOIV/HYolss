SOIV_Studio-Project_BOT-C_2020~2025
# Discord_BOT_HYolss
HYolss는 개인이 사용하기 위해 제작된 디스코드 봇입니다.

코딩을 해본적이 없는 사람이라 코드가 무척 지저분할 수 있으니 양해바랍니다.

## 안내사향
HYolss는 이 디스코드 봇을 만든 제작자의 개인 전용 디스코드 봇이며

그 외에 제작자가 추가하지 않거나 허락되지 않은 서버에는 사용이 불안할 수 있습니다.

> [!] 현제 봇 구동은 24시간제 구동 상태가 아님니다. (봇을 구동할 호스팅업체 검색중)

# 봇 기능!
## 주요 작동 방식
- Embed
- Message Component
- 슬래시 명령어 [ / ]
- 접두사 명령어 [ ! or = ] (일부 기능에서만 사용)

## 기본 메인 서비스 (기능 및 명령어)
0. **봇 관리용 대시보드**
    - SOIV_Studio-Project_BOT 에서 제작된 모든 디스코드 봇을 관리가 가능한 대시보드 입니다.
- - -
1. **핑 상태 [ping, 핑]** / 슬래시 명령어 [ / ]
    - ping을 사용하면 Pong! 하며 서버와의 핑을 알려줘요!
- - -
2. **명령어 안내 [help]** / 슬래시 명령어 [ / ]
    - 추가 적으로 설명이 필요한 명령어를 위해 존재하는 help 명령어 입니다. / 명령어 제작 예정
- - -
3. **봇 정보, 내 정보** / 슬래시 명령어 [ / ]
    - 봇 상태와 기본적인 정보를 표시 해드립니다! / 명령어 제작 예정
    - 나의 디스코드 정보와 서버 입장 날짜 등을 알려줍니다. / 명령어 제작 예정
- - -
4. **AI chat (LLM/GPT)** / 슬래시 명령어 [ / ], 대시보드 일부 지원(일부 설정을 위해 필요)
    - LLM을 사용한 AI chat 서비스입니다, 제작 예정 불문 명함
    - AI chat 전용 채팅창 필요, 서비스 사용에 대한 충돌 및 버그 발생을 줄이기 위함
- - -
5. **오늘의 메뉴, 오늘의 편의점** / 슬래시 명령어 [ / ]
    - 어떤걸 먹을지 고민중인 여러분에게 메뉴를 추천해드립니다! / 메뉴 추가는 개발자 전용 명령어 입니다.
- - -
6. **방송 알림, 영상 업로드 알림** / 슬래시 명령어 [ / ], 대시보드 지원
    - 방송 알림, 영상 업로드 알림 등을 전송 해주는 명령어입니다. / 시스템 및 명령어 제작 예정
    - **[!]** 지원 플렛폼은 언제나 추가 또는 삭제가 될 수 있습니다
    - 방송 알림 지원 플렛폼 : 트위치(Twitch), 치지직(CHZZK), 숲(SOOP), 유튜브(Youtube)
    - 영상 업로드 알림 지원 플렛폼 : 유튜브(Youtube), 니코니코 동화(NICONICO,ニコニコ動画), 비미모(Vimeo)
- - -
7. **SNS 알림** / 슬래시 명령어 [ / ], 대시보드 지원
    - 여러 SNS 서비스의 API를 사용하여 알림을 띄워줌니다.
    - 서비스 및 명령어 제작 불분 명함 / API 서비스에 대한 문제로 인한
    - SNS 알림 지원 플렛폼 : X(Twitter), 인스타그램(instagram), Bluesky
- - -
8. **그외 디스코드 서버 관리를 위한 모든 기능들** / 슬래시 명령어 [ / ], 대시보드 지원
    - 지금까지 디스코드 봇들에게서 보였던 좋았거나 장점이 보이는 모든 명령어와 기능들을 한곳에서 사용할 수 있다!
    - 제작될 기능 리스트 : -(작성 대기중)

## 개발자 전용 서비스 (기능 및 명령어)
0. **개발자 전용 대시보드**
    - 기본 대시보드에서 개발자 및 관련된 사람만 입장 가능한 대시보드
- - -
1. **개발자 문의, 개발자 공지 등 개발자가 봇으로 전달하는 기능**
    - 명령어 및 봇 대시보드에서 개발자에게 문의 및 개선사항 문의

# 봇 입장!
## 봇 입장시 기본 안내 문구 (EMbed)
```
# HYolss가 유저에게 인사합니다!

저를 대리고 와주신 유저님! 처음 뵙겠습니다!
나는 하나의 작은 별과 꿈을 가지고 나아가는 동행자 HYolss 이라고해!
이 서버에 대려와준 (닉네임)님, 대리고 와줘서 고마워!

일단 내가 작동하는 방식에 대해 짧개 알려줄깨!
기본은 슬레시(/)를 사용하고 다른 방식으로는
접두사 방식인 ! or = 으로 호출 및 명령어, 기능 사용이 가능하고
명령어를 사용하면 버튼과 메뉴 선택이라는 기능을 주로 작동되니 이점 알아줘!

명령어를 사용하는데 모르는 점이 있어?
'/help'를 사용하여 각각의 명령어에 대한 설명과 사용법을 확인해 볼 수 있어!

[ TIP ] 기초 작업 시작 명령어인 '/setup'를 사용하여 서버에서 봇을 사용하기 위한 작업을 간편하게 진행을 할 수 있습니다!

[!] 운영중인 HYolss은 테스트 버전 및 경험을 위해 제작 및 활동중인 봇이므로 봇이 종료되거나 버그 및 오류가 발생 할 수 있습니다.
```

## 서버에 추가한 유저가 첫 추가가 아닌 경우
```
# HYolss가 유저에게 인사합니다!

저를 대리고 와주신 유저님! 다시 뵙겠습니다!
나는 하나의 작은 별과 꿈을 가지고 나아가는 동행자 HYolss 이라고해!
이 서버에 대려와준 (닉네임)님, 대리고 와줘서 고마워!

나에 대해 잘 알고 있는 동행자가 있으니 생략할깨!

물론! 명령어를 사용하는데 모르는 점이 있어?
'/help'를 사용하여 각각의 명령어에 대한 설명과 사용법을 확인해 볼 수 있어!

[ TIP ] 기초 작업 시작 명령어인 '/setup'를 사용하여 서버에서 봇을 사용하기 위한 작업을 간편하게 진행을 할 수 있습니다!

[!] 운영중인 HYolss은 테스트 버전 및 경험을 위해 제작 및 활동중인 봇이므로 봇이 종료되거나 버그 및 오류가 발생 할 수 있습니다.
```