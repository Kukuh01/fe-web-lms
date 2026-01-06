import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { getMe } from "../api/auth.api";
import type { ProfileMahasiswa } from "../types/type";
import { getAccessToken } from "../services/token.service";

type AuthContextType = {
  user: ProfileMahasiswa | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<ProfileMahasiswa | null>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ProfileMahasiswa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
