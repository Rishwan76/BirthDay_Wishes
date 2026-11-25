import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BirthdayExperience from "./pages/BirthdayExperience";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import Dashboard from "./pages/admin/Dashboard";
import CreateBirthday from "./pages/admin/CreateBirthday";
import EditBirthday from "./pages/admin/EditBirthday";
import PreviewBirthday from "./pages/admin/PreviewBirthday";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/birthday/:slug" element={<BirthdayExperience />} />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<ProtectedRoute><AdminRegister /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/birthdays/new" element={<ProtectedRoute><CreateBirthday /></ProtectedRoute>} />
      <Route path="/admin/birthdays/:id/edit" element={<ProtectedRoute><EditBirthday /></ProtectedRoute>} />
      <Route path="/birthday-preview/:id" element={<ProtectedRoute><PreviewBirthday /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
