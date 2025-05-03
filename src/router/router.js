import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SuperUserRoute from '../components/SuperUserRoute/SuperUserRoute'
import Login from '../pages/Login/component/Login'
import UserRoute from '../components/UserRoute/UserRoute'
import Home from '../pages/Home/component/Home'
import UserMain from '../pages/UserMain/component/UserMain'

const router = createBrowserRouter([
    {
        path: '*',
        element: <>404 not found</>,
    },
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/admin',
                element: <SuperUserRoute />,
            },
            {
                path: '/user',
                element: <UserRoute />,
                children: [{ path: '/user', element: <UserMain /> }],
            },
        ],
    },
])

export default router
