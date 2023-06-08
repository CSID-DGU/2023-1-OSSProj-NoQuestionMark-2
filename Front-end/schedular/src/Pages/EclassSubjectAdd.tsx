import EclassMenu from './../Components/EclassMenu';
import EclassClassName from 'Components/EclassClassName';
import EclassSubjectAddForm from '../Components/EclassSubjectAddForm';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  text-align: left;
  padding-left: 20rem;
`;

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