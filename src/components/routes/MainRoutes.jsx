import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserProfile from "../users/UserProfile";

const MainRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />

      {user && (
        <>
          <Route path="/" element={<Home />} />
        </>
      )}
      <Route path="/profile/:id" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default MainRoutes;
