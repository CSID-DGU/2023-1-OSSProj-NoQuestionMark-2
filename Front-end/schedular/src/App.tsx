import AppRouter from './AppRouter';
import './App.css';
import GlobalStyle from './Styles/GlobalStyles';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      {/* <h1>Dongguk University E-class</h1> */}
      <AppRouter />
    </div>
  );
}

export default App;
