import { createContext, useState, useEffect, useContext } from 'react';
import { users } from '../utils/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for session
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            // Simulate small delay
            setTimeout(() => {
                const foundUser = users.find(u => u.email === email && u.password === password);
                if (foundUser) {
                    const { password, ...userWithoutPassword } = foundUser;
                    setUser(userWithoutPassword);
                    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                    resolve(userWithoutPassword);
                } else {
                    reject('Invalid email or password');
                }
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const signup = (name, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const existingUser = users.find(u => u.email === email);
                if (existingUser) {
                    reject('Email already in use');
                } else {
                    const newUser = { id: `u${Date.now()}`, name, email, role: 'customer' };
                    // In a real app we would add to users array, but here we just log them in
                    // Since mockData is read-only, we can't persist new users permanently across reloads if we don't write to file
                    // But for session it works.
                    setUser(newUser);
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    resolve(newUser);
                }
            }, 500);
        });
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
