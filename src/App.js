import './App.css'
import { Outlet } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import AuthProvider from './context/authContext'

function App() {
    return (
        <AuthProvider>
            <Layout>
                <Outlet />
            </Layout>
        </AuthProvider>
    )
}

export default App
