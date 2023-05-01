import Header from "../Components/Header";
import styled from "styled-components";




const Home = () => {

  return (
    <>
      <Header></Header>
      <Content>
        <BgImage>
          background image
          <div>
            내 할 일 보기
            내 강의실
          </div>
        </BgImage>
      </Content>
    </>
  )
}



const BgImage = styled.div`
  height: 100%;
  background-color: orange;
  background-image: url(../Images/IMG_4174.jpeg);
`;

const Content = styled.div`
`


export default Home
