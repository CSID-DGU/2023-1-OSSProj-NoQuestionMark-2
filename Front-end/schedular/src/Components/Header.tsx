import SignIn from './SignIn';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import eclass_logo from '../Assets/Images/eclass_logo.png'

const HeaderWapper = styled.div`
  height: 100px;
  display: flex;
`;
const EclassLogo = styled(Link)`
  position: relative;
  top: 0;
  botton: 0;
  margin: auto 10px auto 20px;
  height: 42px;
  width: 240px;
  background-image: url(${eclass_logo});
  background-size: cover;
`;
const SignUpButton = styled(Link)`
  margin 33px 0;
  text-align: center;
  color: #fff;
  padding: 7px 16px;
  border: none;
  border-radius: 2px;
  background-color: #666;
  font-size: 12px;
`;

const Header = () => {

  return(
    <HeaderWapper>
      <EclassLogo to='/'></EclassLogo>
      <SignIn></SignIn>
      <SignUpButton to='/signup'>회원가입</SignUpButton>
    </HeaderWapper>
  )
}

export default Header;