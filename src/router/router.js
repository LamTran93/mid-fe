import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";
import SuperUserRoute from "../components/SuperUserRoute/SuperUserRoute";

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
            }
        ]
    }
])

export default router