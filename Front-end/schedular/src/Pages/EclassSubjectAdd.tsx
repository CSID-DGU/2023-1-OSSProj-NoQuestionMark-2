import EclassMenu from './../Components/EclassMenu';
import EclassClassName from 'Components/EclassClassName';
import EclassSubjectAddForm from '../Components/EclassSubjectAddForm';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  text-align: left;
  padding-left: 20rem;
`;

// memo정민: 이클래스 공식 과목 일정 등록 페이지
const EclassSubjectAdd = () =>{
  return (
    <>
      <EclassMenu />
      <EclassClassName/>
      <StyledH2>학습 활동</StyledH2>
      <EclassSubjectAddForm/>
    </>
  )

}

export default EclassSubjectAdd;