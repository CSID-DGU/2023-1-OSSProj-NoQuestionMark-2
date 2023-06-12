import { useForm, SubmitHandler } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import SubmitButton from '../Components/SubmitButton';
import {ModalToggle, EventSourceInput} from 'interfaces/CalendarState';
import * as Api from '../lib/Api';

const CloseButton = styled(AiFillCloseCircle)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
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
const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  grid-gap: 0.5rem;
  justify-content : left;
  text-align: left;
  font-size: 13px;
  width: 80%;
  margin: 2rem auto;
  padding: 1rem 1rem;
`;
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

const SubjectScheduleAdd = ({handleModalToggle, getApi,date, subjectList}: ModalToggle) => {
  const {     
    register,
    handleSubmit,
  } = useForm<EventSourceInput>({mode : 'onBlur'});

  const onSubmit: SubmitHandler<EventSourceInput> = data => postSchedule(data);
  const postSchedule = async ({ title, contents, scheduleType, className, importance, subjectScheduleType, startDate, endDate }:EventSourceInput) => {
		try {
			const postData = {  title, contents, scheduleType, className, importance, subjectScheduleType, startDate, endDate };
      startDate < endDate ?
			await Api.post(`/schedule/subject`, postData).then((res) => {
        alert('정상적으로 일정이 등록되었습니다.');
        handleModalToggle('subject');
				if (date) {
          const [month, year] = date;
          getApi?.(year, month);
        }
			}): alert('마감날짜를 다시 설정해주세요.');
		} catch (e) {
			alert(e);
		}
	};
  
  return (
    <ModalConatiner>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>과목 일정 등록</h1>
        <CloseButton onClick ={()=>handleModalToggle('subject')}/>
        <Grid>
        <label htmlFor='title'>제목</label>
        <InputDiv>
          <StyledInput 
            id='title'
            type='text'
            placeholder='제목을 입력해주세요.'
            {...register('title', { required: true })}/>
        </InputDiv>
        <label htmlFor='scheduleType'>유형</label>
        <InputDiv>
          <StyledSelect id='scheduleType'  {...register('scheduleType', { required: true })}>
            <option value='TASK'>TASK</option>
            <option value='SCHEDULE'>SCHEDULE</option>
          </StyledSelect>
        </InputDiv>
        <label htmlFor='contents'>상세내용</label>
        <InputDiv>
          <StyledTextarea 
            id='contents' 
            placeholder='상세내용을 입력해주세요.'
            {...register('contents', { required: true })}
          />
        </InputDiv>
        <label htmlFor='className'>과목명</label>
        <InputDiv>
          <StyledSelect id='className' {...register('className', { required: true })}>
            {subjectList?.map((el)=> <option key={el} value={el}>{el}</option>)}
          </StyledSelect>
        </InputDiv>
        <label htmlFor='subjectScheduleType'>일정 종류</label>
        <InputDiv>
          <StyledSelect id='subjectScheduleType' {...register('subjectScheduleType', { required: true })}>
            <option value='ASSIGNMENT'>ASSIGNMENT</option>
            <option value='TEST'>TEST</option>
            <option value='PRESENTATION'>PRESENTATION</option>
          </StyledSelect>
        </InputDiv>
        <label htmlFor='importance'>중요도</label>
        <InputDiv>
          <StyledSelect id='importance'  {...register('importance', { required: true })}>
            <option value='EASYGOING'>EASYGOING</option>
            <option value='NORMAL'>NORMAL</option>
            <option value='IMPORTANT'>IMPORTANT</option>
          </StyledSelect>
        </InputDiv>
        <label htmlFor='startDate'>시작 날짜</label>
        <InputDiv>
          <input type='datetime-local' {...register('startDate', { required: true })}></input>
        </InputDiv>
        <label htmlFor='endDate'>마감 날짜</label>
        <InputDiv>
          <input type='datetime-local' {...register('endDate', { required: true })}></input>
        </InputDiv>
        </Grid>
        <SubmitButton name='등록하기' width='15rem' height='3rem' color='#228be6'/>
    </Form>
    </ModalConatiner>
  )
}

export default SubjectScheduleAdd