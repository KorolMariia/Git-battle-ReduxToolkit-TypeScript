import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Popular from './pages/Popular/index';
import Battle from './pages/Battle/index';
import BattleResults from './pages/Battle/ButtleResults';
import NotFound from './pages/NotFound/NotFound';
import Nav from './Components/Nav';

const App: FC = (): JSX.Element => (
  <BrowserRouter>
    <div className="container">
      <Nav />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Popular />} path="/popular" />
        <Route element={<Battle />} path="/battle" />
        <Route element={<BattleResults />} path="/battle/results" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
