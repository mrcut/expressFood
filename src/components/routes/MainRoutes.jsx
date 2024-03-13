import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import UserProfile from "../users/UserProfile";
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
