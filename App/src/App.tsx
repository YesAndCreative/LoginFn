import { BrowserRouter } from "react-router-dom";
import Header from "@/components/Header";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-svh">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
