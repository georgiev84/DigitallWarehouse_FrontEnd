import React from 'react'
import Header from '../shared/Header'
import Footer from '../shared/Footer'

type Props = {
  children: any
}

function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <div style={{ marginTop: '80px'}}>{children}</div>
      <Footer />
    </>
  )
}

export default Layout