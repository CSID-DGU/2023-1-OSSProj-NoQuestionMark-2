import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { EclassInput } from 'interfaces/EclassSchedule';
import * as Api from '../lib/Api';

import styled from 'styled-components';

const Container = styled.div`
  flex-direction: column;
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
const ContentWapper = styled.div`
  display: inline-flex;
`;
const SubTitleWapper = styled.div`
  width: 7rem;
  margin-left: 200px;
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
  height: 359px;
  width: 55rem;
  border: 1px solid #cdcdcd;
`;
const SubjectTitle = styled.input`
  height: 32px;
  width: 98.6%;
  padding-left: 10px;
  border: 0.5px solid #cdcdcd;
`;
const SubjectType = styled.select`
  height: 37px;
  width: 55rem;
  padding-left: 10px;
  border: 0.5px solid #cdcdcd;
`;
const DateWapper = styled.div`
  display: flex;
  height: 35px;
  background-color: #fff;
  border: 0.5px solid #cdcdcd;
`;
const StartDate = styled.input`
  height: 35px;
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
  height: 35px;
  width: 400px;
  padding-left: 10px;
  border: none;
`;
const StyledDetail = styled.textarea`
  height: 237px;
  width: 54.25rem;
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
const Wapper = styled.div`
  display: block;
  margin: 0 auto;
`;

const EclassSubjectAddForm = () => {
  const location = useLocation();
  const subjectName = location.state.subjectName;
  const navigate = useNavigate();
  const {     
    register,
    handleSubmit,
  } = useForm<EclassInput>({mode : 'onBlur'});
  
  const onSubmit: SubmitHandler<EclassInput> = data => postData(data);
  const postData = async ({ title, contents, subjectScheduleType, startDate, endDate}:EclassInput) => {
		try {
      const className = subjectName;
			const postSubject = { title, contents, subjectScheduleType, startDate, endDate, className };
      console.log(postSubject);
      startDate <= endDate! ?
			await Api.post(`/schedule/official`, postSubject).then((res) => {
        alert('정상적으로 일정이 등록되었습니다.');
        navigate(-1);
			}) : alert('마감날짜를 다시 설정해주세요.');
		} catch (e) {
			alert(e);
		}
	};

  return (
    <Container>
      <StyledH3>과목 일정 등록</StyledH3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Wapper>
          <ContentWapper>
            <SubTitleWapper>
              <TypeTitle>일정 제목</TypeTitle>
              <TypeTitle>일정 종류</TypeTitle>
              <TypeTitle>제출 기간</TypeTitle>
              <ContentTitle>상세 내용</ContentTitle>
            </SubTitleWapper>
            <Content>
              <SubjectTitle id='title' type='text' placeholder='제목을 입력해주세요.' {...register('title', { required: true })}/>
              <SubjectType id='subjectScheduleType'  {...register('subjectScheduleType', { required: true })}>
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
        </Wapper>
        <SubmitButton type='submit'>등록하기</SubmitButton>
      </Form>
    </Container>
  )
}

export default EclassSubjectAddForm;