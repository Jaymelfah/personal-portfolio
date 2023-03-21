import { Route, Routes } from "react-router-dom";
import "./App.css";

/* Pages */
import Home from "./pages/Home/HomePage";
import About from "./pages/About/AboutPage";
import Project from "./pages/Project/ProjectPage";
import ProjectApp from "./pages/Project/ProjectApp";
import ProjectGame from "./pages/Project/ProjectGame";

import RouterScrollTop from "./components/ScrollToTop/RouterScrollTop";

function App() {
  return (
    <>
      <RouterScrollTop />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/project" element={<Project />}></Route>
        <Route exact path="/project/app" element={<ProjectApp />} />
        <Route exact path="/project/game" element={<ProjectGame />} />
      </Routes>
    </>
  );
}

export default App;
