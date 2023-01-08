import {useRoutes} from 'react-router-dom'
import Login from "../pages/login";
import Register from "../pages/register";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/home";

export default function Router() {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: <PublicRoute>
                        <Login/>
                    </PublicRoute>
                },
                {
                    path: 'register',
                    element: <PublicRoute>
                        <Register/>
                    </PublicRoute>
                },
            ]
        },
        {
            path: '/',
            element: <PrivateRoute>
                <Home/>
            </PrivateRoute>
        }
    ])
}