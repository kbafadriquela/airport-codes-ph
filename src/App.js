import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from './components/Layout';
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Modal } from "./components/Modal";
import { NoMatch } from "./components/NoMatch";

export default function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;


  return (
    <div className="app">
      <Routes location={previousLocation || location}>
        <Route path="/" element={<Layout />}></Route>
          <Route index element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
      </Routes>

      {previousLocation && (
        <Routes>
          <Route path="/airport/:id" element={<Modal />}/>
        </Routes>
      )}
    </div>
  );
}


