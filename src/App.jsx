import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { NewsPage } from './pages/NewsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UserPage } from './pages/UserPage';
import { OwnUserPage } from './pages/OwnUserPage';
import Modal from 'react-modal';

function App() {
    Modal.setAppElement('#root');
    return (
        <main className="main-container">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/users/:id" element={<UserPage />} />
                <Route path="/users" element={<OwnUserPage />} />
                <Route path="/news/:id" element={<NewsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </main>
    );
}
export default App;
