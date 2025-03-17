import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppStore } from "@/store";
import apiClient from "@/configurations/api-client.configuration-1.0.0";
import Auth from "@/pages/auth";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  return userInfo ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  return userInfo ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
  
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    } else {
      setLoading(false);
      return;
    }
  
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get("/auth/user-info");
  
        if (response.status === 200) {
          setUserInfo(response.data);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
        } else {
          setUserInfo(null);
          localStorage.removeItem("userInfo");
        }
      } catch (error) {
        setUserInfo(null);
        localStorage.removeItem("userInfo");
      } finally {
        setLoading(false);
      }
    };
  
    getUserInfo();
  }, [setUserInfo]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
