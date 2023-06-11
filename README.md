# 이클래스 일정관리 서비스 📅⏰
이클래스 과제, 시험 일정과 연동된 일정관리 서비스

<br>

## Description
이클래스의 ‘내할일보기’ 탭의 기능을 확장하여 학교중심의 일정관리시스템을 구현하였다.
교수와 학생 모두가 과제,발표,시험등의 학교일정과 개인일정을 한 곳에서 유연하게 관리할 수 있는서비스를 제공하고 
나아가 이클래스 과제페이지와도 연동하여 일정을 학생 및 교수가 보다 쉽게 인지하고 계획적으로 진행할 수 있게 만들었다.

이클래스 통합사이트에서 교수가 과제, 발표, 시험을 등록하면 그 과목을 수강한 학생의 일정에 통합되어 볼 수 있다.
학생, 교수는 수강과목에 대한 정보 이외에 본인의 개인 일정, 개인 교과 일정도 등록할 수 있다.

<br>

## Functional Specification
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

## Test Account
|user|id|pw|
|---|---|---|
|PROFESSOR|||
|STUDENT|||

<br>

## Environment
|Front-end | Back-end|
|---|---|
|HTML | JAVA17|
|CSS | SpringBoot2.6.7|
|Javascript | SpringSecurity |
|Typescript | JWTToken |
|React | SpringDataJPA |
|Recoil | JPA(JPQL) |
|styled-component|AWSEC2|
||RDSPostgreSQL|

<br>

## Roles
|이름|역할|
|---|---|
|이중원|BE, DB설계,클라우드인프라설계,로그인&회원가입기능CRUD기능생성, 과제 및 일정상세보기,UX/UI기획|
|박지혜|FE, 회원가입, 캘린더 - 월간/주간/일간일정보기,일정등록 및 수정, 상세보기,  UX/UI기획|
|은정민|FE, 홈화면,로그인일정, 이클래스 일정등록, 수정, 삭제 및 상세보기 , UX/UI기획|

<br>

## Develop period
2023.04.10 ~ 2023.06.14

<br>

## License
Distributed under the MIT License. See LICENSE for more information.
