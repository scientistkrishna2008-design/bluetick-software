import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { Splash } from "./pages/Splash";
import { Home } from "./pages/Home";
import { Join } from "./pages/Join";
import { Login } from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import { EngineerDashboard } from "./pages/dashboards/EngineerDashboard";
import { ProjectDetails } from "./pages/projects/ProjectDetails";

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (user.status === "Pending") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background text-center">
        <div>
          <div className="w-16 h-16 bg-bluetick-500/20 text-bluetick-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Account Under Review</h2>
          <p className="text-gray-400">Your application is currently pending approval by an administrator.</p>
        </div>
      </div>
    );
  }

  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboards */}
        <Route 
          path="/dashboard/admin" 
          element={
            <ProtectedRoute allowedRoles={['Administrator']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/engineer" 
          element={
            <ProtectedRoute allowedRoles={['Web Engineer']}>
              <EngineerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/project/:id" 
          element={
            <ProtectedRoute allowedRoles={['Administrator', 'Web Engineer', 'Growth Partner']}>
              <ProjectDetails />
            </ProtectedRoute>
          } 
        />{/* Placeholder for other dashboards */}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
