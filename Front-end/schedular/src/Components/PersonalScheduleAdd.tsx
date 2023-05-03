import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import SubmitButton from '../Components/SubmitButton';
import { AiFillCloseCircle } from "react-icons/ai";

const StyledSelect = styled.select`
  width: 225px;
  height: 35px;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #666;
  padding: 0 12px;
`;
const StyledInput = styled.input`
  width: 200px;
  height: 35px;
  font-size: 13px;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 0 12px;
`;
const StyledTextarea = styled.textarea`
  width: 200px;
  height: 200px;
  font-size: 13px;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 0 12px;
`;

const PersonalScheduleAdd = () => {
  type InputValue = {
    title: string,
    type: string,
    contents: string,
    importance: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
  }

  const {     
    register,
    handleSubmit,
    reset,
  } = useForm<InputValue>({mode : 'onBlur'});

  const onSubmit = (data: InputValue) => {
    console.log(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>개인 일정 등록</h1>
        <AiFillCloseCircle/>
        <div>
          <label htmlFor="title">제목</label>
          <StyledInput
            id="title"
            type="text"
            placeholder="제목을 입력해주세요."
            {...register("title", { required: true })}/>
        </div>
        <div>
          <label htmlFor="type">유형</label>
          <StyledSelect id="type"  {...register("type", { required: true })}>
            <option value="task">task</option>
            <option value="schedule">schedule</option>
          </StyledSelect>
        </div>
        <div>
          <label htmlFor="contents">상세내용</label>
          <StyledTextarea 
            id="contents" 
            placeholder="상세내용을 입력해주세요."/>
        </div>
        <div>
          <label htmlFor="importance">중요도</label>
          <StyledSelect id="importance"  {...register("importance", { required: true })}>
            <option value="중요도1">중요도1</option>
            <option value="중요도2">중요도2</option>
            <option value="중요도3">중요도3</option>
          </StyledSelect>
        </div>
        <div>
          <div>
            <label>시작 날짜</label>
            <input type="datetime-local" {...register("startDate", { required: true })}></input>
          </div>
          <div>
            <label>마감 날짜</label>
            <input type="datetime-local" ></input>
          </div>
        </div>
        <SubmitButton name='등록하기' width='15rem' height='3rem' color='#228be6'/>
      </div>
    </form>
  )
}

export default PersonalScheduleAdd