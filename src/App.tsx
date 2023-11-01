import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error404 } from "./pages/Error404";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
