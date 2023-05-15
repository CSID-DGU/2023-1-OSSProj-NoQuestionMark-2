import {useEffect,useState} from 'react'
import {Subjects,Schedules} from 'interfaces/homeSchedule';
import styled from 'styled-components';
import background_image from '../Assets/Images/IMG_4174.jpeg'
import MyClass from '../Components/MyClass';
import MySchedule from '../Components/MySchedule';
import { useRecoilValue } from 'recoil';
import { isLoginCheck } from 'recoil/Atom'
import * as Api from "lib/Api";

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
  const [schedule,setSchedule] = useState<Schedules>([]);
  const [subjects,setSubjects] = useState<Subjects>([]);
  const loginCheck = useRecoilValue(isLoginCheck);

  useEffect(() =>{
    console.log('rerender Test')
    if(loginCheck){
      console.log(loginCheck);
      (async () =>{
        await Api.get('/home').then( (res) => {
          const {schedule,subjects} = res.data.result;
          setSchedule([...schedule]);
          setSubjects([...subjects]);
        });
      })(); 
    }
    else {
      setSchedule([]);
      setSubjects([]);
    }
  },[loginCheck])

  return (
    <>
      <Content>
        <BgImage style={{ backgroundImage: `url(${background_image})`}}>
        <MyWapper>
          <MySchedule schedule={schedule} loginCkeck={loginCheck}></MySchedule>
          <MyClass subjects={subjects} loginCkeck={loginCheck}></MyClass>
        </MyWapper>
        </BgImage>
      </Content>
    </>
  )
}

export default Home
