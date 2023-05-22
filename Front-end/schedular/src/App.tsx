import AppRouter from './AppRouter';
import styled from 'styled-components';
import './App.css';
import GlobalStyle from './Styles/GlobalStyles';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import {RecoilRoot} from 'recoil';

const Main = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 1000px;
`;
function App() {
  return (
    <div className="App">        
      <GlobalStyle />
      <RecoilRoot> 
        <Main>
          <Header />
          <AppRouter />
        </Main>
        <Footer />
      </RecoilRoot> 
    </div>
  );
}

export default App;
