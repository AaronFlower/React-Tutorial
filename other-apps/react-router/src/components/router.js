import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function CustomLink({route}) {
  return (
    <Route path={route.to} children={
      ({match}) => (<Link to={route.to}><button>{route.name}</button></Link>)
    }/>
  )
}

function Links ({config, link}) {
  const LinkComponent = link || CustomLink
  const RouterLinks = config.routes
    .filter((route) => !route.isHiddenLink)
    .map((route, i) => {
      return <LinkComponent key={i} route={route} />
    })

  return (
    <div className="router-links">
      {RouterLinks}
    </div>
  )
}

function Routes({config}) {
  const Routes = config.routes
    .map((route, i) => {
      return <Route key={route.to} exact={route.exact} path={route.to} component={route.render} />
    })
  return (
    <div className="router-routes">
      {Routes}
    </div>
  )
}

export {Router, Links, Routes}
