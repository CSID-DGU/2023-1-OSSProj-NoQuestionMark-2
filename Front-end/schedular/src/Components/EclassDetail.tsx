import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import styled from 'styled-components';
import * as Api from '../lib/Api';
import { EclassInput } from 'interfaces/EclassSchedule';

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
  width: 61.9rem;
  height: 39px;
  margin-left: 24.4rem;
  background-color: #e6e6e6;
  border: 1.5px solid #cdcdcd;
`;
const SubjectTitle = styled.div`
  display: flex;
  align-items: center;
  height: 33px;
  width: 50rem;
  padding-left: 10px;
  margin-top: 3px;
  margin-right: 335px;
  font-size: 15px;
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

// memo정민: 이클래스 공식 과목 일정 상세보기(교수) Component
const EclassDetail = () => {
  // memo정민: 수정 모드 여부를 관리하는 상태
  const [isEditing, setIsEditing] = useState(false);
  // memo정민: 데이터를 저장하는 상태
  const [data, setData] = useState<EclassInput>();
  // memo정민: 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();
  // memo정민: 현재 경로와 상태를 가져오는 location 객체
  const location = useLocation();
  // memo정민: location으로 가져온 subjectName과 scheduleId
  const subjectName = location.state.subjectName;
  const scheduleId = location.state.scheduleId;

  // memo정민: react-hook-form을 사용하여 폼 상태를 관리
  const {     
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<EclassInput>({mode : 'onBlur'});

  // memo정민: 컴포넌트가 마운트되었을 때 데이터 가져오기
  useEffect(() => {
    getData();
  }, []);

  // memo정민: 일정 데이터를 가져오고, 실패 시 error message를 console에 출력
  const getData = async () => {
    try {
      await Api.get(`/schedule/official/${scheduleId}`).then((res) => {
      const result = res.data.result;
      console.log(result);
      setData(result);
    });
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  };
  console.log(data);

  // memo정민: react-hook-form을 사용한 폼 제출 핸들러 정의
  const onSubmit: SubmitHandler<EclassInput> = data => putData(data);
  // memo정민: 일정 수정 함수, 시작일과 종료일을 비교하여 유효성을 검사, 시작일이 종료일보다 큰 경우에는 경고창을 표시, 수정완료 후 페이지 reload
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

  // memo정민: 일정 삭제 함수, 일정 삭제 후 강의실 페이지로 이동
  const delSchedule = async() => {
    await Api.delete(`/schedule/official/${scheduleId}`).then((res) => {
      window.confirm('삭제하시겠습니까?');
      navigate(-1);
    });
  }

  // memo정민: 수정 취소 버튼 클릭 시, 수정 모드를 바꾸고 값을 reset
  const onClickCancleBtn = () => {
    setIsEditing(false)
    reset({...data});
  };

  // memo정민: 수정 시, Controller를 통해 필드의 기본 값을 설정하고 유효성을 검사
  return (
    <>
      <StyledH2>학습 활동</StyledH2>
      {isEditing ? (<>
        <Container>
          <StyledH3>과목 일정 수정</StyledH3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {data && (
              <EditContentWapper>
                <EditSubTitleWapper>
                  <EditTypeTitle>제목</EditTypeTitle>
                  <EditTypeTitle>일정 종류</EditTypeTitle>
                  <EditDateTitle>제출 기간</EditDateTitle>
                  <EditContentTitle>상세 내용</EditContentTitle>
                </EditSubTitleWapper>
                <EditContent>
                <Controller
                  control={control}
                  name='title'
                  defaultValue={data.title}
                  rules={{ required: true }}
                  render={({ field }) => (
                  <EditSubjectTitle 
                    id='title' type='text' value={field.value} placeholder='제목을 입력해주세요.' 
                    {...register('title', { required: true })}/>
                  )}/>
                <Controller
                  control={control}
                  name='subjectScheduleType'
                  defaultValue={data.subjectScheduleType}
                  rules={{ required: true }}
                  render={({ field }) => (
                  <EditSubjectType id='subjectScheduleType' value={field.value} {...register('subjectScheduleType', { required: true })}>
                    <option value='ASSIGNMENT'>ASSIGNMENT</option>
                    <option value='TEST'>TEST</option>
                    <option value='PRESENTATION'>PRESENTATION</option>
                  </EditSubjectType>)}/>
                  <EditDateWapper>
                    <Controller
                      control={control}
                      name='startDate'
                      defaultValue={data.startDate}
                      rules={{ required: true }}
                      render={({ field }) => (
                      <EditStartDate id='startDate' type='datetime-local' value={field.value}
                        {...register('startDate', { required: true })}/>)}/>
                    <EditStyledP>~</EditStyledP>
                    <Controller
                      control={control}
                      name='endDate'
                      defaultValue={data.endDate}
                      rules={{ required: true }}
                      render={({ field }) => (
                      <EditEndDate id='endDate' type='datetime-local' value={field.value}
                        {...register('endDate', { required: true })}/>)}/>
                  </EditDateWapper>
                  <Controller
                      control={control}
                      name='contents'
                      defaultValue={data.contents}
                      rules={{ required: true }}
                      render={({ field }) => (
                    <EditStyledDetail id='contents' placeholder='상세내용을 입력해주세요.' value={field.value}
                      {...register('contents', { required: true })}/>)}/>
                </EditContent>
              </EditContentWapper>)}
              <BtnWapper>
                <SubmitButton type='button' onClick={onClickCancleBtn}>취소하기</SubmitButton>
                <SubmitButton type='submit'>수정완료</SubmitButton>
              </BtnWapper>
          </Form>
        </Container></>) : (<>
        {data && (
        <Container>
          <StyledH3>과목 일정 상세보기</StyledH3>
          <Form>
              <TitleWapper>
                <SubjectTitle>{data.title}</SubjectTitle>
              </TitleWapper>
              <ContentWapper>
                <SubTitleWapper>
                  <TypeTitle>일정 종류</TypeTitle>
                  <DateTitle>제출 기간</DateTitle>
                  <ContentTitle>상세 내용</ContentTitle>
                </SubTitleWapper>
                <Content>
                  <SubjectType>{data.subjectScheduleType}</SubjectType>
                  <DateWapper>{data.startDate}<StyledP>~</StyledP>{data.endDate}</DateWapper>
                  <StyledDetail>{data.contents}</StyledDetail>
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