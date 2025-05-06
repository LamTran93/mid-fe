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
import CreateUser from '../pages/CreateUser/component/CreateUser'
import EditUser from '../pages/EditUser/component/EditUser'
import UserReview from '../pages/UserReview/component/UserReview'
import BookReview from '../pages/BookReview/component/BookReview'

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
                    },
                    {
                        path: '/admin/user/create',
                        element: <CreateUser />
                    },
                    {
                        path: '/admin/user/edit/:id',
                        element: <EditUser />
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
                    {
                        path: '/user/book/review/:bookId',
                        element: <UserReview />
                    },
                    {
                        path: '/user/book/checkReview/:bookId',
                        element: <BookReview />
                    }
                ],
            },
        ],
    },
])

export default router
