import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth } from "@devvai/devv-code-backend";
import axios from "axios";

interface User {
  projectId: string;
  uid: string;
  name: string;
  email: string;
  createdTime: number;
  lastLoginTime: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // OTP actions (Admin)
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, code: string) => Promise<User>;

  // Normal user actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;

  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // -----------------
      // OTP login (Admin)
      // -----------------
      sendOTP: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await auth.sendOTP(email);
          set({ isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to send verification code",
          });
          throw error;
        }
      },

      verifyOTP: async (email: string, code: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await auth.verifyOTP(email, code);
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return response.user;
        } catch (error) {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Invalid verification code",
          });
          throw error;
        }
      },

      // -----------------
      // Normal user login
      // -----------------
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post("/api/auth/login", { email, password });
          set({
            user: res.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          localStorage.setItem("token", res.data.token);
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Login failed",
          });
          throw error;
        }
      },

      // -----------------
      // Normal user register
      // -----------------
      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await axios.post("/api/auth/register", {
            name,
            email,
            password,
          });
          set({
            user: res.data.user,
            isAuthenticated: true,
            isLoading: false,
          });
          localStorage.setItem("token", res.data.token);
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "Registration failed",
          });
          throw error;
        }
      },

      // -----------------
      // Logout
      // -----------------
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await auth.logout();
          localStorage.removeItem("token");
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "Logout failed",
          });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
