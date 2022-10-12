import * as React from 'react';
import { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './scss/index.scss';

const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));

function App() {
  return (
    <>
      <div style={{ display: 'none' }}>Вот тут будет жить ваше приложение :)</div>
      <HashRouter>
        <Suspense>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}

export default App;
