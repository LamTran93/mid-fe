const { useContext, createContext, useState } = require('react')

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token')
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)
    const [userInfo, setUserInfo] = useState({
        userType: parseInt(localStorage.getItem('userType')),
    })

    const contextValue = {
        isAuthenticated,
        setIsAuthenticated,
        userInfo,
        setUserInfo,
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
