// src/hooks/useAuth.ts
import { useState } from "react";
import { registerUser, loginUser, getUser } from "../services/authUser";
import { User } from "../models/user";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (token && token.trim() !== "" && role && role.trim() !== "") {
      return true;
    }
    return false;
  });

  const getRole = () => localStorage.getItem("role");
  const getToken = () => localStorage.getItem("access_token");

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    address: string;
    role: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser(data);
      localStorage.setItem("access_token", response.data.token);
      setSuccess("User registered successfully");
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(data);
      console.log(response);
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("role", response.data.role);
      console.log(response.data.token);
      setSuccess("User logged in successfully");
      setIsAuthenticated(true);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUser();
      console.log(user);
      setUser({
        id: response.id,
        name: response.name,
        email: response.email,
        phone_number: response.phone_number,
        address: response.address,
        role: response.role,
        token: response.token,
        created_at: response.created_at || "",
        updated_at: response.updated_at || "",
      });
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.message || "Error fetching user data");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
  };

  return {
    setUser,
    user,
    loading,
    error,
    register,
    login,
    logout,
    success,
    isAuthenticated,
    getRole,
    getToken,
    getUserData,
  };
};
