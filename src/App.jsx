import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./components/routes/MainRoutes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./components/contexts/AuthProvider";
import { BasketProvider } from "./components/contexts/BasketContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./assets/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BasketProvider>
          <BrowserRouter>
            <Header />
            <MainRoutes />
            <Footer />
          </BrowserRouter>
        </BasketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
