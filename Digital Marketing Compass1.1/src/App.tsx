import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import CreatorsPage from "@/pages/CreatorsPage";
import CreatorProfilePage from "@/pages/CreatorProfilePage";
import ServicesPage from "@/pages/ServicesPage";
import WorkPage from "@/pages/WorkPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import { AdminDashboard } from "@/pages/AdminDashboard";
import NotFoundPage from "@/pages/NotFoundPage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/components/Login"
import Register from "@/components/Register"

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/creators" element={<CreatorsPage />} />
              <Route path="/creators/:id" element={<CreatorProfilePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/> } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;