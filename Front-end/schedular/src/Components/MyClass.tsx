import {useState} from 'react'
import styled from 'styled-components';
import { isLogin } from '../utils/utils';
import background_image from '../Assets/Images/logo.png'
import { Subjects } from 'interfaces/homeSchedule';

const Container = styled.div`
  width: 50%
`;
const MyClassDiv = styled.div`
  background-color: #EDC219;
  border-radius: 10px;
  margin: 2rem 3rem;
  width: 55%;
  height: 270px;
  min-width: 500px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100px;
`;
const Title = styled.h2`
  text-align: left;
  font-size: 16px;
  padding: 1.2rem 1.5rem 0.5rem 1.5rem;
  color: #fff;
`
const LoginText = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 150px 0 0 0;
`
const ListWapper = styled.div`
  position: relative;
  display: flex;
  margin: 0.2rem 0;
`;
const MyList = styled.span`
  justify-content : left;
  margin: 7px 40px;
  font-size: 15px;
`;
const ClassButton = styled.button`
  position: absolute;
  right: 25px;
  margin: 7px 20px;
  height: 25px;
  font-size: 10px;
  background-color: #12314f;
  color: #fff;
  border-radius: 5px;
  border: none;
`;

const MyClass = () => {
/*
  (props:{subjects:Subjects}) => {
  const [loginCheck, setLoginCheck] = useState(false);
  const {subjects} = props;
  console.log(subjects);

  const myClass = subjects
    .map((classes, index) => 
    <ListWapper>
      <MyList key={index}>{classes.subjectName}</MyList>
      <ClassButton type='button'>강의실 가기</ClassButton>
    </ListWapper>)
    ;
  */
  const dummyClass = [ '데이터베이스', '오픈소스소프트웨어프로젝트', '컴퓨터네트워크', '머신러닝과데이터사이언스', '인공지능기초', '자료구조알고리즘1']

  dummyClass.sort();

  const myClass = dummyClass
    .map((classes, index) => 
    <ListWapper>
      <MyList key={index}>{classes}</MyList>
      <ClassButton type='button'>강의실 가기</ClassButton>
    </ListWapper>)
    ;

  return (
    <>
    { !isLogin ?
    <Container>
      <MyClassDiv style={{ backgroundImage: `url(${background_image})`}}>
        <Title>내 강의실</Title>
        <LoginText>로그인 후 사용가능합니다.</LoginText>
      </MyClassDiv>
    </Container>
    :
    <Container>
      <MyClassDiv>
        <Title>내 강의실</Title>
        {myClass}
      </MyClassDiv>
    </Container>
    }
    </>
  )
};

export default MyClass;