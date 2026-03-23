import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import DotGridBackground from "./layout/DotGridBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/sections/AdminOverview";
import AdminProfile from "./pages/admin/sections/AdminProfile";
import AdminProjects from "./pages/admin/sections/AdminProjects";
import AdminCertificates from "./pages/admin/sections/AdminCertificates";
import AdminExperience from "./pages/admin/sections/AdminExperience";
import AdminSkills from "./pages/admin/sections/AdminSkills";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* Portfolio layout — wraps all public pages */
function PortfolioLayout() {
  const location = useLocation();
  const hideBackground = location.pathname.startsWith("/project/");
  return (
    <div className="relative min-h-screen" style={{ background: "#080808" }}>
      {!hideBackground && <DotGridBackground />}
      <div className="no-print">
        <Navbar />
      </div>
      <main className="relative">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <ScrollToTop />
          <Routes>
            {/* ── Public portfolio ── */}
            <Route element={<PortfolioLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Route>

            {/* ── Admin ── */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="skills" element={<AdminSkills />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
