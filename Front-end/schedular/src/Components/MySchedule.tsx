import styled from 'styled-components';
import { Link } from 'react-router-dom';
import background_image from '../Assets/Images/logo.png'
import { Schedules } from 'interfaces/homeSchedule';
import { v4 as uuidv4 } from 'uuid';
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
const DdayList = styled.span`
  position: absolute;
  right: 10px;
  margin: 7px 35px;
  padding: 2px 8px;
  font-size: 15px;
  background-color: #12314f;
  color: #fff;
  border-radius: 5px;
`;
const ScheduleBox = styled.div`
  overflow-y: scroll;
  height: 190px;
  width: 485px;
  &::-webkit-scrollbar{
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb{
    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 6px;
  }
`;
  

// memo정민: 홈 '내 할 일 보기'
const MySchedule = ({schedule,loginCkeck}:{schedule:Schedules,loginCkeck:boolean}) => {

  // memo정민: 등록된 일정 리스트
  const mySchedule = schedule
    .map((schedules, index) => 
    <ListWapper key={uuidv4()}>
      <MyList>{schedules.title}</MyList>
      <DdayList>D{schedules.dday}</DdayList>
    </ListWapper>)
    ;

  return (
    <>
    { (!loginCkeck) ?
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
        <ScheduleBox>
          {mySchedule.length > 0 ? mySchedule : <p>할 일이 없습니다.</p> }
        </ScheduleBox>
      </MyScheduleDiv>
    </Container>
    }
    </>
  )
};

export default MySchedule;