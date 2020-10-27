import Head from 'next/head'
import React from 'react'
import Sidebar from './Sidebar'

const DashboardComponent: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="wrapper">
        <Sidebar />
        <section className="main_content">{children}</section>
      </div>
      <footer>Dashboard</footer>
    </div>
  )
}

export default DashboardComponent
