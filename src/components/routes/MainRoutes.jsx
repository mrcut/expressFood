import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import UserDelete from "../users/UserDelete";
import UserEdit from "../users/UserEdit";
import UsersList from "../users/UserList";
import UserProfile from "../users/UserProfile";

import DelivererAdd from "../deliverers/DelivererAdd";
import DelivererDelete from "../deliverers/DelivererDelete";
import DelivererEdit from "../deliverers/DelivererEdit";

import Basket from "../basket/Basket";
import NotFound from "../pages/NotFound";
import ProductAdd from "../products/ProductAdd";
import ProductDelete from "../products/ProductDelete";
import ProductEdit from "../products/ProductEdit";
import ProductList from "../products/ProductList";
import Checkout from "../basket/Checkout";
import OrderList from "../basket/OrderList";

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
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
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
      <Route
        path="/users"
        element={
          <AdminRoute>
            <UsersList />
          </AdminRoute>
        }
      />
      <Route
        path="/EditUser/:id"
        element={
          <ProtectedRoute>
            <UserEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/deleteUser/:id"
        element={
          <AdminRoute>
            <UserDelete />
          </AdminRoute>
        }
      />
      <Route
        path="/addDeliverer"
        element={
          <AdminRoute>
            <DelivererAdd />
          </AdminRoute>
        }
      />
      <Route
        path="/editDeliverer/:id"
        element={
          <AdminRoute>
            <DelivererEdit />
          </AdminRoute>
        }
      />
      <Route
        path="/DeleteDeliverer/:id"
        element={
          <AdminRoute>
            <DelivererDelete />
          </AdminRoute>
        }
      />
      <Route
        path="/basket"
        element={
          <ProtectedRoute>
            <Basket />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
