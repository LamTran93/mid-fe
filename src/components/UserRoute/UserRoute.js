import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

const UserRoute = () => {
    const { isAuthenticated, userInfo } = useAuthContext()

    return isAuthenticated && userInfo.userType === 0 ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    )
}

export default UserRoute
