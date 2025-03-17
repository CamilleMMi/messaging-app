import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppStore } from '@/store';
import apiClient from '@/configurations/api-client.configuration-1.0.0';
import Auth from "@/pages/auth";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

const App = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get("/auth/user");
        if (response.status == 200) {
          setUserInfo(response.data);
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    }

    if (!userInfo) {
      getUserInfo();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthRoute>
          <Auth />
        </AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute>
          <Chat />
        </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute>
          <Profile />
        </PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;