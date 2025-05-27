import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Footer } from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ThemeSwitcher from './components/ThemeSwitcher';
import { themeConfig } from './themeConfig';

const LoggedInLayout = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);
    const { bg, text } = themeConfig[theme];

    return (
        <div className={`min-h-screen flex flex-col ${bg} ${text}`}>
            <Header />
            <div className="flex flex-1 pt-[4rem]">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6 ml-16 md:ml-20 lg:ml-64">
                    {children}
                </main>
            </div>
            <Footer /> {/* Footer added here */}
        </div>
    );
};


function App() {
    const { theme } = useSelector((state) => state.theme);
    const { bg, text } = themeConfig[theme];
    const location = useLocation(); // Get current route
    const isLoginOrSignup = ['/login', '/signup', '/'].includes(location.pathname);

    return (
        <div className={`min-h-screen ${bg} ${text}`}>
            <ThemeSwitcher className={isLoginOrSignup ? 'theme-switcher-login-signup' : ''} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={<LoggedInLayout><Dashboard /></LoggedInLayout>}
                />
                <Route
                    path="/profile"
                    element={<LoggedInLayout><Profile /></LoggedInLayout>}
                />
                <Route
                    path="/courses"
                    element={<LoggedInLayout><div>Courses Page (TBD)</div></LoggedInLayout>}
                />
                <Route
                    path="/schedule"
                    element={<LoggedInLayout><div>Schedule Page (TBD)</div></LoggedInLayout>}
                />
                <Route
                    path="/groups"
                    element={<LoggedInLayout><div>Groups Page (TBD)</div></LoggedInLayout>}
                />
            </Routes>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}