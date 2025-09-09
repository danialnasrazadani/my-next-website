'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import users from '../../data/users.json'; // JSON کاربران

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // وضعیت لودینگ
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false); // بازیابی انجام شد
  }, []);

  const login = (identifier, password, method = 'email') => {
    let foundUser;

    if (method === 'email') {
      foundUser = users.find(u => u.email === identifier && u.password === password);
    } else {
      foundUser = users.find(u => u.username === identifier && u.password === password);
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      router.push('/dashboard');
    } else {
      alert('اطلاعات وارد شده صحیح نیست ❌');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
