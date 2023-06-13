import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EclassMenu from './../Components/EclassMenu';
import EclassClassName from 'Components/EclassClassName';
import { useRecoilValue } from 'recoil';
import { userInfoState } from 'recoil/Atom'
import * as Api from '../lib/Api';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const ListTitleWapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0 0 21rem;
  width: 70rem;
  font-size: 0.9rem;
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
const ScheduleList = styled.div`
  display: flex;
  justify-content: center;
  width: 70rem;
  margin: 15px 0;
  padding: 0 0 15px 0;
  font-size: 0.9rem;
  border-bottom: 1px solid #000;
`;
const ScheduleType = styled.span`
  width: 100px;
  margin: 0 25px;
`;
const Title = styled.button`
  width: 550px;
  margin: 0 25px;
  font-size: 0.9rem;
  background-color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.2s;
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
const ScheduleWapper = styled.div`
  height: 520px;
  width: 70rem;
  margin-left: 21rem;
`;
const AddButton = styled.button`
  text-align: center;
  color: #fff;
  padding: 9px 18px;
  margin: 15px 0 1.2rem 70rem;
  border: none;
  border-radius: 5px;
  background-color: #228be6;
  font-size: 13px;
  cursor: pointer;
`;
const StyledSpan = styled.span`
  display: block;
  padding-top: 200px;
`;

// memo정민: userType이 학생인지 교수인지 확인
const isStudent = (userType:string|null):boolean => {
  if(userType === "STUDENT") {
    return true
  } return false;
}

// memo정민: 이클래스 강의실 페이지
const EclassSubject = () =>{
  // memo정민: 데이터를 저장하는 상태
  const [data, setData] = useState([]);
  // memo정민: 현재 사용자의 userType을 가져옴
  const userType = useRecoilValue(userInfoState).userType;
  // memo정민: 사용자의 userType
  const STUDENT = isStudent(userType);
  // memo정민: 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();
  // memo정민: 현재 경로와 상태를 가져오는 location 객체
  const location = useLocation();
  // memo정민: location으로 가져온 subjectId와 subjectName
  const subjectId = location.state.subjectId;
  const subjectName = location.state.subjectName;

  // memo정민: 컴포넌트가 마운트되었을 때 데이터 가져오기
  useEffect(() => {
    getData();
  }, []);

  // memo정민: 일정 데이터 가져오기
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
  
  // memo정민: 일정 상세보기 페이지로 이동하는 함수, 이동하면서 subjectId, subjectName, scheduleId을 같이 넘겨줌
  const moveToDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const scheduleId = (e.target as HTMLButtonElement).getAttribute('data-subject-id');
    navigate(`/eclass/detail/${scheduleId}`, { state: { subjectId, subjectName, scheduleId }  })
  }
  // memo정민: 일정 추가 페이지로 이동하는 함수, 이동하면서 subjectName을 같이 넘겨줌
  const moveToAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/eclass/add`, {  state: { subjectName } })
  }

  const scheduleList = [...data];
  // memo정민: 공식 과목 일정 리스트
  const subjects = scheduleList
    .map((data) => {
      // memo정민: 현재 요소에서 필요한 속성을 추출하여 변수에 할당
      const {subjectScheduleType, title, endDate, dday, scheduleId} = data;
      // memo정민: 'uuidv4()' 함수를 사용하여 고유한 키 값을 생성
      return(<ScheduleList key={uuidv4()}>
        <ScheduleType>{subjectScheduleType}</ScheduleType>
        <Title onClick={moveToDetail} value={subjectName} data-subject-id={scheduleId}>{title}</Title>
        <EndDate>{endDate}</EndDate>
        <DDay>D{dday}</DDay>
      </ScheduleList>)
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
      { data.length > 0 ?
        <ScheduleWapper>
          {subjects}
        </ScheduleWapper> :
        <ScheduleWapper>
          <StyledSpan>과목 일정이 없습니다.</StyledSpan>
        </ScheduleWapper>}
      <div>
      { STUDENT ? '' : <AddButton onClick={moveToAdd} value={subjectId} data-subject-name={subjectName}>과목 일정 등록</AddButton>}
      </div>
    </>
  )
}

export default EclassSubject;