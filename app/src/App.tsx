import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Routes>


        <Route element={<PrivateRoutes />}></Route>

        {/* 404 fallback */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
