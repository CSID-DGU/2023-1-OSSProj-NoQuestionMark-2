import {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler} from 'react-hook-form';
import styled from 'styled-components';
import * as Api from '../lib/Api';
import {EclassInput} from 'interfaces/EclassSchedule';
import { v4 as uuidv4 } from 'uuid';

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
const EditSubjectTitle = styled.input`
  height: 32px;
  width: 98.6%;
  padding-left: 10px;
  border: 0.5px solid #cdcdcd;
`;
const EditContentWapper = styled.div`
  display: inline-flex;
`;
const EditSubTitleWapper = styled.div`
  width: 7rem;
  margin-left: 200px;
  font-size: 0.9rem;
  color: white;
`;
const EditTypeTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 1.6rem;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const EditDateTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 1.6rem;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const EditContentTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 1.6rem;
  height: 250px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const EditContent = styled.div`
  flex-direction: column;
  height: 359px;
  width: 55rem;
  border: 1px solid #cdcdcd;
`;
const EditSubjectType = styled.select`
  height: 35px;
  width: 55rem;
  padding-left: 10px;
  border: 0.5px solid #cdcdcd;
`;
const EditDateWapper = styled.div`
  display: flex;
  height: 36px;
  background-color: #fff;
  border: 0.5px solid #cdcdcd;
`;
const EditStartDate = styled.input`
  height: 36px;
  width: 400px;
  margin-left: 8px;
  padding: 0 10px;
  border: none;
`;
const EditStyledP = styled.p`
  height: 20px;
  margin: 6px 36px;
`;
const EditEndDate = styled.input`
  height: 36px;
  width: 400px;
  padding-left: 10px;
  border: none;
`;
const EditStyledDetail = styled.textarea`
  height: 238px;
  width: 54.25rem;
  padding-left: 10px;
  padding-top: 10px;
  border: 0.5px solid #cdcdcd;
`;
const TitleWapper = styled.div`
  width: 61.8rem;
  height: 40px;
  margin-left: 24.4rem;
  background-color: #e6e6e6;
  border: 1.5px solid #cdcdcd;
`;
const SubjectTitle = styled.div`
  display: flex;
  align-items: center;
  height: 33px;
  width: 7rem;
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
  width: 7rem;
  margin-left: 11.8rem;
  font-size: 0.9rem;
  color: white;
`;
const TypeTitle = styled.div`
  display: flex;
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
  border: 1px solid #cdcdcd;
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
const BtnWapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 13rem;
`;
const SubmitButton = styled.button`
  margin: 30px 13px;
  font-size: 13px;
  height: 25px;
  width: 75px;
  color: #67686c;
  background-color: #ebebeb;
  border: 1px solid #9fa4b1;
  border-radius: 5px;
  cursor: pointer;
`;

const EclassDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const subjectName = location.state.subjectName;
  const scheduleId = location.state.scheduleId;

  const {     
    register,
    handleSubmit,
    reset,
  } = useForm<EclassInput>({mode : 'onBlur'});


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

  const onSubmit: SubmitHandler<EclassInput> = data => putData(data);
  const putData = async ({ title, contents, subjectScheduleType, startDate, endDate}:EclassInput) => {
		try {
      const className = subjectName;
			const putData = { title, contents, subjectScheduleType, startDate, endDate, className };
      console.log(putData);
      startDate <= endDate! ?
			await Api.put(`/schedule/official/${scheduleId}`, putData).then((res) => {
        alert('정상적으로 일정이 수정되었습니다.');
        window.location.reload();
			}) : alert('마감날짜를 다시 설정해주세요.');
		} catch (e) {
			alert(e);
		}
	};

  const delSchedule = async() => {
    await Api.delete(`/schedule/official/${scheduleId}`).then((res) => {
      window.confirm('삭제하시겠습니까?');
      navigate(-1);
    });
  }

  return (
    <>
      <StyledH2>학습 활동</StyledH2>
      {isEditing ? (<>
        <Container>
          <StyledH3>과목 일정 수정</StyledH3>
          <Form onSubmit={handleSubmit(onSubmit)}>
              <EditContentWapper>
                <EditSubTitleWapper>
                  <EditTypeTitle>일정 제목</EditTypeTitle>
                  <EditTypeTitle>일정 종류</EditTypeTitle>
                  <EditDateTitle>제출 기간</EditDateTitle>
                  <EditContentTitle>상세 내용</EditContentTitle>
                </EditSubTitleWapper>
                <EditContent>
                  <EditSubjectTitle id='title' type='text' placeholder='제목을 입력해주세요.' {...register('title', { required: true })}/>
                  <EditSubjectType id='subjectType' {...register('subjectScheduleType', { required: true })}>
                    <option value='ASSIGNMENT'>ASSIGNMENT</option>
                    <option value='TEST'>TEST</option>
                    <option value='PRESENTATION'>PRESENTATION</option>
                  </EditSubjectType>
                  <EditDateWapper>
                    <EditStartDate id='startDate' type='datetime-local' {...register('startDate', { required: true })}/>
                    <EditStyledP>~</EditStyledP>
                    <EditEndDate id='endDate' type='datetime-local' {...register('endDate', { required: true })}/>
                  </EditDateWapper>
                    <EditStyledDetail id='contents' placeholder='상세내용을 입력해주세요.' {...register('contents', { required: true })}/>
                </EditContent>
              </EditContentWapper>
              <BtnWapper>
                <SubmitButton type='button' onClick={()=>{setIsEditing(false)}}>취소하기</SubmitButton>
                <SubmitButton type='submit'>수정완료</SubmitButton>
              </BtnWapper>
          </Form>
        </Container></>) : (<>
        {data !== null && (
        <Container>
          <StyledH3>과목 일정 상세보기</StyledH3>
          <Form>
              <TitleWapper>
                <SubjectTitle>제목</SubjectTitle>
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
              <BtnWapper>
                <SubmitButton type='button' onClick={()=>{setIsEditing(true)}}>수정하기</SubmitButton>
                <SubmitButton type='button' onClick={delSchedule}>삭제하기</SubmitButton>
              </BtnWapper>
          </Form>
        </Container>)}</>)}
    </>
  )
}

export default EclassDetail;