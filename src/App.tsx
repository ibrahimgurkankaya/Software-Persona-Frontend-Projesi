import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import AddItemPage from './pages/AddItemPage';
import EditItemPage from './pages/EditItemPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

/** Sayfa yönlendirmeleri */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ekle" element={<AddItemPage />} />
        <Route path="/duzenle/:id" element={<EditItemPage />} />
        <Route path="/hakkinda" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
