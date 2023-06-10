import AppRouter from './AppRouter';
import styled from 'styled-components';
import './App.css';
import GlobalStyle from './Styles/GlobalStyles';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import {RecoilRoot} from 'recoil';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const ContentWrapper = styled.div`
  flex-grow: 1;
`;

function App() {
  return (
    <div className="App">        
      <GlobalStyle />
      <RecoilRoot> 
        <AppWrapper>
          <ContentWrapper>
            <Header />
            <AppRouter />
          </ContentWrapper>
        </AppWrapper>
        <Footer />
      </RecoilRoot> 
    </div>
  );
}

export default App;
