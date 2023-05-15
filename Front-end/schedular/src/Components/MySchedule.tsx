import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { isLogin } from '../utils/utils';
import background_image from '../Assets/Images/logo.png'
import { Schedules } from 'interfaces/homeSchedule';
const Container = styled.div`
  width: 50%;
`;
const MyScheduleDiv = styled.div`
  position: relative;
  background-color: #EB9332;
  float: right;
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
  padding: 0.5rem 1.5rem;
  color: #fff;
`;
const LoginText = styled.p`
  font-size: 14px;
  color: #fff;
  margin: 150px 0 0 0;
`;
const CalendarButton = styled(Link)`
  position: absolute;
  top: 8px;
  right: 25px;
  font-size: 30px;
  font-weight: 800;
  color: #fff;
`;
const ListWapper = styled.div`
  position: relative;
  display: flex;
  margin: 0.2rem 0;
`;
const MyList = styled.span`
  justify-content : left;
  margin: 7px 35px;
  font-size: 15px;
`;
  

const MySchedule = //() => { 
  ({schedule,loginCkeck}:{schedule:Schedules,loginCkeck:boolean}) => {

  const mySchedule = schedule
    .map((schedules, index) => 
    <ListWapper>
      <MyList key={index}>{schedules.title}</MyList>
    </ListWapper>)
    .filter(() => schedule.length > 0 )
    ;

  return (
    <>
    { (mySchedule.length < 1 && !loginCkeck) ?
    <Container>
      <MyScheduleDiv style={{ backgroundImage: `url(${background_image})`}}>
        <Title>내 할 일 보기</Title>
        <LoginText>로그인 후 사용가능합니다.</LoginText>
      </MyScheduleDiv>
    </Container>
    :
    <Container>
      <MyScheduleDiv>
        <Title>내 할 일 보기</Title>
        <CalendarButton to='/calendar'>+</CalendarButton>
        {mySchedule}
      </MyScheduleDiv>
    </Container>
    }
    </>
  )
};

export default MySchedule;