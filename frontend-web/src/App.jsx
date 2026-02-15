import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MateriList from "./pages/MateriList";
import ProtectedRoute from "./components/ProtectedRoute";
import MataPelajaran from "./pages/MataPelajaran";
import DetailMateri from "./pages/DetailMateri"
import TambahMateri from "./pages/TambahMateri";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root ke login */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/materi"
            element={
              <ProtectedRoute>
                <MateriList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mata-pelajaran/:kategori"
            element={
              <ProtectedRoute>
                <MataPelajaran />
              </ProtectedRoute>
            }
          />

          <Route
            path="/materi/detail/:id"
            element={
              <ProtectedRoute>
                <DetailMateri />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tambah-materi"
            element={
              <ProtectedRoute>
                <TambahMateri />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
