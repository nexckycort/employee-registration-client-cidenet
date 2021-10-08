/* eslint-disable multiline-ternary */
import React from 'react'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import cn from 'classnames'

import { useAuth } from 'infrastructure/ui/hooks'
import { routes } from 'infrastructure/ui/routes'

import s from './Navbar.module.css'

const Navbar = ({ location }: RouteComponentProps): JSX.Element | null => {
  const pathActive = location.pathname
  const { auth, logout } = useAuth()
  const { authenticated } = auth

  if (pathActive === '/login') return null

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            <img src="https://www.flaticon.es/premium-icon/icons/svg/1069/1069210.svg" width="30" height="30" /> xD
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto justify-content-end">
              {routes.map(({ title, path }) => {
                const rootClass = pathActive === path ? cn(s.linkActive, 'nav-link') : 'nav-link'
                return (
                  <li className="nav-item" key={path}>
                    <Link className={rootClass} to={path}>
                      {title}
                    </Link>
                  </li>
                )
              })}
              {authenticated ? (
                <li className="nav-item" onClick={async () => await logout(true)} style={{ cursor: 'pointer' }}>
                  <div className="nav-link">Logout</div>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <hr style={{ paddingBottom: '2rem' }} />
    </>
  )
}

export default withRouter(Navbar)
