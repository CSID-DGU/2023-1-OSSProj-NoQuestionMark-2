import styled from 'styled-components';
import background_image from '../Assets/Images/logo.png'
import { Subjects } from 'interfaces/homeSchedule';
import { Link } from 'react-router-dom';

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

const ClassButton = styled(Link)`
  position: absolute;
  right: 25px;
  margin: 7px 20px;
  padding: 6px 5px 0 5px;
  height: 20px;
  font-size: 10px;
  background-color: #12314f;
  color: #fff;
  border-radius: 5px;
  border: none;
`;

const MyClass = ({subjects,loginCkeck}:{subjects:Subjects,loginCkeck:boolean}) => {

  const myClass = subjects
    .map((classes, index) => {
      const {subjectName,subjectId}= classes;
      return (<ListWapper>
        <MyList key={index}>{subjectName}</MyList>
        <ClassButton to={`/eclass/${subjectId}`}>강의실 가기</ClassButton>
      </ListWapper>)})
    ;

  return (
    <>
    { (myClass.length < 1 && !loginCkeck)?
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