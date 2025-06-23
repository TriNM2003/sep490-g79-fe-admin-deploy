import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import Login from "./pages/Common/Login";
import { Toaster } from "sonner";
import Header from "./components/layouts/Header";
import AppRoutes from "./routes";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-background">
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </div>
  );
}

export default App;
