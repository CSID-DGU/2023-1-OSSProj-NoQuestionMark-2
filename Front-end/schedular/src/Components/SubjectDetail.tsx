import {useState, MouseEvent } from 'react';
import { useForm, SubmitHandler,Controller } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {ModalToggle, EventSourceInput} from 'interfaces/CalendarState';
import { v4 as uuidv4 } from 'uuid';
import * as Api from '../lib/Api';

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
const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  grid-gap: 0.5rem;
  justify-content : left;
  text-align: left;
  font-size: 13px;
  width: 80%;
  margin: auto;
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
const EclassBtn = styled.button`
  display: block;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  text-align: center; 
  cursor: pointer;
  background-color: #228be6;
  width: 100%;
  height: 2rem;
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
const Heading = styled.h1`
  margin-bottom: 0.2rem;
`
// memo정민: 캘린더 과목 일정 상세보기
const SubjectDetail = ({handleModalToggle,getApi,date,subjectList,event,id}: ModalToggle) => {
  const navigate = useNavigate();
  const formData = {...event};
  // memo정민: 수정 모드 여부를 관리하는 상태
  const [edited, setEdited] = useState(false)
  // memo정민: 수정 버튼 클릭 시 수정 모드 변경
  const onClickEditButton = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEdited(true);
  };
  // memo정민: 취소 버튼 클릭 시 수정 모드 변경
  const onClickReadButton = () => {
    setEdited(false);
    reset({...formData});
  };
  // memo정민: react-hook-form을 사용하여 폼 상태를 관리
  const {     
    register,
    handleSubmit,
    reset,
    control
  } = useForm<EventSourceInput>({mode : 'onBlur'})

  // memo정민: react-hook-form을 사용한 폼 제출 핸들러 정의
  const onSubmit: SubmitHandler<EventSourceInput> = data => putSchedule(data);
  const putSchedule = async ({ title, contents, scheduleType, className, importance, subjectScheduleType, startDate, endDate  }:EventSourceInput) => {
		try {
			const putData = {title, contents, scheduleType, className, importance, subjectScheduleType, startDate, endDate};
      startDate < endDate ?
			await Api.put(`schedule/subject/${id}`, putData).then((res) => {
        alert('정상적으로 일정이 수정되었습니다.');
				if (date) {
          const [month, year] = date;
          getApi?.(year, month);
        }
			}): alert('마감날짜를 다시 설정해주세요.');
      handleModalToggle('subject');
		} catch (e) {
			alert(e);
		}
	};
  
  const delSchedule = async() => {
    const yes = window.confirm('삭제하시겠습니까?');
    if(yes) {
      await Api.delete(`/schedule/subject/${id}`).then((res) => {
        handleModalToggle('subject');
        if (date) {
          const [month, year] = date;
          getApi?.(year, month);
        }
      });
    }
  }
  const moveToElass = (e: React.MouseEvent<HTMLButtonElement>) => {
    const subjectId = (e.target as HTMLButtonElement).value;
    const subjectName = (e.target as HTMLButtonElement).getAttribute('data-subject-name');
    navigate(`/eclass/${subjectId}`, { state: { subjectId, subjectName } })
  }
  const IsOfficial = () =>{
    return formData.schedule ==='OFFICIAL_SUBJECT';
  }
  
  const completeSchedule = async() => {
    const schedule = formData.schedule;
    await Api.post(`/complete/${id}`, schedule).then((res) => {
      handleModalToggle('personal');
      if (date) {
        const [month, year] = date;
        getApi?.(year, month);
      }
      alert('일정완료');
    });
  }

  return (
    <ModalConatiner>      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>{IsOfficial()? '공식일정 상세보기' : '과목일정 상세보기'}</Heading>
        <CloseButton onClick ={()=>handleModalToggle('subject')}/>
        <Grid>
        <label htmlFor='title'>제목</label>
        <InputDiv>
          <Controller
              control={control}
              name='title'
              defaultValue={formData.title}
              rules={{ required: true }}
              render={({ field }) => (
                <StyledInput 
                  id='title' 
                  type='text'
                  value={field.value}
                  placeholder='제목을 입력해주세요.'
                  {...register('title', { required: true })} 
                  readOnly={!edited }
                />
              )}
          />
        </InputDiv>
        {!IsOfficial() &&  <>
        <label htmlFor='scheduleType'>유형</label>
        <InputDiv>
          <Controller
            control={control}
            name='scheduleType'
            defaultValue={formData.scheduleType}
            rules={{ required: true }}
            render={({ field }) => (
              <StyledSelect 
                id='scheduleType' 
                value={field.value}
                placeholder='제목을 입력해주세요.'
                {...register('scheduleType', { required: true })}
                disabled={!edited}
              >
              <option value='TASK'>TASK</option>
              <option value='SCHEDULE'>SCHEDULE</option>
            </StyledSelect>
            )}
          />
        </InputDiv>
        </>}
        <label htmlFor='contents'>상세내용</label>
        <InputDiv>
          <Controller
            control={control}
            name='contents'
            defaultValue={formData.contents}
            rules={{ required: true }}
            render={({ field }) => (
              <StyledTextarea 
              id='contents' 
              placeholder='상세내용을 입력해주세요.'
              value={field.value}
              readOnly={!edited }
              {...register('contents', { required: true })} 
              />
            )}
          />
        </InputDiv>
        <label htmlFor='className'>과목명</label>
        <InputDiv>
          <Controller
              control={control}
              name='className'
              defaultValue={formData.className}
              rules={{ required: true }}
              render={({ field }) => (
                <StyledSelect id='className' value={field.value} {...register('className', { required: true })} disabled={!edited}>
                {subjectList?.map((el)=> <option key={uuidv4()} value={el}>{el}</option>)}
              </StyledSelect>
              )}
          /> 
        </InputDiv>
        <label htmlFor='subjectScheduleType'>일정 종류</label>
        <InputDiv>
          <Controller
              control={control}
              name='subjectScheduleType'
              defaultValue={formData.subjectScheduleType}
              rules={{ required: true }}
              render={({ field }) => (
                <StyledSelect id='subjectScheduleType' value={field.value} {...register('subjectScheduleType', { required: true })} disabled={!edited}>
                  <option value='ASSIGNMENT'>ASSIGNMENT</option>
                  <option value='PRESENTATION'>PRESENTATION</option>
                  <option value='TEST'>TEST</option>
                </StyledSelect>
              )}
          />
        </InputDiv>
        {!IsOfficial() &&  
        <>
        <label htmlFor='importance'>중요도</label>
        <InputDiv>
          <Controller
            control={control}
            name='importance'
            defaultValue={formData.importance}
            rules={{ required: true }}
            render={({ field }) => (
                <StyledSelect id='importance' value={field.value} {...register('importance', { required: true })} disabled={!edited}>
                  <option value='EASYGOING'>EASYGOING</option>
                  <option value='NORMAL'>NORMAL</option>
                  <option value='IMPORTANT'>IMPORTANT</option>
                </StyledSelect>
            )}
          />
        </InputDiv>
        </>}
        <label>시작 날짜</label>
        <Controller
            control={control}
            name='startDate'
            defaultValue={formData.startDate}
            rules={{ required: true }}
            render={({ field }) => (
              <InputDiv>
              <input
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                type='datetime-local'
                readOnly={!edited}
              />
              </InputDiv>
            )}
          />
        <label>마감 날짜</label>
        <Controller
            control={control}
            name='endDate'
            defaultValue={formData.endDate}
            rules={{ required: true }}
            render={({ field }) => (
              <InputDiv>
              <input
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                type='datetime-local'
                readOnly={!edited}
              />
              </InputDiv>
            )}
          />
        </Grid>
        {edited ? ( 
          <ButtonWapper>      
            <ButtonLine>
              <EditButton type='submit'>수정완료</EditButton>
              <CDButton type='button' onClick={onClickReadButton}>취소하기</CDButton>
            </ButtonLine>            
          </ButtonWapper> ) : ( 
          <>
          {IsOfficial() ?
            <ButtonWapper> 
              <EclassBtn onClick={moveToElass} value={id} data-subject-name={formData.className}>이클래스가기</EclassBtn>
            </ButtonWapper> 
            :
            <ButtonWapper> 
              {formData.scheduleType==='TASK' && <CompleteButton type='button' onClick={completeSchedule}>일정 완료하기</CompleteButton>}
              <ButtonLine> 
                <EditButton type='button' onClick={onClickEditButton}>수정하기</EditButton>
                <CDButton type='button' onClick={delSchedule}>삭제하기</CDButton>
              </ButtonLine>
            </ButtonWapper>
          }
          </>
        )}
      </Form>
    </ModalConatiner>
  )
}

export default SubjectDetail