import {useAuth} from '../hooks/useAuth'
import {Navigate} from 'react-router-dom'
import Login from "../pages/login";

function PrivateRoute({children}) {
    const {isAuthenticated, isInitialized} = useAuth()

    console.log(isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to='/auth/login'/>
    }
    return <>
        {children}
    </>
}

export default PrivateRoute