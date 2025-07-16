import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import EmployeeDetail from "./pages/EmployeeDetail";
import GithubCallback from "./pages/GithubCallback";
import PageNotFound from "./pages/PageNotFound";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import AuthObserver from "./AuthObserver";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthObserver />
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/loginpage"
            element={<LoginPage />}
          />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees/:uuid"
            element={<EmployeeDetail />}
          />
          <Route
            path="/auth/github/callback"
            element={<GithubCallback />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
