import { Session } from 'domain/models/Session'
import { apiV1 } from 'infrastructure/config/api'
import { SessionDTO } from 'infrastructure/dto/SessionDTO'
import { UserDTO } from 'infrastructure/dto/UserDTO'
import { http } from 'infrastructure/lib'

export const sessionRepository = {
  auth: async (userDTO: UserDTO) => {
    const result = await http.post<SessionDTO>(apiV1.login, {
      body: userDTO
    })

    return result
  },
  logout: async () => {
    // TODO: request to endpoint to delete session
  },
  verify: async (token?: string) => {
    const headers =
      token !== undefined
        ? {
            Authorization: `Bearer ${token}`
          }
        : undefined
    const result = await http.get<SessionDTO>(apiV1.validateToken, {
      headers
    })

    const auth = {
      ...result,
      response: {
        ...result.response,
        data: result.response?.data as Session
      }
    }
    return auth
  }
}
