import React, { useEffect } from 'react'

import { useAuth, useField, useAsync, useRouter } from 'infrastructure/ui/hooks'
import { Alert, Button, Input } from 'infrastructure/ui/components/ui'
import { STATUS } from 'infrastructure/ui/hooks/useAsync'

const Login = (): JSX.Element => {
  const { auth, login } = useAuth()
  const { authenticated } = auth

  const router = useRouter()

  const email = useField({ type: 'email' })
  const password = useField({ type: 'password' })

  const loginAsync = async () => {
    const { error, response } = await login({
      email: email.value,
      password: password.value
    })
    if (error) {
      throw new Error(response.message)
    }
    return response
  }

  const { execute, status, error } = useAsync(loginAsync, false)

  const handleOnSubmit = (event: React.SyntheticEvent<EventTarget>) => {
    event.preventDefault()
    execute()
  }

  useEffect(() => {
    if (authenticated) {
      router.push('/')
    }
  }, [status])

  return (
    <main className="center-full">
      <form onSubmit={handleOnSubmit}>
        <h1>Login App</h1>
        {status === STATUS.ERROR && <Alert type="danger">{error.message}</Alert>}
        <div className="mb-3">
          <Input {...email} required className="form-control" placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <Input {...password} required className="form-control" placeholder="******" />
        </div>
        <div className="mb-2"></div>
        <Button type="submit" disabled={status === STATUS.PENDING}>
          Log In
        </Button>
      </form>
    </main>
  )
}

export default Login
