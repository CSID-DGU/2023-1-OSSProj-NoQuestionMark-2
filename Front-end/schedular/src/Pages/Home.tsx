import styled from 'styled-components';
import background_image from '../Assets/Images/IMG_4174.jpeg'

const BgImage = styled.div`
  min-height: 800px;
  background-size: cover;
`;
const Content = styled.div`
`

const Home = () => {

  return (
    <>
      <Content>
        <BgImage style={{ backgroundImage: `url(${background_image})`}}>
          <div>
            
          </div>
        </BgImage>
      </Content>
    </>
  )
}

export default Home
