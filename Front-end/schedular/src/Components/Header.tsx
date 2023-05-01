import SignIn from "../SignIn";
import styled from "styled-components";
import eclass_logo from "../Images/eclass_logo.png"

   
const Header = () => {
  return(
    <HeaderWapper>
        <EclassLogo src={eclass_logo} alt="eclass_logo"/>
        <SignIn></SignIn>
        <a href="/SignUp">
            <SignUpButton>회원가입</SignUpButton>
        </a>
      </HeaderWapper>
  )
}
      
const HeaderWapper = styled.div`
  height: 100px;
  display: flex;
`;

const EclassLogo = styled.img`
  position: relative;
  top: 0;
  botton: 0;
  margin: auto 10px auto 20px;
  height: 42px;
  width: 240px;  
`;


const SignUpButton = styled.button`
  margin 33px 0;
  height: 35px;
  width: 80px;
  text-align: center;
  color: #fff;
  padding: 7px 16px;
  border: none;
  border-radius: 2px;
  background-color: #666;
  font-size: 12px;
`;

const BgImage = styled.div`
  height: 100%;
  background-color: orange;
  background-image: url(../Images/IMG_4174.jpeg);
`


export default Header;