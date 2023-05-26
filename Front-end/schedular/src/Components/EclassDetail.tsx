import {useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
const EditTitleWapper = styled.div`
  width: 1052px;
  height: 40px;
  margin-left: 418px;
  background-color: #e6e6e6;
  border: 1.5px solid #cdcdcd;
`;
const EditSubjectTitle = styled.input`
  height: 33px;
  width: 700px;
  padding-left: 10px;
  margin-top: 3px;
  margin-right: 335px;
  background-color: #e6e6e6;
  border: none;
`;
const EditContentWapper = styled.div`
  display: inline-flex;
`;
const EditSubTitleWapper = styled.div`
  width: 120px;
  margin-left: 200px;
  font-size: 15px;
  color: white;
`;
const EditTypeTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 30px;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const EditDateTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 30px;
  height: 35px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const EditContentTitle = styled.div`
  display:flex;
  align-items: center;
  padding-left: 30px;
  height: 250px;
  text-shadow: 1px 1px 1px #506890;
  background-color: #7c95be;
  border: 1px solid #6880a6;
`;
const EditContent = styled.div`
  flex-direction: column;
  height: 323px;
  border: 1px solid #cdcdcd;
`;
const EditSubjectType = styled.select`
  height: 35px;
  width: 100%;
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
  width: 920px;
  padding-left: 10px;
  padding-top: 10px;
  border: 0.5px solid #cdcdcd;
`;
const TitleWapper = styled.div`
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
const BtnWapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 220px;
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

  const {     
    register,
    handleSubmit,
  } = useForm({mode : 'onBlur'});
  const onSubmit = () => {
    console.log();
  };


  return (
    <>
      {isEditing ? (<>
        <Container>
          <StyledH3>과목 일정 수정</StyledH3>
          <Form onSubmit={handleSubmit(onSubmit)}>
              <EditTitleWapper>
                <EditSubjectTitle id='title' type='text' placeholder='제목을 입력해주세요.' {...register('title', { required: true })}/>
              </EditTitleWapper>
              <EditContentWapper>
                <EditSubTitleWapper>
                  <EditTypeTitle>일정 종류</EditTypeTitle>
                  <EditDateTitle>제출 기간</EditDateTitle>
                  <EditContentTitle>상세 내용</EditContentTitle>
                </EditSubTitleWapper>
                <EditContent>
                  <EditSubjectType id='subjectType'  {...register('subjectScheduleType', { required: true })}>
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
                <SubmitButton type='button'>삭제하기</SubmitButton>
              </BtnWapper>
              
          </Form>
        </Container></>)}
    </>
  )
}

export default EclassDetail;