import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Main from './Main';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" Component={ Main } />
        <Route path="/hello" />
      </Routes>
    </HashRouter>
  );
}

export default App;
