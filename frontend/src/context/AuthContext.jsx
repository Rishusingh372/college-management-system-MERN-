import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          // You might want to verify the token with your backend here
          const userData = JSON.parse(atob(token.split('.')[1]))
          setUser(userData)
          
          // Redirect based on role if accessing root
          if (location.pathname === '/') {
            navigate(`/${userData.role}`)
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [navigate, location])

  const login = async (username, password, isAdmin = false) => {
    try {
      const endpoint = isAdmin ? '/admin-login' : '/user-login'
      const response = await api.post(`/auth${endpoint}`, { username, password })
      
      localStorage.setItem('token', response.data.token)
      const userData = JSON.parse(atob(response.data.token.split('.')[1]))
      setUser(userData)
      
      navigate(`/${userData.role}`)
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: error.response?.data?.message || 'Login failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}