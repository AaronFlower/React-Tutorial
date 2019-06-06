import React from 'react'
import { Redirect } from "react-router-dom";
import DataHome from './data'
import AudienceHome from './audience'

const config = {
  basename: 'hermes',
  routes: [
    {
      exact: true,
      to: '/data/',
      name: 'Data',
      render: () => <Redirect to="/data/data" />
    },
    {
      isHiddenLink: true,
      to: '/data/data',
      name: 'Data',
      render: () => <DataHome />
    },
    {
      to: '/data/audience',
      name: 'Audience',
      render: () => <AudienceHome />
    }
  ]
}

export default config