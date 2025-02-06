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
              <Route path="/" element={<DashBoard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
