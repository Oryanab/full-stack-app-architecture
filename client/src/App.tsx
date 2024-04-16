import React from 'react';
import Login from './pages/Login';
import { Box, styled } from '@mui/material';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate
} from 'react-router-dom';
import Home from './pages/Dashboard';
import SessionProvider, { useSession } from './contexts/UseSession';
import Settings from './pages/Settings';
import Admin from './pages/Admin';

const MainContainer = styled(Box)({
    maxHeight: '100vh',
    maxWidth: '100vw',
    height: '100%',
    width: '100%',
    background: '#F4F4F4',
    fontWeight: 300,
    overflow: 'hidden'
});

export const enum UserRole {
    USER = 'user',
    OWNER = 'owner',
    ADMIN = 'admin'
}

const AuthRoutes = () => {
    const { user, loadingSession } = useSession();
    return user && !loadingSession ? <Outlet /> : <Login />;
};

const PrivateRoute = ({
    element,
    accessRole
}: {
    element: JSX.Element;
    accessRole: UserRole;
}) => {
    const { user, loadingSession } = useSession();
    return user.role === accessRole && !loadingSession ? (
        element
    ) : (
        <Navigate to="/" />
    );
};

const App = () => {
    return (
        <MainContainer>
            <SessionProvider>
                <Router>
                    <Routes>
                        <Route element={<AuthRoutes />}>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/settings"
                                element={
                                    <PrivateRoute
                                        element={<Settings />}
                                        accessRole={UserRole.OWNER}
                                    />
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute
                                        element={<Admin />}
                                        accessRole={UserRole.USER}
                                    />
                                }
                            />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Router>
            </SessionProvider>
        </MainContainer>
    );
};

export default App;
