import EclassMenu from './../Components/EclassMenu';
import EclassClassName from 'Components/EclassClassName';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue} from 'recoil';
import { userInfoState } from 'recoil/Atom'

const StyledLink = styled(Link)`
  margin: 30px;
  text-align: center;
  color: #fff;
  padding: 9px 18px;
  border: none;
  border-radius: 3px;
  background-color: #228be6;
  font-size: 13px;
  cursor: pointer;
`;

const isStudent = (userType:string|null):boolean => {
  if(userType === "STUDENT") {
    return true
  } return false;
}

const EclassSubject = () =>{

  const userType = useRecoilValue(userInfoState).userType;
  const STUDENT = isStudent(userType);

  return (
    <>
      <EclassMenu />
      <EclassClassName/>
      { STUDENT ? '' : <StyledLink to='/eclass/add'>과제등록하기</StyledLink>}
    </>
  )

}

export default EclassSubject;