import React from 'react'
import { Router as MyRouter, Routes, Links } from '../../components/router.js'
import routerConfig from './router.js'

// 报表
function ReportHome ({match}) {
  return (
    <MyRouter basename={routerConfig.basename}>
      <div>
        <Links config={routerConfig} />
        <hr />
        <Routes config={routerConfig}/>
      </div>
    </MyRouter>
  )
}

export default ReportHome
