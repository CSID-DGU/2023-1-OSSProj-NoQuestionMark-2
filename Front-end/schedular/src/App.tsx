import AppRouter from './AppRouter';
import styled from 'styled-components';
import './App.css';
import GlobalStyle from './Styles/GlobalStyles';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

const Main = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 100px;
`;

function App() {
  return (
    <Main className="App">
      <GlobalStyle />
      <Header></Header>
      {/* <h1>Dongguk University E-class</h1> */}
      <AppRouter />
      <Footer></Footer>
    </Main>
  );
}

export default App;
