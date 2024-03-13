import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserProfile from "../users/UserProfile";
import UsersList from "../users/ListUser";
import UserEdit from "../users/UserEdit";
import UserDelete from "../users/UserDelete";
import UserDetail from "../users/UserDetails";

import DelivererAdd from "../deliverers/DelivererAdd";
import DelivererDetail from "../deliverers/DelivererDetail";
import DelivererEdit from "../deliverers/DelivererEdit";
import DelivererDelete from "../deliverers/DelivererDelete";


const MainRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={<Register />}
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
      <Route path="/users" element={<UsersList />} />
      
      <Route path="/EditUser/:id" element={<UserEdit />} />
      <Route path="/deleteUser/:id" element={<UserDelete />} />
      <Route path="/detailUser/:id" element={<UserDetail />} />

      <Route path="/addDeliverer" element={<DelivererAdd />} />
      <Route path="/detailDeliverer/:id" element={<DelivererDetail />} />
      <Route path="/EditDeliverer/:id" element={<DelivererEdit />} />
      <Route path="/DeleteDeliverer/:id" element={<DelivererDelete />} />


    </Routes>
  );
};

export default MainRoutes;
