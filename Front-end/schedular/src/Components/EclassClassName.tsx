import styled from 'styled-components';
import { Link } from 'react-router-dom';
import background_image from '../Assets/Images/visual_img_large01.jpg'

const BgImage = styled.div`
  height: 180px;
  background-size: cover;
`;
const SubjectName = styled(Link)`
  position: absolute;
  margin-top: 58px;
  color: #fff;
  font-size: 50px;
  font-weight: bolder;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #000;
`;
const StyledH2 = styled.h2`
  text-align: left;
  padding-left: 300px;
`;


const EclassClassName = () => {
  return(
    <>
    <BgImage style={{ backgroundImage: `url(${background_image})`}}>
      <SubjectName to='#'>과목명</SubjectName>
    </BgImage>
    <StyledH2>학습 활동</StyledH2>
    </>
  )
}

export default EclassClassName;