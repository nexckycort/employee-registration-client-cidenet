import { sessionRepository } from 'infrastructure/repositories/sessionRepository'
import { UserDTO } from 'infrastructure/dto/UserDTO'
import { Session } from 'domain/models/Session'

export const sessionService = {
  auth: async (userDTO: UserDTO) => {
    const result = await sessionRepository.auth(userDTO)
    const auth = {
      ...result,
      response: {
        ...result.response,
        data: result.response?.data as Session
      }
    }
    return auth
  },
  logout: async () => {
    await sessionRepository.logout()
  },
  verify: async (token?: string) => {
    const result = await sessionRepository.verify(token)
    return result
  }
}
