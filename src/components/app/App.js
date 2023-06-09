import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AppHeader, MainPage, ComicsPage, Page404, SingleComicPage } from '../pages';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:id" element={<SingleComicPage />} />
            <Route path="/characters/:id" element={<ComicsPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
