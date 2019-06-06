import React from "react";
import { Redirect } from "react-router-dom";

const Home = React.lazy(() => import('./views/home/index.js'))
const Game = React.lazy(() => import('./views/game/index.js'))
const Data = React.lazy(() => import('./views/data/index.js'))
const About = React.lazy(() => import('./views/about/index.js'))

const config = {
  basename: 'hermes',
  routes: [
    {
      exact: true,
      to: '/',
      name: 'Home',
      render: () => <Redirect to="/home" />
    },
    {
      // 从其它路由重定向过来可以不渲染
      isHiddenLink: true,
      to: '/home',
      name: 'Home',
      render: () => <Home />,
    },
    {
      to: '/game',
      name: 'Game',
      render: () => <Game />
    },
    {
      to: '/data',
      name: 'Data',
      render: () => <Data />,
    },
    {
      to: '/about',
      name: 'About',
      render: () => <About />
    }
  ]
}

export default config