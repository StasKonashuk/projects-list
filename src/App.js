import { Route, Routes } from 'react-router-dom';
import CreatePage from './CreatePage/CreatePage';
import EditPage from './EditPage/EditPage';
import style from './App.module.css';
import Content from './Content/Content';

const App = () => {
  return (
    <Routes>
      <Route path="/projects-list" element={<Main />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/edit" element={<EditPage />} />
    </Routes>
  );
};

const Main = () => {
  return (
    <div className={style.appContainer}>
      <div className={style.appContentContainer}>
        <div className={style.appTitle}>
          <h1>Projects manager</h1>
        </div>
        <div>
          <Content />
        </div>
      </div>
    </div>
  );
};

export default App;
