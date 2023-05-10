import { Link } from 'react-router-dom';
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
  margin-bottom: 1rem;
`;
const MoveButton = styled(Link)`
  display: flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin : auto;
  background-color: #228be6;
  width: 20rem;
  height: 2rem;
  margin-bottom: 1rem;
  font-size: 13px;
  text-align: center; 
  justify-content: center;
  align-items: center;
`;
const ButtonWapper = styled.div`
  margin: 0 auto;
  padding-bottom: 0.5rem;
  width: 22rem;
`;

const SubjectDetailStudent = () => {
  type InputValue = {
    title: string,
    type: string,
    contents: string,
    importance: string,
    startDate: string,
    endDate: string,
  }

  return (
    <Container>
      <h1>과목 일정 상세보기</h1>
      <form>
        <CloseButton/>
        <Grid>
        <label htmlFor='title'>제목</label>
        <InputDiv>
          <StyledInput
            id='title'
            type='text'
            placeholder='제목을 입력해주세요.'
            readOnly/>
        </InputDiv>
        <label htmlFor='contents'>상세내용</label>
        <InputDiv>
          <StyledTextarea 
            id='contents' 
            placeholder='상세내용을 입력해주세요.'
            readOnly/>
        </InputDiv>
        <label htmlFor='subject'>과목명</label>
        <InputDiv>
        </InputDiv>
        <label htmlFor='importance'>일정 종류</label>
        <InputDiv>
          <StyledSelect id='importance' disabled>
            <option value='과제'>과제</option>import SubmitButton from './SubmitButton';
            <option value='시험'>시험</option>
            <option value='발표'>발표</option>
          </StyledSelect>
        </InputDiv>
        <label>시작 날짜</label>
        <InputDiv>
          <input type='datetime-local' readOnly></input>
        </InputDiv>
        <label>마감 날짜</label>
        <InputDiv>
          <input type='datetime-local' readOnly></input>
        </InputDiv>
        </Grid>
        <ButtonWapper>
          <MoveButton to='/'>게시글로 이동하기</MoveButton>
          <CompleteButton type='button'>일정 완료하기</CompleteButton>
        </ButtonWapper>
      </form>
    </Container>
  )
}

export default SubjectDetailStudent