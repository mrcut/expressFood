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

import ProductList from "../products/ProductList";
import ProductAdd from "../products/ProductAdd";
import ProductEdit from "../products/ProductEdit";
import ProductDelete from "../products/ProductDelete";
import NotFound from "../pages/NotFound";

// Protected route component (hypothetical example)
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

const GuestRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/" />;
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
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
      element=
      {
        <GuestRoute>
          <Register />
        </GuestRoute>
      }
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/plat"
        element={
          <ProtectedRoute>
            <ProductList type="plat" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/dessert"
        element={
          <ProtectedRoute>
            <ProductList type="dessert" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addProduct"
        element={
          <AdminRoute>
            <ProductAdd />
          </AdminRoute>
        }
      />
      <Route
        path="/editProduct/:id"
        element={
          <AdminRoute>
            <ProductEdit />
          </AdminRoute>
        }
      />
      <Route
        path="/deleteProduct/:id"
        element={
          <AdminRoute>
            <ProductDelete />
          </AdminRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
