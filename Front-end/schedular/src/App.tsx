import AppRouter from './AppRouter';
import styled from 'styled-components';
import './App.css';
import GlobalStyle from './Styles/GlobalStyles';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

const AppWarpper = styled.div`
  min-height: 100%;
  position: relative;
  padding-bottom: 100px;
`;

function App() {
  return (
    <AppWarpper className="App">
      <GlobalStyle />
      <Header></Header>
      <AppRouter />
      <Footer></Footer>
    </AppWarpper>
  );
}

export default App;
