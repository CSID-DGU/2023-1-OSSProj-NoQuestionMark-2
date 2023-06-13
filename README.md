# 이클래스 일정관리 서비스 📅⏰

![Dongguk Calendar](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/c3312e03-0b7d-449b-95aa-c33e45e07b71)

<br>

## Dongguk Schedular Web Page v1.0
동국대학교 오픈소스소프트웨어 프로젝트 2team

개발기간 : 2023.04.10 ~ 2023.06.14

<br>

## 배포주소
https://www.donggukschedule.com/

<br>

## 데모영상
[https://drive.google.com/file/d/1E_4jQ8KfiZIGQTgO5fNpceyHdojDG318/view?usp=drive_link](https://drive.google.com/file/d/1E_4jQ8KfiZIGQTgO5fNpceyHdojDG318/view?usp=sharing)

<br>

## 프로젝트 소개
javascript 오픈소스 **fullcalendar**을 이용해 기존 이클래스의 ‘내할일보기’ 탭의 기능을 확장한 학교중심의 일정관리시스템을 구현하였다.
교수와 학생 모두가 과제,발표,시험등의 학교일정과 개인일정을 한 곳에서 유연하게 관리할 수 있는서비스를 제공하고 
나아가 이클래스 과제페이지와도 연동하여 일정을 학생 및 교수가 보다 쉽게 인지하고 계획적으로 진행할 수 있게 만들었다.

<br>

## 개발 환경  
```
Back-End  

JAVA 17
Spring Boot 2.6.7
Spring Security
JWT Token
Spring Data JPA
JPA(JPQL)
AWS EC2
RDS PostgreSQL
AWS ELB(Elastic Load Balencer)
Route 53
AMI(Amazon Machine Image)
AWS Amplify
ACM(Amazon Certificate Manager)
```

```
Front-End

HTML
CSS
Javascript
Typescript
React
Recoil
```

<br>

## 시작가이드

### installation
```
git clone https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2.git
```
### Backend
```
 ** application.yml 파일에 있는 secret 키를 모두 입력 후 가동 가능  

 spring.datasource  
 - url: RDS postgreSQL url 정보  
 - username: postrgreSQL에서 사용하는 username  
 - password: postrgreSQL에서 사용하는 password  
 
 jwt  
 - secret-key: 토큰 값을 암호화 하는 키 값  
 - token.expired-time-ms:  토큰 만료 시간  
 
 bot  
 - token: 텔레그램 봇에 할당된 token 값  
 - username: 텔레그램 봇의 이름  
 - chatId: 텔레그램 채팅방의 아이디  
 
java -jar schedular-0.0.1-SNAPSHOT.jar  
```

### Front-end
```
cd Front-end/schdular
npm install
npm run start
```

<br>

## Stacks

### Enviroment
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">

### config
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=html5&logoColor=white"> 

### Development
 <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">  <img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">  <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white"> 

  <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white">  <img src="https://img.shields.io/badge/SpringSecurity-6DB33F?style=for-the-badge&logo=SpringSecurity&logoColor=white">  <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">  <img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">  <img src="https://img.shields.io/badge/jsonwebtokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">  
SpringDataJPA , JPA(JPQL) , Recoil

### Communication
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">  <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">  <img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white">  

<br>

## 화면구성
|  |  |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------|
|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/6d3246d7-29bb-4a28-9551-6b1e287dc1bf)|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/754be83a-d180-4ed9-9e3b-ebc22cd8c856)|
|홈화면|로그인후 홈화면|
|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/013d4cb6-3fad-40f7-829c-b4fe31dbcde8)|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/55cd21d2-1cd4-40db-898c-087c2322a770)|
|이클래스 일정조회 - 학생|이클래스 일정조회 - 교수 |
|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/a2f0ffa0-1a3a-4ddc-8a1a-ea490c91872a)|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/0c3675d4-91da-465e-a5d1-425747bda515)|
|이클래스 일정상세조회 - 학생| 이클래스 일정조회,수정,삭제 - 교수|
|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/33b85c69-e2ed-4721-b5b5-dd34515d4395)|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/36a37cf1-3452-4dac-99d2-ca444f2e4963)|
|캘린더 일정조회| 캘린더 일정필터링|
|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/62c56439-dada-4aa1-95dc-d0a4a2fbb739)|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/6f36687e-ee8a-4ed4-a0bb-a5b2157343a8)|
|캘린더 과목일정등록|캘린더 개인일정등록|
|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/39bc4369-6b02-4641-bc6c-0ef6b617fb16)|![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/18d4d94c-1e0c-4d39-93b5-06ea1c0665a4)|
| 해야할 일 | 완료한 일 |

<br>

## 주요기능
* 홈 - 내 할 일 보기, 내 강의실 가기 
* 로그인 / 회원가입
* 캘린더 일정관리
  * 월간, 주간, 일간 일정보기
  * 일정 유형별로 필터링
  * 개인일정 조회, 등록, 수정, 삭제
  * 개인과목일정 조회, 등록, 수정, 삭제
  * 공식일정 조회 및 이클래스 이동
  * 해야할 일 ( 개인일정, 개인과목일정의 TASK + 공식일정의 ASSIGNMENT ) 관리
  * 완료한 일 ( 완료된 일정에 대한 관리 ) 및 복원 
* 이클래스 일정관리
  * 강의실별 모든 일정 조회   
  * 공식일정 등록, 수정, 삭제 

<br>

## 아키텍쳐
![image](https://github.com/CSID-DGU/2023-1-OSSProj-NoQuestionMark-2/assets/79756267/ffc46079-7336-4666-b097-4639014d99c8)

<br>

## 개발 팀 소개
|이름|역할|e-mail|
|---|---|---|
|이중원|BE, DB설계,클라우드인프라설계,로그인&회원가입기능CRUD기능생성, 과제 및 일정상세보기,UX/UI기획|dlwnddnjs96@naver.com |
|박지혜|FE, 회원가입, 캘린더 - 월간/주간/일간일정보기,일정등록 및 수정, 상세보기, 해야할 일, 완료한 일, 일정필터링, UX/UI기획|qkrwlgp235@gmail.com|
|은정민|FE, 홈화면,로그인일정, 이클래스 일정등록, 수정, 삭제 및 상세보기 , UX/UI기획|dmswjdals12@naver.com|

<br>



<br>

## 라이센스
Distributed under the MIT License. See LICENSE for more information.
