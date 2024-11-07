import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { Header } from './components/Global/Header';
import { AppRoutes } from './services/routes/routes';

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <GlobalStyle />
    </Router>
  );
}

export default App;