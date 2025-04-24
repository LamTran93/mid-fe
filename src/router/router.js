import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SuperUserRoute from "../components/SuperUserRoute/SuperUserRoute";
import Login from "../pages/Login/components/Login";

const router = createBrowserRouter([
    {
        path:'*',
        element: <>404 not found</>
    },
    {
        path:'/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/superuser',
                element: <SuperUserRoute />
            },
            {
                path:'/user',
                element: <>User</>
            }
        ]
    }
])

export default router