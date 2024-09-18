import { Routes, Route } from 'react-router-dom';

import HomePage from '../../../pages/homePage';
import LoginPage from '../../../pages/loginPage';
import ErrorPage from '../../../pages/errorPage';

import './style/index.scss';

function App() {
  return (
    <div className="wrapper">
      <div className="conteiner">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
