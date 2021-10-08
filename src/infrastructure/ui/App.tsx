import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Container, Loader } from 'infrastructure/ui/components/ui'
import { PrivateRoute } from 'infrastructure/ui/components/auth'
import { Navbar } from 'infrastructure/ui/components/common'
import { routes } from 'infrastructure/ui/routes'

import LoginView from 'infrastructure/ui/pages/Login'

const App = (): JSX.Element => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/login" exact component={LoginView} />
          <Container className="container">
            {routes.map(({ path, component }) => (
              <PrivateRoute key={path} exact path={path} component={component} />
            ))}
          </Container>
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
