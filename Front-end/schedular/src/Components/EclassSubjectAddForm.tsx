import { useForm, SubmitHandler } from 'react-hook-form';
import * as Api from '../lib/Api';
import {EventSourceInput} from 'interfaces/CalendarState';
import styled from 'styled-components';


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
  width: 1052px;
  height: 40px;
  margin-left: 418px;
  background-color: #e6e6e6;
  border: 1.5px solid #cdcdcd;
`;
const SubjectTitle = styled.input`
  height: 33px;
  width: 700px;
  padding-left: 10px;
  margin-top: 3px;
  margin-right: 335px;
  background-color: #e6e6e6;
  border: none;
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
  border: 1px solid #cdcdcd;
`;
const SubjectType = styled.select`
  height: 35px;
  width: 100%;
  padding-left: 10px;
  border: 0.5px solid #cdcdcd;
`;
const DateWapper = styled.div`
  display: flex;
  height: 36px;
  background-color: #fff;
  border: 0.5px solid #cdcdcd;
`;
const StartDate = styled.input`
  height: 36px;
  width: 400px;
  margin-left: 8px;
  padding: 0 10px;
  border: none;
`;
const StyledP = styled.p`
  height: 20px;
  margin: 6px 36px;
`;
const EndDate = styled.input`
  height: 36px;
  width: 400px;
  padding-left: 10px;
  border: none;
`;
const StyledDetail = styled.textarea`
  height: 238px;
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

const EclassSubjectAddForm = () => {

  const {     
    register,
    handleSubmit,
  } = useForm({mode : 'onBlur'});
  const onSubmit = () => {
    console.log();
  };

  return (
    <Container>
      <StyledH3>과목 일정 등록</StyledH3>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleWapper>
            <SubjectTitle id='title' type='text' placeholder='제목을 입력해주세요.' {...register('title', { required: true })}/>
          </TitleWapper>
          <ContentWapper>
            <SubTitleWapper>
              <TypeTitle>일정 종류</TypeTitle>
              <DateTitle>제출 기간</DateTitle>
              <ContentTitle>상세 내용</ContentTitle>
            </SubTitleWapper>
            <Content>
              <SubjectType id='subjectType'  {...register('subjectScheduleType', { required: true })}>
                <option value='ASSIGNMENT'>ASSIGNMENT</option>
                <option value='TEST'>TEST</option>
                <option value='PRESENTATION'>PRESENTATION</option>
              </SubjectType>
              <DateWapper>
                <StartDate id='startDate' type='datetime-local' {...register('startDate', { required: true })}/>
                <StyledP>~</StyledP>
                <EndDate id='endDate' type='datetime-local' {...register('endDate', { required: true })}/>
              </DateWapper>
              <StyledDetail id='contents' placeholder='상세내용을 입력해주세요.' {...register('contents', { required: true })}/>
            </Content>
          </ContentWapper>
          <SubmitButton type='submit'>등록하기</SubmitButton>
      </Form>
    </Container>
  )
}

export default EclassSubjectAddForm;