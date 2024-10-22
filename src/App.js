import './App.css';
import { Routes, Route } from "react-router-dom";
import React from 'react';

import Layout from './components/Layout';
import { Home} from "./components/Home";
import { About } from "./components/About";
import { Modal } from "./components/Modal";
import { NoMatch } from "./components/NoMatch";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}></Route>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/airport/:id" element={<Modal/>} />
      </Routes>
    </div>
  );
}


