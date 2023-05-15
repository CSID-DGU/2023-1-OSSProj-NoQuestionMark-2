import { useLocation } from 'react-router-dom';
import {useEffect} from 'react'
import styled from 'styled-components';
import background_image from '../Assets/Images/IMG_4174.jpeg'
import MyClass from '../Components/MyClass';
import MySchedule from '../Components/MySchedule';

const BgImage = styled.div`
  min-height: 800px;
  background-size: cover;
`;
const MyWapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 4rem 0;
`;
const Content = styled.div`
`;

const Home = () => {
  // const {state} = useLocation();
  // const {schedule,subjects} = state;
  
  return (
    <>
      <Content>
        <BgImage style={{ backgroundImage: `url(${background_image})`}}>
        <MyWapper>
          {/* <MySchedule schedule={schedule}></MySchedule>
          <MyClass subjects={subjects}></MyClass> */}
          <MySchedule></MySchedule>
          <MyClass></MyClass>
        </MyWapper>
        </BgImage>
      </Content>
    </>
  )
}

export default Home
