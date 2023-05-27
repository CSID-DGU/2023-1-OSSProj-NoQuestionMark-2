import EclassMenu from './../Components/EclassMenu';
import EclassClassName from 'Components/EclassClassName';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-align: center;
  color: #fff;
  padding: 9px 18px;
  border: none;
  border-radius: 3px;
  background-color: #228be6;
  font-size: 13px;
  cursor: pointer;
`;

const EclassSubject = () =>{

  return (
    <>
      <EclassMenu />
      <EclassClassName/>
      <StyledLink to='/eclass/add'>등록하기</StyledLink>
    </>
  )

}

export default EclassSubject;