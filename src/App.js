import { Route, Routes } from "react-router-dom";
import "./App.css";

/* Pages */
import Home from "./pages/Home/HomePage";



import RouterScrollTop from "./components/ScrollToTop/RouterScrollTop";

function App() {
  return (
    <>
      <RouterScrollTop />

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
