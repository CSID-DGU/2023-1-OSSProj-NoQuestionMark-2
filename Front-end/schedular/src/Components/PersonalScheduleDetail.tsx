import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import {ModalToggle,EventSourceInput} from "interfaces/CalendarState";

const ModalConatiner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index : 999;
`;
const Form = styled.form`
  position: absolute;
  width: 25%;
  min-width: 385px;
  padding: 30px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
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
const CompleteButton = styled.button`
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
  margin : auto;
  background-color: #228be6;
  width: 22rem;
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

const PersonalScheduleDetail: React.FC<ModalToggle> = ({ handleModalToggle }) => {

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
  } = useForm<EventSourceInput>({mode : 'onBlur'})

  const onSubmit = (data: EventSourceInput) => {
    console.log(data);
    alert('수정이 완료되었습니다.');
  }

  return (
    <ModalConatiner>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>개인 일정 상세보기</h1>
        <CloseButton onClick={()=>handleModalToggle('personal')}/>
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
        <label htmlFor='type'>유형</label>
        <InputDiv>
          <StyledSelect id='type'  {...register('scheduleType', { required: true })} disabled={edited ? false : true}>
            <option value='task'>task</option>
            <option value='schedule'>schedule</option>
          </StyledSelect>
        </InputDiv>
        <label htmlFor='contents'>상세내용</label>
        <InputDiv>
          <StyledTextarea 
            id='contents' 
            placeholder='상세내용을 입력해주세요.'
            readOnly={edited ? false : true}/>
        </InputDiv>
        <label htmlFor='importance'>중요도</label>
        <InputDiv>
          <StyledSelect id='importance'  {...register('importance', { required: true })} disabled={edited ? false : true}>
            <option value='중요도1'>중요도1</option>import SubmitButton from './SubmitButton';
            <option value='중요도2'>중요도2</option>
            <option value='중요도3'>중요도3</option>
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
            <CompleteButton type='button'>일정 완료하기</CompleteButton>
            <ButtonLine>
              <EditButton type='button' onClick={()=>{onClickEditButton()}}>수정하기</EditButton>
              <CDButton type='button'>삭제하기</CDButton>
            </ButtonLine>
          </ButtonWapper>)}
      </Form>
    </ModalConatiner>
  )
}

export default PersonalScheduleDetail