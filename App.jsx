import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SavedCareersProvider } from './contexts/SavedCareersContext';
import { ComparisonProvider } from './contexts/ComparisonContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Auth from "./pages/Auth";
import UserDashboard from './pages/UserDashboard';
import CareerPaths from './pages/CareerPaths';
import CareerDetail from './pages/CareerDetail';
import CareerQuiz from './pages/CareerQuiz';
import CareerComparison from './pages/CareerComparison';
import Counseling from './pages/Counseling';
import ResourceLibrary from './pages/ResourceLibrary';
import AdminDashboard from './pages/AdminDashboard';
import VideoBackground from './components/VideoBackground';
import { ROLES } from './contexts/AuthContext';
import './App.css';
import './styles/global.css';

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app">
      {isHome && <VideoBackground src="/video/background.mp4" />}
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/career-paths" element={<CareerPaths />} />
          <Route path="/career-paths/:id" element={<CareerDetail />} />
          <Route path="/career-quiz" element={<CareerQuiz />} />
          <Route path="/career-comparison" element={<CareerComparison />} />
          <Route path="/counseling" element={<Counseling />} />
          <Route path="/resources" element={<ResourceLibrary />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole={ROLES.ADMIN}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SavedCareersProvider>
          <ComparisonProvider>
            <Router>
              <AppShell />
            </Router>
          </ComparisonProvider>
        </SavedCareersProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
