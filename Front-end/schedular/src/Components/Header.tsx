import SignIn from './SignIn';
import styled from 'styled-components';
import eclass_logo from '../Assets/Images/eclass_logo.png'
import { Link } from 'react-router-dom';

const HeaderWapper = styled.div`
  height: 100px;
  display: flex;
  margin-left: 5rem;
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


const Header = () => {

  return(
    <HeaderWapper>
      <EclassLogo to='/'></EclassLogo>
      <SignIn></SignIn>
    </HeaderWapper>
  )
}

export default Header;