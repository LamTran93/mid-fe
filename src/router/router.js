import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SuperUserRoute from '../components/SuperUserRoute/SuperUserRoute'
import Login from '../pages/Login/component/Login'
import UserRoute from '../components/UserRoute/UserRoute'
import Home from '../pages/Home/component/Home'
import UserMain from '../pages/UserMain/component/UserMain'
import AdminMain from '../pages/AdminMain/component/AdminMain'
import NotFound from '../pages/NotFound/component/NotFound'
import EditBook from '../pages/EditBook/component/EditBook'
import EditCategory from '../pages/EditCategory/component/EditCategory'
import CreateBook from '../pages/CreateBook/component/CreateBook'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '*',
                element: <NotFound />,
            },
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
                children: [
                    {
                        path: '/admin',
                        element: <AdminMain />,
                    },
                    {
                        path: '/admin/book/edit/:id',
                        element: <EditBook />,
                    },
                    {
                        path: '/admin/category/edit/:id',
                        element: <EditCategory />
                    },
                    {
                        path: '/admin/book/create',
                        element: <CreateBook />
                    }
                ],
            },
            {
                path: '/user',
                element: <UserRoute />,
                children: [
                    {
                        path: '/user',
                        element: <UserMain />,
                    },
                ],
            },
        ],
    },
])

export default router
