import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./components/routes/MainRoutes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./components/contexts/AuthProvider";
import { BasketProvider } from "./components/contexts/BasketContext";

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
        <BrowserRouter>
          <Header />
          <MainRoutes />
          <Footer />
        </BrowserRouter>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
