# Introduction
socket.io를 이용하여 chatting server를 구현하였습니다.

# Using Tools
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/): 웹 프레임워크
- [Socket.io](https://socket.io/): 웹 소켓
- [Multer](https://www.npmjs.com/package/multer): 파일 업로드 패키지
- [Sequelize](https://sequelize.org/): ORM(Object Relational Mapping) 패키지
- [Passport](https://www.npmjs.com/package/passport): 회원가입 패키지 (Passport-kakao)

# Results
1. 방 생성을 통한, 참여자별 채팅
2. Kakao-oauth를 이용한 로그인
3. express-session과 socket.io-session 연동

# Troubleshooting
*express-session과 socket.io-session이 연동 안되는 문제점 발생.
-접속 도메인이 달라 연동이 안되는 문제였음 ex) express는 192.168.0.35로 서버를 열었는데, socket.io는 localhost로 연결이 된 경우
