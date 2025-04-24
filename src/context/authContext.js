const { useContext, createContext, useState } = require('react')

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('userRole')
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)
    const [userRole, setUserRole] = useState(role)

    const contextValue = {isAuthenticated, setIsAuthenticated, userRole, setUserRole}
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
