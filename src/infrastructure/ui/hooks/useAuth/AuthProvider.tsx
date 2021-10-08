/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

import { AuthContext } from 'infrastructure/ui/hooks/useAuth/AuthContext'
import { sessionService } from 'domain/services/sessionService'
import { UserDTO } from 'infrastructure/dto/UserDTO'
import { User } from 'domain/models/User'
import { Logger } from 'infrastructure/helpers/logger'

export interface Auth {
  token: string
  authenticated: boolean
  user: User
}

const useAuthProvider = () => {
  const token = localStorage.getItem('token') ?? ''
  const authenticated = token !== ''
  const [auth, setAuth] = useState({
    token,
    authenticated,
    user: null
  } as unknown as Auth)

  const login = async (userDTO: UserDTO) => {
    const { error, response } = await sessionService.auth(userDTO)
    if (!error) {
      setAuth({
        ...auth,
        token: response.data.token,
        authenticated: true,
        user: response.data.user
      })
      localStorage.setItem('token', response.data.token)
    }

    return { error, response }
  }

  const logout = async (api = false) => {
    if (api) await sessionService.logout()
    localStorage.removeItem('token')
    window.location.reload()
  }

  const verifyToken = async () => {
    const { error, response } = await sessionService.verify()
    if (error) throw new Error(response.message)
    return response
  }

  useEffect(() => {
    if (authenticated) {
      verifyToken()
        .then((response) => {
          setAuth({
            ...auth,
            token: response.data.token,
            user: response.data.user
          })
        })
        .catch(() => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Session expired',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            logout().catch(Logger.error)
          })
        })
    }
  }, [])

  return {
    login,
    auth,
    logout
  }
}

const AuthProvider = ({ children }: any) => {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider
