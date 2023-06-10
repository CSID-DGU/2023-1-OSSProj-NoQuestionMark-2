import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import background_image from '../Assets/Images/visual_img_large01.jpg'

const BgImage = styled.div`
  height: 180px;
  width: 87.5%;
  margin-left: 12.3rem;
  background-size: cover;
`;
const SubjectName = styled.span`
  display: inline-block;
  margin-top: 54px;
  margin-right: 4rem;
  color: #fff;
  font-size: 3rem;
  font-weight: bolder;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000;
`;

// memo정민: 이클래스 상단 강의명 Component
const EclassClassName = () => {
  // memo정민: 현재 경로와 상태를 가져오는 location 객체
  const location = useLocation();
  // memo정민: location으로 가져온 subjectName
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