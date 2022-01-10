import { Route, Routes } from 'react-router-dom';
import { CreatePage } from './CreatePage/CreatePage';
import { EditPage } from './EditPage/EditPage';
import './App.css';

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
  return <div>Projects</div>;
};

export default App;
