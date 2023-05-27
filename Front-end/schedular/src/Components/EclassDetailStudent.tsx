import styled from 'styled-components';
import {useState} from 'react';

const Container = styled.div`
  flex-direction: column;
`;
const StyledH3 = styled.h3`
  text-align: left;
  padding-top: 40px;
  padding-left: 420px;
`;
const Form = styled.form`
  height: 100%;
  width: 100%;
`;
const TitleWapper = styled.div`
  display: flex;
  align-items: center;
  width: 1050px;
  height: 40px;
  margin-left: 419px;
  background-color: #e6e6e6;
  border: 1.5px solid #cdcdcd;
`;
const SubjectTitle = styled.div`
  display:flex;
  align-items: center;
  height: 33px;
  width: 698px;
  padding-left: 10px;
  margin-right: 335px;
  background-color: #e6e6e6;
  border: none;
`;
const SubmitState = styled.div`
  display:flex;
  align-items: center;
  width: 60px;
  height: 25px;
  margin: 0 10px;
  padding-left: 13px;
  font-size: 13px;
  color: #fff;
  background-color: #e03131;
  border-radius: 3px;
`;
const SubmitStateComplete = styled.div`
  display:flex;
  align-items: center;
  width: 70px;
  height: 25px;
  margin: 0 10px;
  padding-left: 9px;
  font-size: 13px;
  color: #fff;
  background-color: #1c7ed6;
  border-radius: 3px;
`;
const ContentWapper = styled.div`
  display: inline-flex;
`;
const SubTitleWapper = styled.div`
  width: 120px;
  margin-left: 200px;
  font-size: 15px;
  color: white;
`;
const TypeTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 30px;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const DateTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 30px;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const ContentTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 30px;
  height: 250px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const Content = styled.div`
  flex-direction: column;
  height: 323px;
  font-size: 13px;
  border: 1px solid #cdcdcd;
`;
const SubjectType = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  width: 920px;
  padding-left: 10px;
  border: 0.5px solid #cdcdcd;
`;
const DateWapper = styled.div`
  display:flex;
  align-items: center;
  height: 35px;
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
  width: 920px;
  padding-left: 10px;
  padding-top: 10px;
  border: 0.5px solid #cdcdcd;
`;
const SubmitButton = styled.button`
  margin: 30px;
  margin-left: 1180px;
  font-size: 13px;
  height: 25px;
  width: 75px;
  color: #67686c;
  background-color: #ebebeb;
  border: 1px solid #9fa4b1;
  border-radius: 5px;
  cursor: pointer;
`;
const StyledH2 = styled.h2`
  text-align: left;
  padding-left: 300px;
`;

const EclassDetailStudent = () => {
  const [submit, setSubmit] = useState(false);

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