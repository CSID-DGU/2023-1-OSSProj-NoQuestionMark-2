import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Api from '../lib/Api';

const Container = styled.div`
  flex-direction: column;
`;
const StyledH2 = styled.h2`
  text-align: left;
  padding-left: 20rem;
`;
const StyledH3 = styled.h3`
  text-align: left;
  padding-top: 40px;
  padding-left: 24rem;
`;
const Form = styled.form`
  height: 100%;
  width: 100%;
`;
const TitleWapper = styled.div`
  display: flex;
  align-items: center;
  width: 61.8rem;
  height: 40px;
  margin-left: 24.4rem;
  background-color: #e6e6e6;
  border: 1.5px solid #cdcdcd;
`;
const SubjectTitle = styled.div`
  display:flex;
  align-items: center;
  height: 33px;
  width: 80rem;
  padding-left: 10px;
  margin-right: 335px;
  font-size: 0.9rem;
  background-color: #e6e6e6;
`;
const SubmitState = styled.div`
  display:flex;
  align-items: center;
  width: 6rem;
  height: 25px;
  margin-right: 1rem;
  padding-left: 0.7rem;
  font-size: 0.7rem;
  color: #fff;
  background-color: #e03131;
  border-radius: 3px;
`;
const SubmitStateComplete = styled.div`
  display:flex;
  align-items: center;
  width: 7.5rem;
  height: 25px;
  margin: 0 10px;
  padding-left: 0.7rem;
  font-size: 0.7rem;
  color: #fff;
  background-color: #1c7ed6;
  border-radius: 3px;
`;
const ContentWapper = styled.div`
  display: inline-flex;
`;
const SubTitleWapper = styled.div`
  width: 7rem;
  margin-left: 11.8rem;
  font-size: 0.9rem;
  color: white;
`;
const TypeTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 1.6rem;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const DateTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 1.6rem;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const ContentTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 1.6rem;
  height: 250px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const Content = styled.div`
  flex-direction: column;
  height: 323px;
  width: 54.9rem;
  font-size: 13px;
  border: 1px solid #cdcdcd;
`;
const SubjectType = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  width: 54.3rem;
  padding-left: 10px;
  border: 0.5px solid #cdcdcd;
`;
const DateWapper = styled.div`
  display:flex;
  align-items: center;
  height: 35.5px;
  width: 54.3rem;
  padding-left: 10px;
  background-color: #fff;
  border: 0.5px solid #cdcdcd;
`;
const StyledP = styled.p`
  height: 20px;
  margin: 6px 36px;
`;
const StyledDetail = styled.div`
  text-align: left;
  height: 240px;
  width: 54.3rem;
  padding-left: 10px;
  padding-top: 10px;
  border: 0.5px solid #cdcdcd;
`;
const SubmitButton = styled.button`
  margin: 30px;
  margin-left: 68rem;
  font-size: 13px;
  height: 25px;
  width: 75px;
  color: #67686c;
  background-color: #ebebeb;
  border: 1px solid #9fa4b1;
  border-radius: 5px;
  cursor: pointer;
`;

const EclassDetailStudent = () => {
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState([]);
  const location = useLocation();
  const scheduleId = location.state.scheduleId;

  useEffect(() => {
    getData(); // 컴포넌트가 마운트되었을 때 데이터 가져오기
  }, []);

  const getData = async () => {
    try {
      await Api.get(`/schedule/official/${scheduleId}`).then((res) => {
      const result = res.data.result;
      setData(result);
    });
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };
  console.log(data);

  return (
    <Container>
      <StyledH2>학습 활동</StyledH2>
      <StyledH3>과목 일정 상세보기</StyledH3>
      <Form>
          <TitleWapper>
            <SubjectTitle>제목</SubjectTitle>
            { submit ? <SubmitStateComplete>제출완료</SubmitStateComplete> : <SubmitState>미제출</SubmitState>}
          </TitleWapper>
          <ContentWapper>
            <SubTitleWapper>
              <TypeTitle>일정 종류</TypeTitle>
              <DateTitle>제출 기간</DateTitle>
              <ContentTitle>상세 내용</ContentTitle>
            </SubTitleWapper>
            <Content>
              <SubjectType>일정종류</SubjectType>
              <DateWapper>시작날짜<StyledP>~</StyledP>마감날짜</DateWapper>
              <StyledDetail>상세내용</StyledDetail>
            </Content>
          </ContentWapper>
          <SubmitButton type='button' onClick={()=>{setSubmit(true)}}>제출하기</SubmitButton>
      </Form>
    </Container>
  )
}

export default EclassDetailStudent