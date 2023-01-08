import {useAuth} from '../hooks/useAuth'
import {Navigate} from 'react-router-dom'

function PublicRoute({children}) {
    const {isAuthenticated, isInitialized} = useAuth()

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return <>
        {children}
    </>

}

export default PublicRoute