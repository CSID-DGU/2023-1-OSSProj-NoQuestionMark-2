import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import SubmitButton from '../Components/SubmitButton';
import { AiFillCloseCircle } from 'react-icons/ai';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  background-color: #F6F5F0;
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

const PersonalScheduleAdd = () => {
  type InputValue = {
    title: string,
    type: string,
    contents: string,
    importance: string,
    startDate: string,
    endDate: string,
  }

  const {     
    register,
    handleSubmit,
    reset,
  } = useForm<InputValue>({mode : 'onBlur'})

  const onSubmit = (data: InputValue) => {
    console.log(data);
    alert('등록되었습니다.')
    reset();
  }

  return (
    <Container>
        <h1>개인 일정 등록</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <CloseButton/>
        <Grid>
        <label htmlFor='title'>제목</label>
        <InputDiv>
          <StyledInput
            id='title'
            type='text'
            placeholder='제목을 입력해주세요.'
            {...register('title', { required: true })}/>
        </InputDiv>
        <label htmlFor='type'>유형</label>
        <InputDiv>
          <StyledSelect id='type'  {...register('type', { required: true })}>
            <option value='task'>task</option>
            <option value='schedule'>schedule</option>
          </StyledSelect>
        </InputDiv>
        <label htmlFor='contents'>상세내용</label>
        <InputDiv>
          <StyledTextarea 
            id='contents' 
            placeholder='상세내용을 입력해주세요.'/>
        </InputDiv>
        <label htmlFor='importance'>중요도</label>
        <InputDiv>
          <StyledSelect id='importance'  {...register('importance', { required: true })}>
            <option value='중요도1'>중요도1</option>
            <option value='중요도2'>중요도2</option>
            <option value='중요도3'>중요도3</option>
          </StyledSelect>
        </InputDiv>
        <label>시작 날짜</label>
        <InputDiv>
          <input type='datetime-local' id='startDate' {...register('startDate', { required: true })}></input>
        </InputDiv>
        <label>마감 날짜</label>
        <InputDiv>
          <input type='datetime-local' id='endDate' ></input>
        </InputDiv>
        </Grid>
        <SubmitButton name='등록하기' width='13rem' height='2.5rem' color='#228be6'/>
      </form>
    </Container>
  )
}

export default PersonalScheduleAdd