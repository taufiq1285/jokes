import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Joke from "./pages/Joke";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
    // TODO: for initial state get from local storage for key isAuthenticated
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/jokes"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Joke />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login handleLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
};

export default App;
