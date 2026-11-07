import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/home-page';
import { ProjectsPage } from '@/pages/projects-page';
import { TerminalPage } from '@/pages/terminal-page';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/terminal" element={<TerminalPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
