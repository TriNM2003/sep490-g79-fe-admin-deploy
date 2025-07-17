import { Toaster } from "sonner";
import AppRoutes from "./routes";
function App() {
  return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-background">
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </div>
  );
}
export default App;
