import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import background_image from '../Assets/Images/visual_img_large01.jpg'

const BgImage = styled.div`
  height: 180px;
  background-size: cover;
`;
const SubjectName = styled.span`
  display: inline-block;
  margin-top: 50px;
  margin-left: 10rem;
  color: #fff;
  font-size: 50px;
  font-weight: bolder;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #000;
`;


const EclassClassName = () => {
  const location = useLocation();
  const subjectName = location.state.subjectName;

  return(
    <>
    <BgImage style={{ backgroundImage: `url(${background_image})`}}>
      <SubjectName>{subjectName}</SubjectName>
    </BgImage>
    </>
  )
}

export default EclassClassName;