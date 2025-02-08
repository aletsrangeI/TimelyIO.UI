import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Topbar } from "./scenes/global/Topbar";
import DashBoard from "./scenes/dashboard";
import { Sidebar } from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute, PublicRoute } from "./routes";
import { Login } from "./scenes/login";


function App() {
  const [theme, colorMode] = useMode();
  const status = useSelector((state) => state.auth.status);
  const isAuthenticated = status === "authenticated";
  const dispatch = useDispatch();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated ? <Sidebar /> : null}
          <main className="content">
            {isAuthenticated ? <Topbar /> : null}
            <Routes>

              {/* Rutas protegidas para usuarios no autenticados */}

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute>
                    {/* <Register /> */}
                  </PublicRoute>
                }
              />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<DashBoard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
              </Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
