import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import LoginPage from './LoginPage'
import LoadingSpinner from './LoadingSpinner'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <LoginPage />
  }

  return <>{children}</>
}

export default AuthWrapper