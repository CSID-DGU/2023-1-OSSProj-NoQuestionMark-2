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
`;
const StyledInput = styled.input`
  width: 200px;
  height: 35px;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 0 12px;
`;
const StyledTextarea = styled.textarea`
  width: 200px;
  height: 200px;
  border: 1px solid #666;
  border-radius: 5px;
  padding: 0 12px;
`;

const SubjectScheduleAdd = () => {
  type InputValue = {
    title: string,
    contents: string,
    subject: string,
    scheduleType: string
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
        <h1>과목 일정 등록</h1>
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
          <label htmlFor="contents">상세내용</label>
          <StyledTextarea 
            id="contents" 
            placeholder="상세내용을 입력해주세요."/>
        </div>
        <div>
          <label htmlFor="subject">과목명</label>
        </div>
        <div>
          <label htmlFor="scheduleType">일정 종류</label>
          <StyledSelect id="scheduleType" {...register("scheduleType", { required: true })}>
            <option value="과제">과제</option>
            <option value="시험">시험</option>
            <option value="발표">발표</option>
          </StyledSelect>
        </div>
        <div>
          <div>
            <label htmlFor="startDate">시작 날짜</label>
            <input type="datetime-local" {...register("startDate", { required: true })}></input>
          </div>
          <div>
            <label htmlFor="endDate">마감 날짜</label>
            <input type="datetime-local"></input>
          </div>
        </div>
        <SubmitButton name='등록하기' width='15rem' height='3rem' color='#228be6'/>
      </div>
    </form>
  )
}

export default SubjectScheduleAdd