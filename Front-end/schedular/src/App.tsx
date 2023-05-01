import AppRouter from './AppRouter';
import styled from 'styled-components';
import './App.css';
import GlobalStyle from './Styles/GlobalStyles';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

const Main = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 2rem;
`;

function App() {
  return (
    <div className="App">        
      <GlobalStyle />
      <Header />
      <Main>
        {/* <h1>Dongguk University E-class</h1> */}
        <AppRouter />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
