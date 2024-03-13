import React from 'react'
import Header from '../shared/Header'

type Props = {
    children: any
}

function Layout({children}: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}

export default Layout