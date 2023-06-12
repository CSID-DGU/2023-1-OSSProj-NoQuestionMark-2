import {useEffect,useState} from 'react'
import {Subjects,Schedules} from 'interfaces/homeSchedule';
import styled from 'styled-components';
import background_image from '../Assets/Images/IMG_4174.jpeg'
import MyClass from '../Components/MyClass';
import MySchedule from '../Components/MySchedule';
import { useRecoilValue } from 'recoil';
import { isLoginCheck, EventState} from 'recoil/Atom'
import * as Api from 'lib/Api';
import styled from 'styled-components';
import background_image from '../Assets/Images/IMG_4174.jpeg'
import QuickMenu_image from '../Assets/Images/quick_banner01.png'
import QuickMenu_image2 from '../Assets/Images/quick_banner02.png'
import QuickMenu_image3 from '../Assets/Images/quick_banner03.png'
import QuickMenu_image4 from '../Assets/Images/quick_banner04.png'
import QuickMenu_image5 from '../Assets/Images/quick_banner05.png'
import QuickMenu_image6 from '../Assets/Images/quick_banner06.png'

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
  const allEvent = useRecoilValue(EventState);
  const loginCheck = useRecoilValue(isLoginCheck);

  useEffect(() =>{
    if(loginCheck){
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
  },[loginCheck,allEvent])

  return (
    <>
      <Content>
        <BgImage style={{ backgroundImage: `url(${background_image})`}}>
        <MyWapper>
          <MySchedule schedule={schedule} loginCkeck={loginCheck}></MySchedule>
          <MyClass subjects={subjects} loginCkeck={loginCheck}></MyClass>
        </MyWapper>
        <QuickMenuWapper>
          <QuickMenuTitle>QUICK MENU</QuickMenuTitle>
          <QuickMenuContent>
            <QuickMenuImage src={QuickMenu_image} alt='Quick Menu' />
            <QuickMenuSpan>동국대학교</QuickMenuSpan>
          </QuickMenuContent>
          <QuickMenuContent>
            <QuickMenuImage src={QuickMenu_image2} alt='Quick Menu' />
            <QuickMenuSpan>uDRIMS</QuickMenuSpan>
          </QuickMenuContent>
          <QuickMenuContent>
            <QuickMenuImage src={QuickMenu_image3} alt='Quick Menu' />
            <QuickMenuSpan>드림패스</QuickMenuSpan>
          </QuickMenuContent>
          <QuickMenuContent>
            <QuickMenuImage src={QuickMenu_image4} alt='Quick Menu' />
            <QuickMenuSpan>교수학습개발센터</QuickMenuSpan>
          </QuickMenuContent>
          <QuickMenuContent>
            <QuickMenuImage src={QuickMenu_image5} alt='Quick Menu' />
            <QuickMenuSpan>카피킬라</QuickMenuSpan>
          </QuickMenuContent>
          <QuickMenuContent>
            <QuickMenuImage src={QuickMenu_image6} alt='Quick Menu' />
            <QuickMenuSpan>중앙도서관</QuickMenuSpan>
          </QuickMenuContent>
        </QuickMenuWapper>
        {loginCheck ? 
          <LeftBannerWapper>
            <LeftBannerTitle>학교공지</LeftBannerTitle>
            <LeftBannerS>
              <LeftBanenrSpan>학사공지</LeftBanenrSpan>
            </LeftBannerS>
            <LeftBannerJ>
              <LeftBanenrSpan>장학공지</LeftBanenrSpan>
            </LeftBannerJ>
            <LeftBannerC>
              <LeftBanenrSpan>취업공지</LeftBanenrSpan>
            </LeftBannerC>
          </LeftBannerWapper>
        : ''}
      </BgImage>
      </div>
    </>
  )
}

export default Home
