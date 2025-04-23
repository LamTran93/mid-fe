import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login/Login";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />
            }
        ]
    }
])

export default router