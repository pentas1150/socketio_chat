# SocketIO_chat
Project URL: https://github.com/pentas1150/socketio_chat

# Introduction
socket.io를 이용하여 chatting server를 구현하였습니다.

# Using Tools
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/): 웹 프레임워크
- [Socket.io](https://socket.io/): 웹 소켓
- [Multer](https://www.npmjs.com/package/multer): 파일 업로드 패키지
- [Sequelize](https://sequelize.org/): ORM(Object Relational Mapper) 패키지 Mysql 튜플을 Object로 변환시켜줌
- [Passport](https://www.npmjs.com/package/passport): 회원가입 패키지 (Passport-kakao)

# Results
### Screenshots
- 로그인 화면
<img src="https://postfiles.pstatic.net/MjAyMDA5MDJfMTg2/MDAxNTk5MDI0MzM4Mjkw.6zr0GCMbBMvge26cKDM1jmwQeFg2Zv5PNLwHDJT2McUg.YGRbQaxTvKy-5qVF-G4pVOVm1CVveOW0ttn21xbVOoYg.PNG.ffanys_/스크린샷_2020-09-02_오후_2.17.40.png?type=w966" width="600px">

- 메인 화면
<img src="https://postfiles.pstatic.net/MjAyMDA5MDJfNjkg/MDAxNTk5MDI0MzM4NzUz.--RqfhhkoYv2YUNY4F9Sck4OWIJgxs4dOXlcGC2DHskg.AVKyXJBfWZ2jKCvEGpCBe0dziIT1_dil4yhBFomuH4Ig.PNG.ffanys_/스크린샷_2020-09-02_오후_2.20.11.png?type=w966" width="600px">

- 채팅 화면
<img src="https://postfiles.pstatic.net/MjAyMDA5MDJfNzkg/MDAxNTk5MDI0MzM5MjYx.IDJ3953_aAlbI7mOZRoY_FHA_PqN0uLt4T6JDNQ_5dsg.9xen5uVYl9909A28DtFrSwlPbTC6hOCFq8-d4i6XQBsg.PNG.ffanys_/스크린샷_2020-09-02_오후_2.23.07.png?type=w966" width="600px">

### Notes
1. 방 생성을 통한, 참여자별 채팅
2. Kakao-oauth를 이용한 로그인
3. express-session과 socket.io-session 연동
4. multer를 이용하여 채팅방에 이미지 전송

# How to Use
- .env 파일 생성 후 아래의 변수명 기입
  - COOKIE : 쿠키의 시크릿 키
  - DB_ID : MySQL의 루트 아이디
  - DB_PW : MySQL 루트 아이디의 비밀번호
  - DB_NAME : 해당 프로젝트와 연결할 DB의 이름
  - DOMAIN : 도메인명(or IP)과 포트번호 ex)localhost:3412
  - KAKAO_ID : 카카오 OAuth를 사용하기 위한 API키

# Troubleshooting
1. express-session과 socket.io-session이 연동 안되는 문제점 발생.
  - 접속 도메인이 달라 연동이 안되는 문제였음 ex) express는 192.168.0.35로 서버를 열었는데, socket.io는 localhost로 연결이 된 경우

2. passport에서 req에 추가한 user객체를 typescript에서 인식을 못함.
  - node_modules/@types/passport/index.d.ts에서 interface 수정
