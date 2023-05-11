import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from "react-icons/ai";

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  width: 30%;
  min-width: 400px;
  border-radius: 30px;
  padding: 25px 0;
`;
const CloseButton = styled(AiFillCloseCircle)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  grid-gap: 0.5rem;
  justify-content : left;
  text-align: left;
  font-size: 13px;
  width: 80%;
  margin: 2rem auto;
  padding: 2rem 2rem;
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;
const StyledSelect = styled.select`
  width: 100%;
  height: 35px;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #666;
  padding: 0 12px;
`;
const StyledInput = styled.input`
  width: 91%;
  height: 35px;
  font-size: 13px;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 0 12px;
`;
const StyledTextarea = styled.textarea`
  width: 91%;
  height: 200px;
  font-size: 13px;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 10px 12px;
`;
const EditButton = styled.button`
  display: block;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  text-align: center; 
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right : auto;
  background-color: #228be6;
  width: 10rem;
  height: 2rem;
`;
const CDButton = styled.button`
  display: block;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  text-align: center; 
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left : auto;
  background-color: #228be6;
  width: 10rem;
  height: 2rem;
`;
const ButtonLine = styled.div`
  display: flex;
  padding-top: 0.5rem;
  justify-content: space-between;
`;
const ButtonWapper = styled.div`
  margin: 0 auto;
  padding-bottom: 0.5rem;
  width: 22rem;
`;

const SubjectDetailProf = () => {
  type InputValue = {
    title: string,
    type: string,
    contents: string,
    importance: string,
    startDate: string,
    endDate: string,
  }

  const [edited, setEdited] = useState(false)

  const onClickEditButton = () => {
    setEdited(true);
  };

  const onClickReadButton = () => {
    setEdited(false);
  };

  const {     
    register,
    handleSubmit,
  } = useForm<InputValue>({mode : 'onBlur'})

  const onSubmit = (data: InputValue) => {
    console.log(data);
    alert('수정이 완료되었습니다.');
    
  }

  return (
    <Container>
      <h1>과목 일정 상세보기</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CloseButton/>
        <Grid>
        <label htmlFor='title'>제목</label>
        <InputDiv>
          <StyledInput
            id='title'
            type='text'
            placeholder='제목을 입력해주세요.'
            {...register('title', { required: true })} 
            readOnly={edited ? false : true}/>
        </InputDiv>
        <label htmlFor='contents'>상세내용</label>
        <InputDiv>
          <StyledTextarea 
            id='contents' 
            placeholder='상세내용을 입력해주세요.'
            readOnly={edited ? false : true}/>
        </InputDiv>
        <label htmlFor='subject'>과목명</label>
        <InputDiv>
        </InputDiv>
        <label htmlFor='importance'>일정 종류</label>
        <InputDiv>
          <StyledSelect id='importance'  {...register('importance', { required: true })} disabled={edited ? false : true}>
            <option value='과제'>과제</option>import SubmitButton from './SubmitButton';
            <option value='시험'>시험</option>
            <option value='발표'>발표</option>
          </StyledSelect>
        </InputDiv>
        <label>시작 날짜</label>
        <InputDiv>
          <input type='datetime-local' {...register('startDate', { required: true })} readOnly={edited ? false : true}></input>
        </InputDiv>
        <label>마감 날짜</label>
        <InputDiv>
          <input type='datetime-local' readOnly={edited ? false : true}></input>
        </InputDiv>
        </Grid>
        {edited ? ( 
          <ButtonWapper>
            <ButtonLine>
              <EditButton type='submit'>수정완료</EditButton>
              <CDButton type='button' onClick={()=>{onClickReadButton()}}>취소하기</CDButton>
            </ButtonLine>
          </ButtonWapper> ) : ( 
          <ButtonWapper> 
            <ButtonLine>
              <EditButton type='button' onClick={()=>{onClickEditButton()}}>수정하기</EditButton>
              <CDButton type='button'>삭제하기</CDButton>
            </ButtonLine>
          </ButtonWapper>)}
      </form>
    </Container>
  )
}

export default SubjectDetailProf