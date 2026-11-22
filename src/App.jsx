import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ChapterPage from './pages/ChapterPage';
import PYQPage from './pages/PYQPage';
import QuizPage from './pages/QuizPage';
import RevisionPage from './pages/RevisionPage';
import ProgressPage from './pages/ProgressPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="chapter/:chapterId/:topicId?" element={<ChapterPage />} />
        <Route path="pyqs" element={<PYQPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="revision" element={<RevisionPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
