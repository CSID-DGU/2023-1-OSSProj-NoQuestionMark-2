import EclassMenu from './../Components/EclassMenu';
import EclassClassName from 'Components/EclassClassName';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue} from 'recoil';
import { userInfoState } from 'recoil/Atom'
import * as Api from '../lib/Api';
import { v4 as uuidv4 } from 'uuid';

const StyledLink = styled.button`
  text-align: center;
  color: #fff;
  padding: 9px 18px;
  border: none;
  border-radius: 3px;
  background-color: #228be6;
  font-size: 13px;
  cursor: pointer;
`;
const ListTitleWapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 60px 0 15px 350px;
  width: 1200px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  background-color: #13487c;
`;
const StyledType = styled.div`
  width: 100px;
  margin: 10px 25px;
`;
const StyledTitle = styled.div`
  width: 550px;
  margin: 10px 25px;
`;
const StyledDate = styled.div`
  width: 200px;
  margin: 10px 25px;
`;
const StyledDday = styled.div`
  width: 100px;
  margin: 10px 25px;
`;
const ScheduleWapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
  margin: 15px 0 15px 350px;
  padding: 0 0 15px 0;
  font-size: 15px;
  border-bottom: 1px solid #000;
`;
const ScheduleType = styled.span`
  width: 100px;
  margin: 0 25px;
`;
const Title = styled.button`
  width: 550px;
  margin: 0 25px;
  font-size: 15px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.15s;
  &:hover{  
    color: #1971c2;
  }
`;
const EndDate = styled.span`
  width: 200px;
  margin: 0 25px;
`;
const DDay = styled.span`
  width: 100px;
  margin: 0 25px;
`;

const isStudent = (userType:string|null):boolean => {
  if(userType === "STUDENT") {
    return true
  } return false;
}

const EclassSubject = () =>{
  const [data, setData] = useState([]);
  const userType = useRecoilValue(userInfoState).userType;
  const STUDENT = isStudent(userType);
  const navigate = useNavigate();
  const location = useLocation();
  const subjectId = location.state.subjectId;
  const subjectName = location.state.subjectName;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await Api.get(`/schedule/official?subjectName=${subjectName}`).then((res) => {
      const result = res.data.result;
      setData(result);
    });
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };
  console.log(data);

  const moveToDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const scheduleId = (e.target as HTMLButtonElement).getAttribute('data-subject-id');
    navigate(`/eclass/detail/${scheduleId}`, { state: { subjectId, subjectName, scheduleId }  })
  }
  const moveToAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/eclass/add`, {  state: { subjectId, subjectName } })
  }
  
  const scheduleList = [...data];
  const subjects = scheduleList
    .map((data) => {
      const {subjectScheduleType, title, endDate, dday, scheduleId} = data;
      return(<ScheduleWapper key={uuidv4()}>
        <ScheduleType>{subjectScheduleType}</ScheduleType>
        <Title onClick={moveToDetail} value={subjectName} data-subject-id={scheduleId}>{title}</Title>
        <EndDate>{endDate}</EndDate>
        <DDay>{dday}</DDay>
      </ScheduleWapper>)
    })
  

  return (
    <>
      <EclassMenu />
      <EclassClassName/>
      <ListTitleWapper>
        <StyledType>종류</StyledType>
        <StyledTitle>제목</StyledTitle>
        <StyledDate>마감 날짜</StyledDate>
        <StyledDday>D-day</StyledDday>
      </ListTitleWapper>
      {subjects}
      <div>
      { STUDENT ? '' : <StyledLink onClick={moveToAdd} value={subjectId} data-subject-name={subjectName}>과목 일정 등록</StyledLink>}
      </div>
      
    </>
  )
}

export default EclassSubject;