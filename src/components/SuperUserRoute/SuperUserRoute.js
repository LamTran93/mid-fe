import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

const SuperUserRoute = () => {
    const { isAuthenticated, userInfo } = useAuthContext()

    return isAuthenticated && userInfo.userType === 1 ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    )
}

export default SuperUserRoute
