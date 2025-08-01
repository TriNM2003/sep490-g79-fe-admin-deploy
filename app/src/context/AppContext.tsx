import type { User } from "@/types/User";
import useAuthAxios from "@/utils/authAxios";
import axios from "axios";
import React, { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

interface AppContextType {
  user: User | null;
  accessToken: string | null;
  coreAPI: string;
  authAPI: string;
  userAPI: string;
  shelterAPI: string;
  donationAPI: string;
  blogAPI: string;
  reportAPI: string;
  breedAPI: string;
  speciesAPI: string;
  userProfile: User | null;
  login: (accessToken: string, userData: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  accessToken: null,
  coreAPI: "",
  authAPI: "",
  userAPI: "",
  shelterAPI: "",
  donationAPI: "",
  blogAPI: "",
  reportAPI: "",
  breedAPI: "string",
  speciesAPI: "string",
  userProfile: null,
  login: () => {},
  logout: () => {},
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const location = useLocation();
  const authAxios = useAuthAxios();

  // APIs
  const coreAPI = 'http://localhost:9999';
  const authAPI = 'http://localhost:9999/auth';
  const userAPI = 'http://localhost:9999/users/admin';
  const shelterAPI = 'http://localhost:9999/shelters/admin';
  const donationAPI = 'http://localhost:9999/donations/admin';
  const blogAPI = 'http://localhost:9999/blogs/admin';
  const reportAPI = 'http://localhost:9999/reports/admin';
  const breedAPI = 'http://localhost:9999/breeds/admin';
  const speciesAPI = 'http://localhost:9999/species/admin';


  const login = (accessToken: string, userData: User) => {
    setUser(userData);
    localStorage.setItem("accessToken", accessToken);
  };

  const logout = () => {
    axios.post(`${authAPI}/logout`,{id: user?.id})
    .then(() => {
      toast.success("Thoát đăng nhập thành công");
      setUser(null);
      localStorage.clear();
    })
    .catch(() => {
      toast.error("Lỗi thoát đăng nhập!")
      setUser(null);
      localStorage.removeItem("accessToken");
    })
  };

  // Check trạng thái login và access token mỗi khi chuyển trang
  useEffect(() => {
      authAxios
        .get(`${coreAPI}/users/get-user`)
          .then((res) => {
            setUserProfile(res?.data);
            setUser(res?.data);
                })
          .catch((error) => {
            console.log(error.response?.data?.message);
        });
  }, [location.pathname]);


  return (
    <AppContext.Provider
      value={{
        user,
        accessToken,
        coreAPI,
        authAPI,
        userAPI,
        shelterAPI,
        donationAPI,
        blogAPI,
        reportAPI,
        breedAPI,
        speciesAPI,
        userProfile,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
